import {
  BASE_VARIABLE_KEYS,
  FetchData,
  resolveVariable,
} from '../../serviceConfig';
import { PutData } from '../../utils/request/requestHelpers';

export const getPipelinePhaseUrl = (phaseId, cardId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/phaseForm/getData/${phaseId}/${cardId}`;

export const getPipelineCardDataUrl = cardId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card/${cardId}`;

export const updatePipelineCardPhaseDataUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
  )}/phaseForm/updateData`;

export function createGetPipelineFormDataRequest(fetch, token) {
  return async function pipelineFormDataRequest(type, id, cardId) {
    if (type === 'phase') {
      return FetchData(fetch, getPipelinePhaseUrl(id, cardId), token);
    }
    return FetchData(fetch, getPipelineCardDataUrl(cardId), token);
  };
}

export function createUpdatePipelineCardPhaseDataRequest(fetch, token) {
  return async function updatePipelineCardPhaseDataRequest(
    phaseId,
    cardId,
    data,
  ) {
    return PutData(
      fetch,
      updatePipelineCardPhaseDataUrl(),
      {
        cardId,
        phase: phaseId,
        values: data,
      },
      token,
    );
  };
}
