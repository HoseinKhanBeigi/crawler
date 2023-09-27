import GetTemplatesMockData from '../../../restApiDesign/empty.json';
import {
  FetchData,
  mockService,
  PostData,
  PutData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

/** ******************************  Mock data  ****************************************** */
const phoneCallsMockData = mockService
  ? require('../../../restApiDesign/phoneCalls/phoneCallsList')
  : {};
const PhoneCallsPatternsMockData = mockService
  ? require('../../../restApiDesign/phoneCallPatterns')
  : require('../../../restApiDesign/phoneCallPatterns');

/** ******************************  URL Address    ****************************************** */
export const templatesUrl = templateType =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/template/template/CRM/${templateType}`;
export const phoneCallsUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/contact-center/call?${params}`;
export const phoneCallsPatternsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/mock`;
export const postAddCallUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/voip/add_call_details`;
export const putCallDetailUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/voip/edit_call_details`;
export const clickToCallUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/voip/click_to_call`;
export const getCallDetailByIdUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/voip/call_details/${id}`;

/** ******************************Service Function******************************************* */
export function createGetPhoneCallsRequest(fetch, token) {
  return async function phoneCallsRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: phoneCallsMockData,
      };
    }
    return FetchData(fetch, phoneCallsUrl(params), token);
  };
}

export function createGetPhoneCallsPatternsRequest(fetch, token) {
  return async function getPhoneCallsPatternsRequest() {
    if (mockService || !mockService) {
      return {
        status: 200,
        err: false,
        resp: PhoneCallsPatternsMockData,
      };
    }

    return FetchData(fetch, phoneCallsPatternsUrl(), token);
  };
}

export function createGetTemplatesRequest(fetch, token) {
  return async function getTemplatesRequest(templateType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }

    return FetchData(fetch, templatesUrl(templateType), token);
  };
}
export function createPostAddCallDetailRequest(fetch, token) {
  return async function postAddCallDetail(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return PostData(fetch, postAddCallUrl(), body, token);
  };
}
export function createPostClickToCallRequest(fetch, token) {
  return async function postClickToCall(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return PostData(fetch, clickToCallUrl(), body, token);
  };
}
export function createPutCallDetailRequest(fetch, token) {
  return async function putCallDetailRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return PutData(fetch, putCallDetailUrl(), body, token);
  };
}
export function createGetCallDetailByIdRequest(fetch, token) {
  return async function getCallDetailByIdRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTemplatesMockData,
      };
    }
    return FetchData(fetch, getCallDetailByIdUrl(id), token);
  };
}
