import {
  POST_ASSIGNS_FAILURE,
  POST_ASSIGNS_REQUEST,
  POST_ASSIGNS_SUCCESS,
  POST_CHECK_UNASSIGN_FAILURE,
  POST_CHECK_UNASSIGN_REQUEST,
  POST_CHECK_UNASSIGN_SUCCESS,
  POST_UNASSIGNS_FAILURE,
  POST_UNASSIGNS_REQUEST,
  POST_UNASSIGNS_SUCCESS,
} from './assign.constants';

export function postCheckUnAssignAction(params) {
  return (dispatch, getState, { postCheckUnAssignRequest }) => {
    dispatch({ type: POST_CHECK_UNASSIGN_REQUEST });
    return postCheckUnAssignRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: POST_CHECK_UNASSIGN_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_CHECK_UNASSIGN_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postUnAssignsAction(...params) {
  return (dispatch, getState, { postUnAssignsRequest }) => {
    dispatch({ type: POST_UNASSIGNS_REQUEST });
    return postUnAssignsRequest(...params).then(data => {
      if (data.err) {
        dispatch({ type: POST_UNASSIGNS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_UNASSIGNS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postAssignsAction(...params) {
  return (dispatch, getState, { postAssignsRequest }) => {
    dispatch({ type: POST_ASSIGNS_REQUEST });
    return postAssignsRequest(...params).then(data => {
      if (data.err) {
        dispatch({ type: POST_ASSIGNS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_ASSIGNS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
