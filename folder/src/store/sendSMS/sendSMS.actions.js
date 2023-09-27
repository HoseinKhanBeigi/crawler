/* eslint-disable import/prefer-default-export */

import {
  GET_SMS_PATTERNS_FAILURE,
  GET_SMS_PATTERNS_REQUEST,
  GET_SMS_PATTERNS_SUCCESS,
  POST_SEND_WHATS_APP_FAILURE,
  POST_SEND_WHATS_APP_REQUEST,
  POST_SEND_WHATS_APP_SUCCESS,
  SEND_SMS_FAILURE,
  SEND_SMS_REQUEST,
  SEND_SMS_SUCCESS,
} from './sendSMS.constants';

export function sendSmsRequest() {
  return {
    type: SEND_SMS_REQUEST,
  };
}

export function sendSmsSuccess(data) {
  return {
    type: SEND_SMS_SUCCESS,
    payload: data,
  };
}

export function sendSmsFailure(error) {
  return {
    type: SEND_SMS_FAILURE,
    payload: error,
  };
}

export function postSendSmsAction(...params) {
  return (dispatch, getState, { postSendSmsRequest }) => {
    dispatch(sendSmsRequest());
    return postSendSmsRequest(...params).then(data => {
      if (data.err) {
        dispatch(sendSmsFailure(data));
        return data;
      }
      dispatch(sendSmsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getSmsPatternsAction(params) {
  return (dispatch, getState, { getSmsPatternsRequest }) => {
    dispatch({ type: GET_SMS_PATTERNS_REQUEST });
    return getSmsPatternsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_SMS_PATTERNS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_SMS_PATTERNS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postSendWhatsAppAction(body) {
  return (dispatch, getState, { postSendWhatsAppRequest }) => {
    dispatch({ type: POST_SEND_WHATS_APP_REQUEST });
    return postSendWhatsAppRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_SEND_WHATS_APP_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_SEND_WHATS_APP_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
