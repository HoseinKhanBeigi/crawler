import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelineCardHistoryUrl = cardId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/card/history/${cardId}`;

export const getPipelineCardDataUrl = cardId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/fieldData/dataHistory/${cardId}`;

export function createGetPipelineCardDataRequest(fetch, token) {
  return async function getPipelineCardDataRequest(cardId) {
    return FetchData(fetch, getPipelineCardDataUrl(cardId), token);
  };
}

export function createGetPipelineCardHistoryRequest(fetch, token) {
  return async function getPipelineCardHistoryRequest(cardId) {
    return FetchData(fetch, getPipelineCardHistoryUrl(cardId), token);
  };
}
