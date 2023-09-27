/* eslint-disable import/prefer-default-export */

import {
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAILURE,
  POST_FIELD_FAILURE,
  POST_FIELD_REQUEST,
  POST_FIELD_SUCCESS,
  PUT_FIELD_FAILURE,
  PUT_FIELD_REQUEST,
  PUT_FIELD_SUCCESS,
  PUT_FIELDS_ORDER_REQUEST,
  PUT_FIELDS_ORDER_SUCCESS,
  PUT_FIELDS_ORDER_FAILURE,
} from './formSetting.constants';

export function postFieldAction(params) {
  return (dispatch, getState, { postFieldRequest }) => {
    dispatch({ type: POST_FIELD_REQUEST });
    return postFieldRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: POST_FIELD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_FIELD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function putFieldAction(body) {
  return (dispatch, getState, { putFieldRequest }) => {
    dispatch({ type: PUT_FIELD_REQUEST });
    return putFieldRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: PUT_FIELD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: PUT_FIELD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function deleteFieldAction(params) {
  return (dispatch, getState, { deleteFieldRequest }) => {
    dispatch({ type: DELETE_FIELD_REQUEST });
    return deleteFieldRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: DELETE_FIELD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: DELETE_FIELD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function putFieldsOrderAction(body) {
  return (dispatch, getState, { putFieldsOrderRequest }) => {
    dispatch({ type: PUT_FIELDS_ORDER_REQUEST });
    return putFieldsOrderRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: PUT_FIELDS_ORDER_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: PUT_FIELDS_ORDER_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
