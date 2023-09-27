import {
  BASE_VARIABLE_KEYS,
  PostData,
  resolveVariable,
} from '../../serviceConfig';

export const unAssignsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/unassign`;
const assignsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/assign`;
export const checkUnAssignUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/unassign/check`;
export const leadAssignsUrl = type =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${type}/assign`;
export const leadUnAssignsUrl = type =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/${type}/un-assign`;

export function createPostCheckUnAssignRequest(fetch, token) {
  return async function checkUnAssignRequest(body) {
    return PostData(fetch, checkUnAssignUrl(), body, token);
  };
}

export function createPostUnAssignsRequest(fetch, token) {
  return async function postUnAssignsRequest(body, leadType) {
    let requestUrl = unAssignsUrl();
    if (leadType) requestUrl = leadUnAssignsUrl(leadType);
    return PostData(fetch, requestUrl, body, token);
  };
}

export function createPostAssignsRequest(fetch, token) {
  return async function postAssignsRequest(body, leadType) {
    let requestUrl = assignsUrl();
    if (leadType) requestUrl = leadAssignsUrl(leadType);
    return PostData(fetch, requestUrl, body, token);
  };
}
