/* eslint-disable import/prefer-default-export */

import {
  GET_EMAIL_PATTERNS_FAILURE,
  GET_EMAIL_PATTERNS_REQUEST,
  GET_EMAIL_PATTERNS_SUCCESS,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from './sendEmail.constants';
import CPMessage from '../../components/CP/CPMessage';

export function sendEmailRequest() {
  return {
    type: SEND_EMAIL_REQUEST,
  };
}

export function sendEmailSuccess(data) {
  return {
    type: SEND_EMAIL_SUCCESS,
    payload: data,
  };
}

export function sendEmailFailure(error) {
  return {
    type: SEND_EMAIL_FAILURE,
    payload: error,
  };
}

export function postSendEmailAction(...params) {
  return (dispatch, getState, { postSendEmailRequest }) => {
    dispatch(sendEmailRequest());
    return postSendEmailRequest(...params).then(data => {
      if (data.err) {
        dispatch(sendEmailFailure(data));
        return data;
      }
      dispatch(sendEmailSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getEmailPatternsAction(params) {
  return (dispatch, getState, { getEmailPatternsRequest }) => {
    dispatch({ type: GET_EMAIL_PATTERNS_REQUEST });
    return getEmailPatternsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_EMAIL_PATTERNS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_EMAIL_PATTERNS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function checkExistEmailAction(params) {
  return (dispatch, getState, { checkExistEmailRequest }) =>
    checkExistEmailRequest(params).then(data => {
      if (data.err) {
        CPMessage('خطای دریافت اطلاعات ایمیل کاربران', 'error');
        return null;
      }
      return data.resp;
    });
}
