import {
  BASE_VARIABLE_KEYS,
  PostData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';
import { mockService } from '../../webConfig';
import CallsMockData from '../../../restApiDesign/reports/calls.json';

export const getUrl = `${resolveVariable(
  BASE_VARIABLE_KEYS.BASE_URL,
)}/template`;
export const doActionUrl = `${resolveVariable(
  BASE_VARIABLE_KEYS.BASE_URL,
)}/template/action`;

export function createDoActionOnMessageTemplates(fetch, token) {
  return async function doActionOnMessageTemplates(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: CallsMockData,
      };
    }

    return PostData(fetch, doActionUrl, body, token);
  };
}

export function createCreateNewMessageTemplate(fetch, token) {
  return async function createNewMessageTemplate(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: CallsMockData,
      };
    }

    return PostData(fetch, getUrl, body, token);
  };
}

export function createEditMessageTemplate(fetch, token) {
  return async function createNewMessageTemplate(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: CallsMockData,
      };
    }

    return PutData(fetch, getUrl, body, token);
  };
}
