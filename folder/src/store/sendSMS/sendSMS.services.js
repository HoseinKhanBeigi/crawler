/* eslint-disable import/extensions */
import {
  FetchData,
  mockService,
  PostData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const sendSmsMockData = mockService
  ? require('../../../restApiDesign/sendSms')
  : {};

const smsPatternsData = mockService
  ? require('../../../restApiDesign/smsPatterns')
  : require('../../../restApiDesign/smsPatterns');

export const sendWhatsAppUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/contact-center/sendWhatsApp`;

export const sendSmsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/contact-center/sendSms`;
export const leadSendSmsUrl = leadType =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${leadType}/send-sms/`;
export const smsPatternsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/mock`;

export function createPostSendSmsRequest(fetch, token) {
  return async function sendSmsRequest(body, leadType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: sendSmsMockData,
      };
    }
    let requestUrl = sendSmsUrl();
    if (leadType) {
      requestUrl = leadSendSmsUrl(leadType);
    }
    return PostData(fetch, requestUrl, body, token);
  };
}

export function createGetSmsPatternsRequest(fetch, token) {
  return async function getSmsPatternsRequest() {
    if (mockService || !mockService) {
      return {
        status: 200,
        err: false,
        resp: smsPatternsData,
      };
    }

    return FetchData(fetch, smsPatternsUrl(), token);
  };
}

export function createPostSendWhatsAppRequest(fetch, token) {
  return async function postSendWhatsAppRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: sendSmsMockData,
      };
    }
    return PostData(fetch, sendWhatsAppUrl(), body, token);
  };
}
