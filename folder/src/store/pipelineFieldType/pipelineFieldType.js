import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelineFieldTypesUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/fieldType`;

export function createGetPipelineFieldTypesRequest(fetch, token) {
  return async function getPipelineFieldTypesRequest() {
    return FetchData(fetch, getPipelineFieldTypesUrl(), token);
  };
}
