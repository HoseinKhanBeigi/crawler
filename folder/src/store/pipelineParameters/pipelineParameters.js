import {
  BASE_VARIABLE_KEYS,
  createFormBody,
  FetchData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';

export const createPipelineParametersUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/parameter/upsert`;

export const getPipelineParametersUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/parameter/search?${createFormBody(params)}`;

export function createUpdatePipelineParametersRequest(fetch, token) {
  return async function updatePipelineParametersRequest(body) {
    return PutData(fetch, createPipelineParametersUrl(), body, token);
  };
}

export function createGetPipelineParametersRequest(fetch, token) {
  return async function getPipelineParametersRequest(params) {
    return FetchData(fetch, getPipelineParametersUrl(params), token);
  };
}
