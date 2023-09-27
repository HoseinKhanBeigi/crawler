/* eslint-disable import/prefer-default-export */

import {
  GET_PHONE_CALLS_PATTERNS_FAILURE,
  GET_PHONE_CALLS_PATTERNS_REQUEST,
  GET_PHONE_CALLS_PATTERNS_SUCCESS,
  GET_TEMPLATES_FAILURE,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  PHONE_CALLS_FAILURE,
  PHONE_CALLS_REQUEST,
  PHONE_CALLS_SUCCESS,
  POST_ADD_CALL_DETAILS_REQUEST,
  POST_ADD_CALL_DETAILS_SUCCESS,
  POST_ADD_CALL_DETAILS_FAILURE,
  POST_CLICK_TO_CALL_REQUEST,
  POST_CLICK_TO_CALL_SUCCESS,
  POST_CLICK_TO_CALL_FAILURE,
  PUT_CALL_DETAIL_REQUEST,
  PUT_CALL_DETAIL_SUCCESS,
  PUT_CALL_DETAIL_FAILURE,
  GET_CALL_DETAIL_BY_ID_REQUEST,
  GET_CALL_DETAIL_BY_ID_SUCCESS,
  GET_CALL_DETAIL_BY_ID_FAILURE,
} from './phoneCalls.constants';

export function phoneCallsRequest() {
  return {
    type: PHONE_CALLS_REQUEST,
  };
}

export function phoneCallsSuccess(data) {
  return {
    type: PHONE_CALLS_SUCCESS,
    payload: data,
  };
}

export function phoneCallsFailure(error) {
  return {
    type: PHONE_CALLS_FAILURE,
    payload: error,
  };
}

export function getPhoneCallsAction(params) {
  return (dispatch, getState, { getPhoneCallsRequest }) => {
    dispatch(phoneCallsRequest());
    return getPhoneCallsRequest(params).then(data => {
      if (data.err) {
        dispatch(phoneCallsFailure(data));
        return false;
      }
      dispatch(phoneCallsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getPhoneCallsPatternsAction(params) {
  return (dispatch, getState, { getPhoneCallsPatternsRequest }) => {
    dispatch({ type: GET_PHONE_CALLS_PATTERNS_REQUEST });
    return getPhoneCallsPatternsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_PHONE_CALLS_PATTERNS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_PHONE_CALLS_PATTERNS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getTemplatesAction(params = null) {
  return (dispatch, getState, { getTemplatesRequest }) => {
    dispatch({ type: GET_TEMPLATES_REQUEST });
    return getTemplatesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_TEMPLATES_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: GET_TEMPLATES_SUCCESS,
        payload: { data: data.resp, type: params },
      });
      return data.resp;
    });
  };
}

export function postAddCallDetailsAction(body) {
  return (dispatch, getState, { postAddCallDetailRequest }) => {
    dispatch({ type: POST_ADD_CALL_DETAILS_REQUEST });
    return postAddCallDetailRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_ADD_CALL_DETAILS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_ADD_CALL_DETAILS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postClickToCallAction(body) {
  return (dispatch, getState, { postClickToCallRequest }) => {
    dispatch({ type: POST_CLICK_TO_CALL_REQUEST });
    return postClickToCallRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_CLICK_TO_CALL_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_CLICK_TO_CALL_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function putCallDetailAction(body) {
  return (dispatch, getState, { putCallDetailRequest }) => {
    dispatch({ type: PUT_CALL_DETAIL_REQUEST });
    return putCallDetailRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: PUT_CALL_DETAIL_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: PUT_CALL_DETAIL_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getCallDetailByIdAction(id) {
  return (dispatch, getState, { getCallDetailByIdRequest }) => {
    dispatch({ type: GET_CALL_DETAIL_BY_ID_REQUEST });
    return getCallDetailByIdRequest(id).then(data => {
      if (data.err) {
        dispatch({ type: GET_CALL_DETAIL_BY_ID_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_CALL_DETAIL_BY_ID_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
