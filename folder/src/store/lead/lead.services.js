import {
  BASE_VARIABLE_KEYS,
  PostData,
  FetchData,
  mockService,
  PutData,
  resolveVariable,
} from '../../serviceConfig';

import mockData from '../../../restApiDesign/empty.json';
import columnPersonLead from '../../../restApiDesign/lead/filedsTypePerson.json';

const leadMockData = mockService
  ? require('../../../restApiDesign/lead/lead')
  : {};

const addLeadMockData = mockService
  ? require('../../../restApiDesign/empty')
  : {};

export const leadFormFieldsUrl = (type, filterSystemCategories, isActive) =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/columns/lead?type=${type}${
    filterSystemCategories
      ? `&columnCategories=MAIN&columnCategories=OPTIONAL${
          isActive ? '&active=true' : ''
        }`
      : ''
  }`;

export const contactsByLevantIdUrl = levantId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/party/contacts/${levantId}`;

export const addLeadUrl = leadType =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/leads/${leadType}/user-defined`;

export const leadUrl = params =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${params}/profile`;

export const leadColumnsAndValuseUrl = (leadType, leadId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/leads/${leadType}/load/${leadId}`;

export const PartyPhoneNumberByLevantIdUrl = (levantId, type, id) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/contact-center/party-locations/${levantId}/${type}/${id}`;

export const leadRelationsUrl = levantId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${levantId}/relations`;

export function createGetLeadRequest(fetch, token) {
  return async function leadRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: leadMockData,
      };
    }
    return FetchData(fetch, leadUrl(params), token);
  };
}

export function createGetLeadColumnsAndValuesRequest(fetch, token) {
  return async function getLeadColumnsAndValuesRequest(leadyType, leadId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: leadMockData,
      };
    }
    return FetchData(fetch, leadColumnsAndValuseUrl(leadyType, leadId), token);
  };
}

export function createGetPartyPhoneNumberByLevantIdRequest(fetch, token) {
  return async function getPartyPhoneNumberByLevantIdRequest({
    levantId,
    type,
    id,
  }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(
      fetch,
      PartyPhoneNumberByLevantIdUrl(levantId, type, id),
      token,
    );
  };
}

export function createPostAddLeadRequest(fetch, token) {
  return async function postAddLeadRequest(body, leadType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: addLeadMockData,
      };
    }
    return PostData(fetch, addLeadUrl(leadType), body, token);
  };
}

export function createPutLeadRequest(fetch, token) {
  return async function putLeadRequest(body, leadType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: addLeadMockData,
      };
    }
    return PutData(fetch, addLeadUrl(leadType), body, token);
  };
}

export function createGetContactsByLevantIdRequest(fetch, token) {
  return async function getContactsByLevantIdRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, contactsByLevantIdUrl(levantId), token);
  };
}

export function createGetLeadFormFieldsRequest(fetch, token) {
  return async function getLeadFormFieldsRequest(
    params,
    filterSystemCategories,
    isActive,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: columnPersonLead,
      };
    }

    return FetchData(
      fetch,
      leadFormFieldsUrl(params, filterSystemCategories, isActive),
      token,
    );
  };
}

export function createGetLeadRelationsRequest(fetch, token) {
  return async function leadRelationsRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: leadMockData,
      };
    }
    return FetchData(fetch, leadRelationsUrl(levantId), token);
  };
}
