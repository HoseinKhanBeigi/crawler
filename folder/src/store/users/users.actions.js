/* eslint-disable import/prefer-default-export */

import {
  SET_PASSWORD_FAILURE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  USER_STATUS_FAILURE,
  USER_STATUS_REQUEST,
  USER_STATUS_SUCCESS,
  USERS_FAILURE,
  USERS_REQUEST,
  USERS_SUCCESS,
} from './users.constants';

export function usersRequest() {
  return {
    type: USERS_REQUEST,
  };
}

export function usersSuccess(data) {
  return {
    type: USERS_SUCCESS,
    payload: data,
  };
}

export function usersFailure(error) {
  return {
    type: USERS_FAILURE,
    payload: error,
  };
}

export function getUsersAction(params) {
  return (dispatch, getState, { getUsersRequest }) => {
    dispatch(usersRequest());
    return getUsersRequest(params).then(data => {
      if (data.err) {
        dispatch(usersFailure(data));
        return false;
      }
      dispatch(usersSuccess(data.resp));
      return data.resp;
    });
  };
}

export function userStatusRequest() {
  return {
    type: USER_STATUS_REQUEST,
  };
}

export function userStatusSuccess(data) {
  return {
    type: USER_STATUS_SUCCESS,
    payload: data,
  };
}

export function userStatusFailure(error) {
  return {
    type: USER_STATUS_FAILURE,
    payload: error,
  };
}

export function setPasswordRequest() {
  return {
    type: SET_PASSWORD_REQUEST,
  };
}

export function setPasswordSuccess(data) {
  return {
    type: SET_PASSWORD_SUCCESS,
    payload: data,
  };
}

export function setPasswordFailure(error) {
  return {
    type: SET_PASSWORD_FAILURE,
    payload: error,
  };
}

export function getSetPasswordAction(params, body) {
  return (dispatch, getState, { getSetPasswordRequest }) => {
    dispatch(setPasswordRequest());
    return getSetPasswordRequest(params, body)
      .then(data => {
        dispatch(setPasswordSuccess(data));
        return data;
      })
      .catch(error => {
        dispatch(setPasswordFailure(error));
      });
  };
}
