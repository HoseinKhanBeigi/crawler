import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelineCardUrl = cardId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card/${cardId}`;

export function createGetPipelineCardRequest(fetch, token) {
  return async function getPipelineCardRequest(cardId) {
    return FetchData(fetch, getPipelineCardUrl(cardId), token);
  };
}
