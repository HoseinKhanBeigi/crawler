import {
  BASE_VARIABLE_KEYS,
  FetchData,
  PostData,
  mockService,
  resolveVariable,
} from '../../serviceConfig';

const personInfoMockData = mockService
  ? require('../../../restApiDesign/person/personInfo')
  : {};
const createPartyPersonMockData = mockService
  ? require('../../../restApiDesign/person/createPartyPerson')
  : {};
const personByMobileMockData = mockService
  ? require('../../../restApiDesign/person/personByMobile')
  : {};
const addPersonMockData = mockService
  ? require('../../../restApiDesign/person/addPerson')
  : {};
const personMockData = mockService
  ? require('../../../restApiDesign/person/person')
  : {};

export const personInfoUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PARTY_URL,
  )}/person-by-levantId/${params}`;

export const createPartyPersonUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PARTY_URL)}/party-person`;

export const personByMobileUrl = mobile =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PARTY_URL,
  )}/person-by-levantId/${mobile}`;

export const addPersonUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/party`;

export const personUrl = params =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/party/search?${params}`;

export function createGetPersonRequest(fetch, token) {
  return async function personRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: personMockData,
      };
    }
    return FetchData(fetch, personUrl(params), token);
  };
}

export function createGetAddPersonRequest(fetch, token) {
  return async function addPersonRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: addPersonMockData,
      };
    }
    return PostData(fetch, addPersonUrl(), params, token);
  };
}

export function createGetPersonByMobileRequest(fetch, token) {
  return async function personByMobileRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: personByMobileMockData,
      };
    }
    const { mobile } = params;
    return FetchData(fetch, personByMobileUrl(mobile), token);
  };
}

export function createPostPartyPersonRequest(fetch, token) {
  return async function createPartyPersonRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: createPartyPersonMockData,
      };
    }
    return PostData(fetch, createPartyPersonUrl(), body, token);
  };
}

export function createGetPersonInfoRequest(fetch, token) {
  return async function personInfoRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: personInfoMockData,
      };
    }
    return FetchData(fetch, personInfoUrl(params), token);
  };
}
