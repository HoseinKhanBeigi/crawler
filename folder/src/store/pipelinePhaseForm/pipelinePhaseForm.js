import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelinePhaseFieldsDataUrl = pipeId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/phaseForm/${pipeId}`;

export function creatGetPipelinePhaseFieldsDataRequest(fetch, token) {
  return async function getPipelinePhaseFieldsDataRequest(pipeId) {
    return FetchData(fetch, getPipelinePhaseFieldsDataUrl(pipeId), token);
  };
}
