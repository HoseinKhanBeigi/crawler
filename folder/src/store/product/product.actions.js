/* eslint-disable import/prefer-default-export */

import {
  GET_PRODUCT_FORMS_FAILURE,
  GET_PRODUCT_FORMS_REQUEST,
  GET_PRODUCT_FORMS_SUCCESS,
} from './product.constants';

export function getProductFormsAction(params, getAll = false) {
  return (dispatch, getState, { getProductFormsRequest }) => {
    dispatch({ type: GET_PRODUCT_FORMS_REQUEST });
    return getProductFormsRequest(params, getAll).then(data => {
      if (data.err) {
        dispatch({ type: GET_PRODUCT_FORMS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_PRODUCT_FORMS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getAllDocsAction(params) {
  return (dispatch, getState, { getProductFormsRequest }) => {
    dispatch({ type: GET_PRODUCT_FORMS_REQUEST });
    return getProductFormsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_PRODUCT_FORMS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_PRODUCT_FORMS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
