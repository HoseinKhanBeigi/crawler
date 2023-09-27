import GetUsageMockData from '../../../restApiDesign/empty.json';
import {
  DeleteData,
  PutData,
  PostData,
  FetchData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';
import { mockService } from '../../webConfig';
import GetTagsMockData from '../../../restApiDesign/tag/getTag.json';

export const usageUrl = tagId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags/usage/${tagId}`;
export const tagsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags`;
export const taggingUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags/tagging`;
export const leadTaggingUrl = type =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${type}/tag`;
export const leadUnTaggingUrl = type =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${type}/untag`;
export const tagUrlWithId = tagId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags/${tagId}`;
export const tagsListUrl = levantId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags/taggedId/${levantId}`;
export const taskTagsListUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/tags/taggedId/${levantId}?taggingClass=TASK`;
export const unTagUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/tags/unTagging`;
export function createGetTagsRequest(fetch, token) {
  return async function tagsRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetTagsMockData,
      };
    }

    return FetchData(fetch, tagsUrl(), token);
  };
}

export function createPostTagsRequest(fetch, token) {
  return async function postTagsRequest(body) {
    return PostData(fetch, tagsUrl(), body, token);
  };
}

export function createPostTaggingRequest(fetch, token) {
  return async function postTaggingRequest(body, leadType) {
    let requestUrl = taggingUrl();
    if (leadType) requestUrl = leadTaggingUrl(leadType);
    return PostData(fetch, requestUrl, body, token);
  };
}

export function createPostUnTaggingRequest(fetch, token) {
  return async function postUnTaggingRequest(body, leadType) {
    let requestUrl = unTagUrl();
    if (leadType) requestUrl = leadUnTaggingUrl(leadType);
    return PostData(fetch, requestUrl, body, token);
  };
}

export function createPutTagsRequest(fetch, token) {
  return async function putTagsRequest(body) {
    return PutData(fetch, tagsUrl(), body, token);
  };
}

export function createDeleteTagsRequest(fetch, token) {
  return async function deleteTagsRequest(tagId) {
    return DeleteData(fetch, tagUrlWithId(tagId), token);
  };
}

export function createGetUsageRequest(fetch, token) {
  return async function getUsageRequest(tagId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetUsageMockData,
      };
    }

    return FetchData(fetch, usageUrl(tagId), token);
  };
}

export function createGetTagListRequest(fetch, token) {
  return async function getUsageRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetUsageMockData,
      };
    }

    return FetchData(fetch, tagsListUrl(params), token);
  };
}
export function createGetTaskTagsListRequest(fetch, token) {
  return async function getTaskTagsListRequest(params) {
    return FetchData(fetch, taskTagsListUrl(params), token);
  };
}
