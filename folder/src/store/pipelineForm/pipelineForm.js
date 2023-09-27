import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';

export const getPipelineStartFormUrl = formId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/startForm/getByPipeId/${formId}`;

export const getPipelinePhaseFormUrl = formId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/phaseForm/getByPhaseId/${formId}`;

export function createGetPipelineFormRequest(fetch, token) {
  return async function pipelineFormRequest(type, formId) {
    if (type === 'phase') {
      return FetchData(fetch, getPipelinePhaseFormUrl(formId), token);
    }
    return FetchData(fetch, getPipelineStartFormUrl(formId), token);
  };
}
