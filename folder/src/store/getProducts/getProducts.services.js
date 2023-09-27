import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export function createGetGetProductsRequest(fetch, token) {
  return async function getProductsRequest() {
    return FetchData(
      fetch,
      `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/products`,
      token,
    );
  };
}

export function createGetProductGroupsRequest(fetch, token) {
  return async function getProductGroupsRequest() {
    return FetchData(
      fetch,
      `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/product-groups`,
      token,
    );
  };
}
