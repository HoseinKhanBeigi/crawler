import {
  PIPELINE_PHASE_FORM_FAILURE,
  PIPELINE_PHASE_FORM_REQUEST,
  PIPELINE_PHASE_FORM_SUCCESS,
} from './pipelinePhaseForm.constants';

export function pipelinePhaseFormRequest() {
  return {
    type: PIPELINE_PHASE_FORM_REQUEST,
  };
}

export function pipelinePhaseFormSuccess(data) {
  return {
    type: PIPELINE_PHASE_FORM_SUCCESS,
    payload: data,
  };
}

export function pipelinePhaseFormFailure(error) {
  return {
    type: PIPELINE_PHASE_FORM_FAILURE,
    payload: error,
  };
}

export function getPhaseFieldsData(pipeId) {
  return (dispatch, getState, { getPipelinePhaseFieldsDataRequest }) => {
    dispatch(pipelinePhaseFormRequest());
    return getPipelinePhaseFieldsDataRequest(pipeId).then(data => {
      if (data.err) {
        dispatch(pipelinePhaseFormFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipelinePhaseFormSuccess(response));
      return response;
    });
  };
}
