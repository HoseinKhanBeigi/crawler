import {
  BASE_VARIABLE_KEYS,
  mockService,
  PostData,
  resolveVariable,
} from '../../serviceConfig';
import GetTemplatesMockData from '../../../restApiDesign/empty.json';

export const addCaseUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/case_management/case/add`;

export function createPostAddCaseRequest(fetch, token) {
  return async function postAddCase(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return PostData(fetch, addCaseUrl(), body, token);
  };
}
