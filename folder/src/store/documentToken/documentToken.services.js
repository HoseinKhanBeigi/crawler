import mockData from '../../../restApiDesign/empty.json';
import {
  FetchData,
  PostData,
  mockService,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

/** ******************************  Mock data  ****************************************** */
const documentTokenMockData = mockService
  ? require('../../../restApiDesign/documentToken/documentToken')
  : {};

/** ******************************  URL Address    ****************************************** */
export const printActivityUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/document/print/activity`;

export const uploadSignDocumentUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/forms/${levantId}/signDocumentToken`;

export const documentFilesUrl = (levantId, documentType) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/document/${levantId}/${documentType}`;

export const documentTypesUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/document/${levantId}/documentToken/all`;

export const documentTokenByLevantIdUrl = (levantId, product) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/document/${levantId}/documentToken?productCode=${product}`;

export const documentTokenUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/document/opportunity/${opportunityId}/documentToken`;

/** ******************************Service Function******************************************* */
export function createGetDocumentTokenRequest(fetch, token) {
  return async function documentTokenRequest(opportunityId, isBusiness) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: documentTokenMockData,
      };
    }
    const businessSuffix = isBusiness ? '/business' : '';
    const url = `${documentTokenUrl(opportunityId)}${businessSuffix}`;
    return FetchData(fetch, url, token);
  };
}

export function createPostCreateDocumentsByLevantIdRequest(fetch, token) {
  return async function createDocumentsByLevantIdRequest({ levantId, body }) {
    const url = `${documentTokenByLevantIdUrl}/${levantId}/documentToken`;
    return PostData(fetch, url, body, token);
  };
}

export function createGetDocumentTypesRequest(fetch, token) {
  return async function getDocumentTypesRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, documentTypesUrl(levantId), token);
  };
}

export function createGetDocumentFilesRequest(fetch, token) {
  return async function getDocumentFilesRequest({ levantId, documentType }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, documentFilesUrl(levantId, documentType), token);
  };
}

export function createGetDocumentTokenByLevantIdRequest(fetch, token) {
  return async function documentTokenByLevantIdRequest({ levantId, product }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return FetchData(
      fetch,
      documentTokenByLevantIdUrl(levantId, product),
      token,
    );
  };
}

export function createPostUploadSignDocumentRequest(fetch, token) {
  return async function postUploadSignDocumentRequest({ levantId, body }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PostData(fetch, uploadSignDocumentUrl(levantId), body, token);
  };
}

export function createPostPrintActivityRequest(fetch, token) {
  return async function postPrintActivityRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PostData(fetch, printActivityUrl(), body, token);
  };
}
