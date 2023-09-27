import GetSearchListMockData from '../../../restApiDesign/empty.json';
import {
  FetchData,
  PostData,
  mockService,
  DeleteData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

export const searchByIdUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/filter-preset/${id}`;

export const searchListUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/filter-preset`;

export const saveSearchUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/filter-preset`;

export function createPostSaveSearchRequest(fetch, token) {
  return async function saveSearchRequest(body) {
    return PostData(fetch, saveSearchUrl(), body, token);
  };
}

export function createGetSearchListRequest(fetch, token) {
  return async function getSearchListRequest(filterType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetSearchListMockData,
      };
    }

    return FetchData(
      fetch,
      `${searchListUrl()}?filterType=${filterType || 'PERSON'}`,
      token,
    );
  };
}

export function createGetSearchByIdRequest(fetch, token) {
  return async function getSearchByIdRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetSearchListMockData,
      };
    }

    return FetchData(fetch, searchByIdUrl(id), token);
  };
}

export function createDeleteFilterPresetRequest(fetch, token) {
  return async function deleteFilterPresetRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetSearchListMockData,
      };
    }

    return DeleteData(fetch, searchByIdUrl(id), token);
  };
}
