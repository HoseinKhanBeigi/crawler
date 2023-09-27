/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_FORM_REQUEST,
  PIPELINE_FORM_SUCCESS,
  PIPELINE_FORM_FAILURE,
} from './pipelineForm.constants';

export function formRequest() {
  return {
    type: PIPELINE_FORM_REQUEST,
  };
}

export function formSuccess(data) {
  return {
    type: PIPELINE_FORM_SUCCESS,
    payload: data,
  };
}

export function formFailure(error) {
  return {
    type: PIPELINE_FORM_FAILURE,
    payload: error,
  };
}

export function getPipelineForm(type, id) {
  return (dispatch, getState, { getPipelineFormRequest }) => {
    dispatch(formRequest());
    return getPipelineFormRequest(type, id).then(data => {
      if (data.err) {
        dispatch(formFailure({ id, data }));
        return false;
      }
      const response = data.resp;
      dispatch(formSuccess({ id, data: response }));
      return response;
    });
  };
}
