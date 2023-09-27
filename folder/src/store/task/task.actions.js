/* eslint-disable import/prefer-default-export */
import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  TASK_LIST_FAILURE,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from './task.constants';

// ************************* task list ***************************
export function taskListRequest() {
  return {
    type: TASK_LIST_REQUEST,
  };
}

export function taskListSuccess(data) {
  return {
    type: TASK_LIST_SUCCESS,
    payload: data,
  };
}

export function taskListFailure(error) {
  return {
    type: TASK_LIST_FAILURE,
    payload: error,
  };
}

export function getTaskListAction(params) {
  return (dispatch, getState, { getTaskListRequest }) => {
    dispatch(taskListRequest());
    return getTaskListRequest(params).then(data => {
      if (data.err) {
        dispatch(taskListFailure(data));
        return false;
      }
      dispatch(taskListSuccess(data.resp));
      return data.resp;
    });
  };
}

// ************************* delete task **************************
export function deleteTaskRequest() {
  return {
    type: DELETE_TASK_REQUEST,
  };
}

export function deleteTaskSuccess(data) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: data,
  };
}

export function deleteTaskFailure(error) {
  return {
    type: DELETE_TASK_FAILURE,
    payload: error,
  };
}

export function getDeleteTaskAction(id) {
  return (dispatch, getState, { getDeleteTaskRequest }) => {
    dispatch(deleteTaskRequest());
    return getDeleteTaskRequest(id).then(data => {
      if (data.err) {
        dispatch(deleteTaskFailure(data));
      }
      dispatch(deleteTaskSuccess(data.resp));
      return data.resp;
    });
  };
}

// ************************* add task ***************************
export function addTaskRequest() {
  return {
    type: ADD_TASK_REQUEST,
  };
}

export function addTaskSuccess(data) {
  return {
    type: ADD_TASK_SUCCESS,
    payload: data,
  };
}

export function addTaskFailure(error) {
  return {
    type: ADD_TASK_FAILURE,
    payload: error,
  };
}

export function getAddTaskAction(params) {
  return (dispatch, getState, { getAddTaskRequest }) => {
    dispatch({ type: ADD_TASK_REQUEST });
    return getAddTaskRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: ADD_TASK_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: ADD_TASK_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
