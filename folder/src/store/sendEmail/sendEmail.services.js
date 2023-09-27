/* eslint-disable import/extensions */
import {
  FetchData,
  mockService,
  PostData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const sendEmailMockData = mockService
  ? require('../../../restApiDesign/sendEmail')
  : {};

const GetEmailPatternsMockData = mockService
  ? require('../../../restApiDesign/emailPatterns')
  : require('../../../restApiDesign/emailPatterns');

export const emailPatternsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/mock`;

export const sendEmailUrl = isBulk =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/contact-center/${
    isBulk ? 'sendGroupEmail' : 'sendEmail'
  }`;
export const leadSendEmailUrl = type =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${type}/send-email`;
export const checkExistEmailUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/contact-center/checkExistEmail`;

export function createPostSendEmailRequest(fetch, token) {
  return async function sendEmailRequest(body, isBulk, leadType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: sendEmailMockData,
      };
    }
    let requestUrl = sendEmailUrl(isBulk);
    if (leadType) requestUrl = leadSendEmailUrl(leadType);
    return PostData(fetch, requestUrl, body, token);
  };
}

export function createGetEmailPatternsRequest(fetch, token) {
  return async function getEmailPatternsRequest() {
    if (mockService || !mockService) {
      return {
        status: 200,
        err: false,
        resp: GetEmailPatternsMockData,
      };
    }

    return FetchData(fetch, emailPatternsUrl(), token);
  };
}

export function createCheckExistEmailRequest(fetch, token) {
  return async function checkExistEmailRequest(body) {
    return PostData(fetch, checkExistEmailUrl(), body, token);
  };
}
