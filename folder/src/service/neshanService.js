import axios from 'axios';
import {
  BASE_VARIABLE_KEYS,
  createFormBody,
  resolveVariable,
} from '../serviceConfig';

const neshanApi = axios.create({
  baseURL: resolveVariable(BASE_VARIABLE_KEYS.AUTH_BASE_URL),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  skipAuthRefresh: true,
});

const neshaServices = {
  getNewToken: async refreshToken =>
    neshanApi.post(
      '/token',
      createFormBody({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: resolveVariable(BASE_VARIABLE_KEYS.AUTH_CLIENT_ID),
      }),
    ),
};

export default neshaServices;
