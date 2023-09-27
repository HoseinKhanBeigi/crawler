import {
  BASE_VARIABLE_KEYS,
  PostData,
  resolveVariable,
} from '../../serviceConfig';

export const registerNewEmployeeUrl = ({
  nationalCode,
  birthDate,
  mobilePhone,
  unitId,
  aclGroupId,
  email,
}) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/employee/ext/create/${nationalCode}/${birthDate}/${mobilePhone}/${unitId}/${aclGroupId}?email=${email}`;

export function createPostRegisterNewEmployeeRequest(fetch, token) {
  return async function postRegisterNewEmployeeRequest(body) {
    return PostData(fetch, registerNewEmployeeUrl(body), {}, token);
  };
}
