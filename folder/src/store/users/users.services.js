import {
  BASE_VARIABLE_KEYS,
  FetchData,
  FetchDownload,
  mockService,
  PatchData,
  resolveVariable,
} from '../../serviceConfig';

const setPasswordMockData = mockService
  ? require('../../../restApiDesign/users/setPassword')
  : {};

export const rePrintPasswordUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.MANAGEMENT_CONSOLE_URL)}/users`;

const userStatusMockData = mockService
  ? require('../../../restApiDesign/users/userStatus')
  : {};

const usersMockData = mockService
  ? require('../../../restApiDesign/users/users')
  : {};

export const setPasswordUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.MANAGEMENT_CONSOLE_URL,
  )}/users/${params}/password`;
export const userStatusUrl = (param1, param2) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.MANAGEMENT_CONSOLE_URL,
  )}/users/${param1}/${param2}`;
export const usersUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.MANAGEMENT_CONSOLE_URL,
  )}/users/masked?${params}`;

export function createGetUsersRequest(fetch, token) {
  return async function usersRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: usersMockData,
      };
    }
    return FetchData(fetch, usersUrl(params), token);
  };
}

export function createPatchUserStatusRequest(fetch, token) {
  return async function userStatusRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: userStatusMockData,
      };
    }
    return PatchData(
      fetch,
      userStatusUrl(params.uuid, params.userStatus),
      null,
      token,
    );
  };
}

export function createGetSetPasswordRequest(fetch, token) {
  return async function setPasswordRequest(params, body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: setPasswordMockData,
      };
    }
    return PatchData(fetch, setPasswordUrl(params.uuid), body, token);
  };
}

export function createGetRePrintPasswordRequest(fetch, token) {
  return async function getRePrintPasswordRequest(uuid) {
    const url = `${rePrintPasswordUrl()}/${uuid}/password/print`;
    return FetchDownload(fetch, url, token);
  };
}
