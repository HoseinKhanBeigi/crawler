import {
  BASE_VARIABLE_KEYS,
  basicPostData,
  resolveVariable,
} from '../../serviceConfig';

export const getNeshanTokenUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.AUTH_BASE_URL)}/token`;

export const getNeshanLogoutUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.AUTH_BASE_URL)}/logout`;

export const getRefreshTokenUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.AUTH_BASE_URL)}/token`;

export function createPostNeshanTokenDataRequest(fetch) {
  return async function postNeshanTokenDataRequest(body) {
    return basicPostData(fetch, getNeshanTokenUrl(), body, {});
  };
}

export function createPostNeshanLogoutRequest(fetch) {
  return async function postNeshanLogoutRequest(body, token) {
    return basicPostData(fetch, getNeshanLogoutUrl(), body, {
      Authorization: `Bearer ${token}`,
    });
  };
}

export function createPostNeshanRefreshTokenRequest(fetch) {
  return async function getNeshanRefreshTokenRequest(body) {
    return basicPostData(fetch, getRefreshTokenUrl, body, {});
  };
}
