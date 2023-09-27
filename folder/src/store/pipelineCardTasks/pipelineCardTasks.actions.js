import {
  PIPELINE_CARD_TASKS_FAILURE,
  PIPELINE_CARD_TASKS_REQUEST,
  PIPELINE_CARD_TASKS_SUCCESS,
} from './pipelineCardTasks.constants';

export function pipelineCardTasksSuccess(data) {
  return {
    type: PIPELINE_CARD_TASKS_SUCCESS,
    payload: data,
  };
}
export function pipelineCardTasksRequest() {
  return {
    type: PIPELINE_CARD_TASKS_REQUEST,
  };
}

export function pipelineCardTasksFailure(error) {
  return {
    type: PIPELINE_CARD_TASKS_FAILURE,
    payload: error,
  };
}

export function getCardTasksAction(id) {
  return (dispatch, getState, { getPipelineCardTasksRequest }) => {
    dispatch(pipelineCardTasksRequest());
    return getPipelineCardTasksRequest(id).then(data => {
      if (data.err) {
        dispatch(pipelineCardTasksFailure(data));
      }
      dispatch(pipelineCardTasksSuccess(data.resp.content));
      return data.resp;
    });
  };
}
