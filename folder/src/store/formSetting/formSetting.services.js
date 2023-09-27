import {
  PutData,
  PostData,
  DeleteData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

export const fieldUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/columns/fields`;
export const putFieldUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/columns/fields`;
export const deleteFieldUrl = fieldId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/columns/fields/${fieldId}`;
export const putFieldsOrderUrl = partyType =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/columns/lead/${partyType}`;

export function createPostFieldRequest(fetch, token) {
  return async function fieldRequest(body) {
    return PostData(fetch, fieldUrl(), body, token);
  };
}

export function createPutFieldRequest(fetch, token) {
  return async function putFieldRequest(body) {
    return PutData(fetch, putFieldUrl(), body, token);
  };
}

export function createDeleteFieldRequest(fetch, token) {
  return async function deleteFieldRequest(fieldId) {
    return DeleteData(fetch, deleteFieldUrl(fieldId), token);
  };
}

export function createPutFieldsOrderRequest(fetch, token) {
  return async function putFieldsOrderRequest({ partyType, body }) {
    return PutData(fetch, putFieldsOrderUrl(partyType), body, token);
  };
}
