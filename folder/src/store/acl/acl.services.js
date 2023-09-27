import {
  FetchData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const aclMenuListUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/acl-action/menu`;
const aclAuthoritiesUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/acl-action/authorities`;

export function createGetAclMenuListRequest(fetch, token) {
  return async function getAclMenuListRequest() {
    return FetchData(fetch, aclMenuListUrl(), token);
  };
}

export function createGetAclAuthoritiesListRequest(fetch, token) {
  return async function getAclAuthoritiesListRequest() {
    return FetchData(fetch, aclAuthoritiesUrl(), token);
  };
}
