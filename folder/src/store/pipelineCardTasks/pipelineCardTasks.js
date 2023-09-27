import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelineCardTasksUrl = cardId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/task-management/search?detailValue=${cardId}&detailType=CARD`;

export function createGetPipelineCardTasksRequest(fetch, token) {
  return async function getPipelineCardTasksRequest(cardId) {
    return FetchData(fetch, getPipelineCardTasksUrl(cardId), token);
  };
}
