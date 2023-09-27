/* eslint-disable import/prefer-default-export */

import {
  PIPELINE_FORM_DATA_REQUEST,
  PIPELINE_FORM_DATA_SUCCESS,
  PIPELINE_FORM_DATA_FAILURE,
} from './pipelineFormData.constants';

export function formDataRequest() {
  return {
    type: PIPELINE_FORM_DATA_REQUEST,
  };
}

export function formDataSuccess(data) {
  return {
    type: PIPELINE_FORM_DATA_SUCCESS,
    payload: data,
  };
}

export function formDataFailure(error) {
  return {
    type: PIPELINE_FORM_DATA_FAILURE,
    payload: error,
  };
}

export function getPipelineFormData(type, id, cardId) {
  return (dispatch, getState, { getPipelineFormDataRequest }) => {
    dispatch(formDataRequest());
    return getPipelineFormDataRequest(type, id, cardId).then(data => {
      if (data.err) {
        dispatch(formDataFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(formDataSuccess({ id, cardId, data: response }));
      return response;
    });
  };
}

export function updatePipelineCardPhaseData(phaseId, cardId, values) {
  return (dispatch, getState, { updatePipelineCardPhaseDataRequest }) => {
    dispatch(formDataRequest());
    return updatePipelineCardPhaseDataRequest(phaseId, cardId, values).then(
      data => {
        if (data.err) {
          dispatch(formDataFailure(data));
          return false;
        }
        const response = data.resp;
        dispatch(formDataSuccess(response));
        return response;
      },
    );
  };
}
