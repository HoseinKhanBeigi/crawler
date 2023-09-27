import axios from 'axios';
import ErrorHandling from '../errorHandling';

export function createFormBody(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export const formData = async body => {
  const data = new FormData();
  // eslint-disable-next-line guard-for-in,no-restricted-syntax,no-unused-vars
  for (const name in body) {
    data.append(name, body[name]);
  }
  return data;
};

const basicOptions = (body, options = {}) => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...options,
  },
  data: body,
});

const postOptions = body => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
    platform: 'web',
    'Application-Name': 'CRM',
  },
  data: body,
});

const filePostOptions = async body => ({
  method: 'POST',
  headers: {
    // Authorization: `Bearer ${token}`,
    platform: 'web',
    'Application-Name': 'CRM',
  },
  data: await formData(body),
});

const putOptions = body => ({
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
    platform: 'web',
    'Application-Name': 'CRM',
  },
  data: body,
});

const patchOptions = body => ({
  method: 'PATCH',
  headers: {
    // Authorization: `Bearer ${token}`,
    platform: 'web',
    'Application-Name': 'CRM',
    'Content-Type': 'application/json',
  },
  data: body,
});

const getOptions = (token, options) => ({
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
    'Application-Name': 'CRM',
    'Accept-Language': 'fa',
    ...options,
  },
});

const deleteOptions = () => ({
  method: 'DELETE',
  headers: {
    // Authorization: `Bearer ${token}`,
    'Application-Name': 'CRM',
  },
});

const downloadOptions = (token, objectToken) => ({
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
    'X-Objects-Token': objectToken,
    'Application-Name': 'CRM',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const basicDownloadOptions = token => ({
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
    'Application-Name': 'CRM',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export async function FetchDownload(fetch, url, token, objectToken) {
  let result;
  try {
    const resp = await fetch(url, downloadOptions(token, objectToken));
    const clone = resp.clone();
    result = await new ErrorHandling(resp).resp();
    if (result) {
      try {
        result = await clone.blob();
      } catch (e) {
        result = ErrorHandling.serverError();
      }
    }
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function basicDownload(fetch, url, token) {
  let result;
  try {
    const resp = await fetch(url, basicDownloadOptions(token));
    const clone = resp.clone();
    result = await new ErrorHandling(resp).resp();
    if (result) {
      try {
        result = await clone.blob();
      } catch (e) {
        result = ErrorHandling.serverError();
      }
    }
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function BasicFetchData(fetch, url, options = {}) {
  let result;
  try {
    const resp = await axios({
      url,
      ...options,
      withoutAuth: true,
    });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function FetchData(fetch, url, token, options = {}) {
  let result;
  try {
    const resp = await axios({
      url,
      ...getOptions(token, options),
      withoutAuth: !process.env.BROWSER,
    });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function PatchData(fetch, url, body = null, token) {
  let result;
  try {
    const resp = await axios({ url, ...patchOptions(body, token) });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function PostData(fetch, url, body, token) {
  let result;
  try {
    const resp = await axios({ url, ...postOptions(body, token) });
    result = new ErrorHandling(resp).resp(resp);
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function PostFileData(fetch, url, body, token) {
  let result;
  const foo = await filePostOptions(body, token);
  try {
    const resp = await axios({ url, ...foo });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function PutData(fetch, url, body, token) {
  let result;
  try {
    const resp = await axios({ url, ...putOptions(body, token) });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

export async function DeleteData(fetch, url, token) {
  let result;
  try {
    const resp = await axios({ url, ...deleteOptions(token) });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}

// for NESHAN request with customize header
export async function basicPostData(fetch, url, body, options = {}) {
  let result;
  try {
    const resp = await axios({
      url,
      ...basicOptions(createFormBody(body), options),
    });
    result = new ErrorHandling(resp).resp();
  } catch (err) {
    result = ErrorHandling.serverError();
  }
  return result;
}
