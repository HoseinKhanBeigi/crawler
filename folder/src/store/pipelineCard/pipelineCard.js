import {
  BASE_VARIABLE_KEYS,
  PostData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';

export const movePipelineCardUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card/move`;

export const createPipelineCardUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card`;

export const updatePipelineCardUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card/data`;

export function createMovePipelineCardRequest(fetch, token) {
  return async function movePipelineCardRequest(
    cardId,
    fromPhaseId,
    toPhaseId,
  ) {
    return PutData(
      fetch,
      movePipelineCardUrl(),
      {
        cardId,
        fromPhaseId,
        toPhaseId,
      },
      token,
    );
  };
}

export function createCreatePipelineCardRequest(fetch, token) {
  return async function createPipelineCardRequest(currentPhase, pipe, values) {
    return PostData(
      fetch,
      createPipelineCardUrl(),
      {
        done: false,
        currentPhase,
        pipe,
        values,
      },
      token,
    );
  };
}

export function createUpdatePipelineCardRequest(fetch, token) {
  return async function updatePipelineCardRequest(updatedCard) {
    return PutData(fetch, updatePipelineCardUrl(), updatedCard, token);
  };
}
