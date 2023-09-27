/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_PARAMETERS_REQUEST,
  PIPELINE_PARAMETERS_SUCCESS,
  PIPELINE_PARAMETERS_FAILURE,
} from './pipelineParameters.constants';

export function pipelineParametersRequest() {
  return {
    type: PIPELINE_PARAMETERS_REQUEST,
  };
}

export function pipelineParametersSuccess(data) {
  return {
    type: PIPELINE_PARAMETERS_SUCCESS,
    payload: data,
  };
}

export function pipelineParametersFailure(error) {
  return {
    type: PIPELINE_PARAMETERS_FAILURE,
    payload: error,
  };
}

export function getPipeParameter(groupId) {
  return (dispatch, getState, { getPipelineParametersRequest }) => {
    dispatch(pipelineParametersRequest());
    return getPipelineParametersRequest({
      groupId,
      groupName: 'PIPELINE_SETTING',
    }).then(data => {
      if (data.err) {
        dispatch(pipelineParametersFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipelineParametersSuccess(response));
      return response;
    });
  };
}

export function updatePipeParameter(groupId, setting) {
  return (dispatch, getState, { updatePipelineParametersRequest }) => {
    dispatch(pipelineParametersRequest());
    const settingsList = setting.map(item => ({
      context: 'KIAN_DIGITAL',
      groupId,
      groupName: 'PIPELINE_SETTING',
      key: item.key,
      value: item.value,
    }));
    return updatePipelineParametersRequest(settingsList).then(data => {
      if (data.err) {
        dispatch(pipelineParametersFailure(data));
        return false;
      }
      const response = data.resp;
      getPipeParameter(groupId);
      return response;
    });
  };
}
