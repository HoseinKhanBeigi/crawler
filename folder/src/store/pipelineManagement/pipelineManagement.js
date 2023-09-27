import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
  createFormBody,
} from '../../serviceConfig';

export const getPipesUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/pipe?${createFormBody(params)}`;

export const getPipeUrl = pipeId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/pipe/${pipeId}`;

export function createGetPipesRequest(fetch, token) {
  return async function pipesRequest(params) {
    return FetchData(fetch, getPipesUrl(params), token, {
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
    });
  };
}

export function createGetPipeRequest(fetch, token) {
  return async function pipeRequest(pipeId) {
    return FetchData(fetch, getPipeUrl(pipeId), token, {
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
    });
  };
}
