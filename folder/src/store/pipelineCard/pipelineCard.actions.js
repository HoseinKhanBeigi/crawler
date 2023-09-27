/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_CARD_REQUEST,
  PIPELINE_CARD_SUCCESS,
  PIPELINE_CARD_FAILURE,
} from './pipelineCard.constants';

export function pipelineCardRequest() {
  return {
    type: PIPELINE_CARD_REQUEST,
  };
}

export function pipelineCardSuccess(data) {
  return {
    type: PIPELINE_CARD_SUCCESS,
    payload: data,
  };
}

export function pipelineCardFailure(error) {
  return {
    type: PIPELINE_CARD_FAILURE,
    payload: error,
  };
}

export function movePipelineCard(cardId, fromPhaseId, toPhaseId) {
  return (dispatch, getState, { movePipelineCardRequest }) => {
    dispatch(pipelineCardRequest());
    return movePipelineCardRequest(cardId, fromPhaseId, toPhaseId).then(
      data => {
        if (data.err) {
          dispatch(pipelineCardFailure(data));
          return false;
        }
        const response = data.resp;
        dispatch(pipelineCardSuccess(response));
        return response;
      },
    );
  };
}

export function createPipelineCard(currentPhase, pipe, values) {
  return (dispatch, getState, { createPipelineCardRequest }) => {
    dispatch(pipelineCardRequest());
    return createPipelineCardRequest(currentPhase, pipe, values).then(data => {
      if (data.err) {
        dispatch(pipelineCardFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipelineCardSuccess(response));
      return response;
    });
  };
}

export function updatePipelineCard(updatedCard, phaseId) {
  return (dispatch, getState, { updatePipelineCardRequest }) => {
    dispatch(pipelineCardRequest());
    return updatePipelineCardRequest(updatedCard).then(data => {
      if (data.err) {
        dispatch(pipelineCardFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(
        pipelineCardSuccess({
          values: updatedCard.values,
          phaseId,
        }),
      );
      return response;
    });
  };
}
