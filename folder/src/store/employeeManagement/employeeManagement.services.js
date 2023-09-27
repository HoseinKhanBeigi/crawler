import {
  BASE_VARIABLE_KEYS,
  mockService,
  PostData,
  resolveVariable,
} from '../../serviceConfig';
import GetTemplatesMockData from '../../../restApiDesign/empty.json';

export const registerEmployeeUrl = ({ levantId, aclGroupId }) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/employee/register/${levantId}/${aclGroupId}`;

export function createPostRegisterEmployeeRequest(fetch, token) {
  return async function postRegisterEmployeeRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return PostData(fetch, registerEmployeeUrl(body), {}, token);
  };
}
