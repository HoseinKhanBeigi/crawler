/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_FIELD_TYPE_REQUEST,
  PIPELINE_FIELD_TYPE_SUCCESS,
  PIPELINE_FIELD_TYPE_FAILURE,
} from './pipelineFieldType.constants';

export function fieldTypeRequest() {
  return {
    type: PIPELINE_FIELD_TYPE_REQUEST,
  };
}

export function fieldTypeSuccess(data) {
  return {
    type: PIPELINE_FIELD_TYPE_SUCCESS,
    payload: data,
  };
}

export function fieldTypeFailure(error) {
  return {
    type: PIPELINE_FIELD_TYPE_FAILURE,
    payload: error,
  };
}

export function getPipelineFieldTypes() {
  return (dispatch, getState, { getPipelineFieldTypesRequest }) => {
    dispatch(fieldTypeRequest());
    return getPipelineFieldTypesRequest().then(data => {
      if (data.err) {
        dispatch(fieldTypeFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(fieldTypeSuccess(response));
      return response;
    });
  };
}
