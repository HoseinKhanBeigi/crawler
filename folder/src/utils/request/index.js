/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { generateURL } from './url';
import { getCookie } from '../../utils';
import { setUserDataCookie } from '../../store/neshanAuth/neshan.actions';
import neshanServices from '../../service/neshanService';
import { transformResponses } from './transformResponses';
import { errorHandler } from './errorHandler';

/* eslint-disable no-param-reassign */

const refreshTokenHandler = async () => {
  const forceLogout = () => {
    if (process.env.BROWSER) {
      window.location.href = '/logout';
    }
  };
  try {
    const refreshToken = getCookie('refresh_token');
    const newTokenResponse = await neshanServices.getNewToken(refreshToken);
    setUserDataCookie(newTokenResponse.data, true);
  } catch {
    forceLogout();
  }
  return Promise.resolve();
};

createAuthRefreshInterceptor(axios, refreshTokenHandler);

axios.interceptors.response.use(
  config => config,
  error => Promise.reject(errorHandler(error.response, error)),
);

axios.interceptors.request.use(config => {
  if (!config.withoutAuth) {
    config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
  }
  return config;
});

const headersConfig = options => {
  const { objectToken, shouldUpload, agent, mock, context } = options;
  const headers = {
    'Application-Name': 'CRM',
    platform: 'web',
  };
  if (context) headers.context = context;

  if (agent) headers.agent = agent;

  if (mock) headers.mock = mock;

  if (objectToken) {
    headers['X-Objects-Token'] = objectToken;
  }
  if (!shouldUpload) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const makeBody = (body, options) => {
  if (!options.shouldUpload) {
    return JSON.stringify(body);
  }
  const fileBody = new FormData();
  fileBody.append('file', body, body?.name);
  return fileBody;
};

const fetchOptions = (body, options) => {
  const config = {
    method: options.method,
    headers: headersConfig(options),
    message: options.message || '',
  };

  // add body if body exist
  if (body) config.data = makeBody(body, options);

  return config;
};

const httpRequest = async (url, body, options) =>
  new Promise(async (resolve, reject) => {
    try {
      const requestTime = new Date().getTime();
      const response = await axios({
        url: generateURL(url),
        ...fetchOptions(body, options),
        ...((options.shouldBlob || options.shouldDownload) && {
          responseType: 'blob',
        }),
        ...(options.shouldPlain && { responseType: 'text' }),
      });
      resolve(transformResponses(response, { ...options, requestTime }));
    } catch (e) {
      reject(e);
    }
  });

const request = url => ({
  get: options => httpRequest(url, null, { ...options, method: 'GET' }),
  download: options =>
    httpRequest(url, null, {
      shouldDownload: true,
      objectToken: null,
      method: 'GET',
      ...options,
    }),
  post: (body, options) =>
    httpRequest(url, body, { ...options, method: 'POST' }),
  upload: (body, options) =>
    httpRequest(url, body, { shouldUpload: true, method: 'POST', ...options }),
  put: (body, options) => httpRequest(url, body, { ...options, method: 'PUT' }),
  delete: (options, body = null) =>
    httpRequest(url, body, { ...options, method: 'DELETE' }),
  patch: (body, options) =>
    httpRequest(url, body, { ...options, method: 'PATCH' }),
});

export default request;
