/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_PHASE_REQUEST,
  PIPELINE_PHASE_SUCCESS,
  PIPELINE_PHASE_FAILURE,
  FETCH_PIPELINE_PHASE_SUCCESS,
} from './pipelinePhase.constants';

export function pipelinePhaseRequest() {
  return {
    type: PIPELINE_PHASE_REQUEST,
  };
}

export function pipelinePhaseSuccess(data) {
  return {
    type: PIPELINE_PHASE_SUCCESS,
    payload: data,
  };
}

export function pipelinePhaseFailure(error) {
  return {
    type: PIPELINE_PHASE_FAILURE,
    payload: error,
  };
}

export function fetchPipelinePhaseSuccess(data) {
  return {
    type: FETCH_PIPELINE_PHASE_SUCCESS,
    payload: data,
  };
}

export function createPipelinePhase(phase, pipe) {
  return (dispatch, getState, { createPipelinePhaseRequest }) => {
    dispatch(pipelinePhaseRequest());
    return createPipelinePhaseRequest(phase).then(data => {
      if (data.err) {
        dispatch(pipelinePhaseFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(
        pipelinePhaseSuccess({
          createdPhase: {
            ...response,
            cards: [],
            fields: [],
          },
          pipeId: pipe,
        }),
      );
      return response;
    });
  };
}
