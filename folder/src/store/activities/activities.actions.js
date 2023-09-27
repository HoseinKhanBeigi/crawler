// Activity List
import {
  ACTIVITIES_FAILURE,
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITY_FAILURE,
  ACTIVITY_LIST_FAILURE,
  ACTIVITY_LIST_REQUEST,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_REQUEST,
  ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAILURE,
  DELETE_ACTIVITY_REQUEST,
  DELETE_ACTIVITY_SUCCESS,
  POST_CREATE_CALL_ACTIVITY_FAILURE,
  POST_CREATE_CALL_ACTIVITY_REQUEST,
  POST_CREATE_CALL_ACTIVITY_SUCCESS,
  PUT_ACTIVITY_FAILURE,
  PUT_ACTIVITY_REQUEST,
  PUT_ACTIVITY_SUCCESS,
  POST_LOG_ACTIVITY_FAILURE,
  POST_LOG_ACTIVITY_REQUEST,
  POST_LOG_ACTIVITY_SUCCESS,
} from './activities.constants';

export function activityListRequest() {
  return {
    type: ACTIVITY_LIST_REQUEST,
  };
}

export function activityListSuccess(data) {
  return {
    type: ACTIVITY_LIST_SUCCESS,
    payload: data,
  };
}

export function activityListFailure(error) {
  return {
    type: ACTIVITY_LIST_FAILURE,
    payload: error,
  };
}

export function getActivityListAction(params) {
  return (dispatch, getState, { getActivityListRequest }) => {
    dispatch(activityListRequest());
    return getActivityListRequest(params).then(data => {
      if (data.err) {
        dispatch(activityListFailure(data));
        return false;
      }
      dispatch(activityListSuccess(data.resp));
      return data.resp;
    });
  };
}

// Activities
export function activitiesRequest() {
  return {
    type: ACTIVITIES_REQUEST,
  };
}

export function activitiesSuccess(data) {
  return {
    type: ACTIVITIES_SUCCESS,
    payload: data,
  };
}

export function activitiesFailure(error) {
  return {
    type: ACTIVITIES_FAILURE,
    payload: error,
  };
}

export function getActivitiesAction(params) {
  return (dispatch, getState, { getActivitiesRequest }) => {
    dispatch(activitiesRequest());
    return getActivitiesRequest(params).then(data => {
      if (data.err) {
        dispatch(activitiesFailure(data));
        return false;
      }
      dispatch(activitiesSuccess(data.resp));
      return data.resp;
    });
  };
}

// Delete Activity
export function deleteActivityRequest() {
  return {
    type: DELETE_ACTIVITY_REQUEST,
  };
}

export function deleteActivitySuccess(data) {
  return {
    type: DELETE_ACTIVITY_SUCCESS,
    payload: data,
  };
}

export function deleteActivityFailure(error) {
  return {
    type: DELETE_ACTIVITY_FAILURE,
    payload: error,
  };
}

export function getDeleteActivityAction(params) {
  return (dispatch, getState, { getDeleteActivityRequest }) => {
    dispatch(deleteActivityRequest());
    return getDeleteActivityRequest(params).then(data => {
      if (data.err) {
        dispatch(deleteActivityFailure(data));
        return false;
      }
      dispatch(deleteActivitySuccess(data.resp));
      return data.resp;
    });
  };
}

// Create Activity
export function createActivityRequest() {
  return {
    type: CREATE_ACTIVITY_REQUEST,
  };
}

export function createActivitySuccess(data) {
  return {
    type: CREATE_ACTIVITY_SUCCESS,
    payload: data,
  };
}

export function createActivityFailure(error) {
  return {
    type: CREATE_ACTIVITY_FAILURE,
    payload: error,
  };
}

// add new activity.json
export function getCreateActivityAction(params) {
  return (dispatch, getState, { getCreateActivityRequest }) => {
    dispatch(createActivityRequest());
    return getCreateActivityRequest(params).then(data => {
      if (data.err) {
        dispatch(createActivityFailure(data));
        return false;
      }
      dispatch(createActivitySuccess(data.resp));
      return data.resp;
    });
  };
}

// Put Activity
export function putActivityRequest() {
  return {
    type: PUT_ACTIVITY_REQUEST,
  };
}

export function putActivitySuccess(data) {
  return {
    type: PUT_ACTIVITY_SUCCESS,
    payload: data,
  };
}

export function putActivityFailure(error) {
  return {
    type: PUT_ACTIVITY_FAILURE,
    payload: error,
  };
}

export function getPutActivityAction(params) {
  return (dispatch, getState, { getPutActivityRequest }) => {
    dispatch(putActivityRequest());
    return getPutActivityRequest(params).then(data => {
      if (data.err) {
        dispatch(putActivityFailure(data));
      }
      dispatch(putActivitySuccess(data.resp));
      return data.resp;
    });
  };
}

// Get Activity by id
export function activityRequest() {
  return {
    type: ACTIVITY_REQUEST,
  };
}

export function activitySuccess(data) {
  return {
    type: ACTIVITY_SUCCESS,
    payload: data,
  };
}

export function activityFailure(error) {
  return {
    type: ACTIVITY_FAILURE,
    payload: error,
  };
}

export function getActivityAction(params) {
  return (dispatch, getState, { getActivityRequest }) => {
    dispatch(activityRequest());
    return getActivityRequest(params).then(data => {
      if (data.err) {
        dispatch(activityFailure(data));
        return false;
      }
      dispatch(activitySuccess(data.resp));
      return data.resp;
    });
  };
}

export function postCreateCallActivityAction(body) {
  return (dispatch, getState, { postCreateCallActivityRequest }) => {
    dispatch({ type: POST_CREATE_CALL_ACTIVITY_REQUEST });
    return postCreateCallActivityRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_CREATE_CALL_ACTIVITY_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_CREATE_CALL_ACTIVITY_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postLogActivityAction(body) {
  return (dispatch, getState, { postLogActivityRequest }) => {
    dispatch({ type: POST_LOG_ACTIVITY_REQUEST });
    return postLogActivityRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_LOG_ACTIVITY_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_LOG_ACTIVITY_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
