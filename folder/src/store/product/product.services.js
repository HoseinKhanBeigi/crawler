import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';
import { mockService } from '../../webConfig';
import GetProductFormsMockData from '../../../restApiDesign/empty.json';

export const productFormsUrl = (product, levantId, getAll) => {
  if (getAll) {
    return `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/forms/${levantId}`;
  }

  return `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/forms/${product}/${levantId}`;
};

export function createGetProductFormsRequest(fetch, token) {
  return async function productFormsRequest({ product, levantId }, getAll) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetProductFormsMockData,
      };
    }

    return FetchData(fetch, productFormsUrl(product, levantId, getAll), token);
  };
}
