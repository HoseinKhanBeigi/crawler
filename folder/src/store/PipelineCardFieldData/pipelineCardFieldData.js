import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getCardFieldDataUrl = cardId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/card/fields/data/${cardId}`;

export function createGetCardFieldDataRequest(fetch, token) {
  return async function getCardFieldDataRequest(cardId) {
    return FetchData(fetch, getCardFieldDataUrl(cardId), token);
  };
}
