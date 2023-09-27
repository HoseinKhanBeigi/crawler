import {
  BASE_VARIABLE_KEYS,
  PostData,
  resolveVariable,
} from '../../serviceConfig';

export const createPipelinePhaseUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/phase`;

export function createCreatePipelinePhaseRequest(fetch, token) {
  return async function createPipelinePhaseRequest(phase) {
    return PostData(fetch, createPipelinePhaseUrl(), phase, token);
  };
}
