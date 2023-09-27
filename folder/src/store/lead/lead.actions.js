/* eslint-disable import/prefer-default-export */

import {
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_FAILURE,
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_REQUEST,
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_SUCCESS,
  GET_CONTACTS_BY_LEVANT_ID_FAILURE,
  GET_CONTACTS_BY_LEVANT_ID_REQUEST,
  GET_CONTACTS_BY_LEVANT_ID_SUCCESS,
  GET_LEAD_FORM_FIELDS_FAILURE,
  GET_LEAD_FORM_FIELDS_REQUEST,
  GET_LEAD_FORM_FIELDS_SUCCESS,
  LEAD_FAILURE,
  LEAD_REQUEST,
  LEAD_SUCCESS,
  LEAD_LOAD_COLUMNS_REQUEST,
  LEAD_LOAD_COLUMNS_SUCCESS,
  LEAD_LOAD_COLUMNS_FAILURE,
  POST_ADD_LEAD_FAILURE,
  POST_ADD_LEAD_REQUEST,
  POST_ADD_LEAD_SUCCESS,
  PUT_LEAD_FAILURE,
  PUT_LEAD_REQUEST,
  PUT_LEAD_SUCCESS,
  LEAD_RELATIONS_REQUEST,
  LEAD_RELATIONS_SUCCESS,
  LEAD_RELATIONS_FAILURE,
} from './lead.constants';

export function leadRequest() {
  return {
    type: LEAD_REQUEST,
  };
}

export function leadSuccess(data) {
  return {
    type: LEAD_SUCCESS,
    payload: data,
  };
}

export function leadFailure(error) {
  return {
    type: LEAD_FAILURE,
    payload: error,
  };
}

export function leadLoadColumnsRequest() {
  return {
    type: LEAD_LOAD_COLUMNS_REQUEST,
  };
}

export function leadLoadColumnsSuccess(data) {
  return {
    type: LEAD_LOAD_COLUMNS_SUCCESS,
    payload: data,
  };
}

export function leadLoadColumnsFailure(error) {
  return {
    type: LEAD_LOAD_COLUMNS_FAILURE,
    payload: error,
  };
}

export function getLeadAction(params) {
  return (dispatch, getState, { getLeadRequest }) => {
    dispatch(leadRequest());
    return getLeadRequest(params).then(data => {
      if (data.err) {
        dispatch(leadFailure(data));
        return false;
      }
      dispatch(leadSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getPartyPhoneNumberByLevantIdAction(params) {
  return (dispatch, getState, { getPartyPhoneNumberByLevantIdRequest }) => {
    dispatch({ type: GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_REQUEST });
    return getPartyPhoneNumberByLevantIdRequest(params).then(data => {
      if (data.err) {
        dispatch({
          type: GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postAddLeadAction(body, leadType) {
  return (dispatch, getState, { postAddLeadRequest }) => {
    dispatch({ type: POST_ADD_LEAD_REQUEST });
    return postAddLeadRequest(body, leadType).then(data => {
      if (data.err) {
        dispatch({ type: POST_ADD_LEAD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_ADD_LEAD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function putLeadAction(body, leadType) {
  return (dispatch, getState, { putLeadRequest }) => {
    dispatch({ type: PUT_LEAD_REQUEST });
    return putLeadRequest(body, leadType).then(data => {
      if (data.err) {
        dispatch({ type: PUT_LEAD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: PUT_LEAD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getContactsByLevantIdAction(params) {
  return (dispatch, getState, { getContactsByLevantIdRequest }) => {
    dispatch({ type: GET_CONTACTS_BY_LEVANT_ID_REQUEST });
    return getContactsByLevantIdRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_CONTACTS_BY_LEVANT_ID_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_CONTACTS_BY_LEVANT_ID_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getLeadFormFieldsAction(
  params = null,
  filterSystemCategories = false,
  isActive = false,
) {
  return (dispatch, getState, { getLeadFormFieldsRequest }) => {
    dispatch({ type: GET_LEAD_FORM_FIELDS_REQUEST });
    return getLeadFormFieldsRequest(
      params,
      filterSystemCategories,
      isActive,
    ).then(data => {
      if (data.err) {
        dispatch({ type: GET_LEAD_FORM_FIELDS_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: GET_LEAD_FORM_FIELDS_SUCCESS,
        payload: { data: data.resp, type: params },
      });
      return data.resp;
    });
  };
}

export function leadRelationsRequest() {
  return {
    type: LEAD_RELATIONS_REQUEST,
  };
}

export function leadRelationsSuccess(data) {
  return {
    type: LEAD_RELATIONS_SUCCESS,
    payload: data,
  };
}

export function leadRelationsFailure(error) {
  return {
    type: LEAD_RELATIONS_FAILURE,
    payload: error,
  };
}

export function getLeadRelationsAction(params) {
  return (dispatch, getState, { getLeadRelationsRequest }) => {
    dispatch(leadRelationsRequest());
    return getLeadRelationsRequest(params).then(data => {
      if (data.err) {
        dispatch(leadRelationsFailure(data));
        return false;
      }
      dispatch(leadRelationsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getLeadColumnsAndValuesAction(leadType, leadId) {
  return (dispatch, getState, { getLeadColumnsAndValuesRequest }) => {
    dispatch(leadLoadColumnsRequest());
    return getLeadColumnsAndValuesRequest(leadType, leadId).then(data => {
      if (data.err) {
        dispatch(leadLoadColumnsFailure(data));
        return false;
      }
      dispatch(leadLoadColumnsSuccess(data.resp));
      return data.resp;
    });
  };
}
