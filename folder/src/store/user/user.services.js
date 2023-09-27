import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const userEmployeeProfileUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/employee/profile?includeProfileImage=true`;

export function createGetUserEmployeeProfileRequest(fetch, token) {
  return async function getUserEmployeeProfileRequest() {
    return FetchData(fetch, userEmployeeProfileUrl(), token);
  };
}
