/* eslint-disable import/prefer-default-export */

import {
  ADD_PERSON_FAILURE,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  CREATE_PARTY_PERSON_FAILURE,
  CREATE_PARTY_PERSON_REQUEST,
  CREATE_PARTY_PERSON_SUCCESS,
  PERSON_BY_MOBILE_FAILURE,
  PERSON_BY_MOBILE_REQUEST,
  PERSON_BY_MOBILE_SUCCESS,
  PERSON_FAILURE,
  PERSON_INFO_FAILURE,
  PERSON_INFO_REQUEST,
  PERSON_INFO_SUCCESS,
  PERSON_REQUEST,
  PERSON_SUCCESS,
} from './person.constants';

export function personRequest() {
  return {
    type: PERSON_REQUEST,
  };
}

export function personSuccess(data) {
  return {
    type: PERSON_SUCCESS,
    payload: data,
  };
}

export function personFailure(error) {
  return {
    type: PERSON_FAILURE,
    payload: error,
  };
}

export function getPersonAction(params) {
  return (dispatch, getState, { getPersonRequest }) => {
    dispatch(personRequest());
    return getPersonRequest(params).then(data => {
      if (data.err) {
        dispatch(personFailure(data));
        return false;
      }
      dispatch(personSuccess(data.resp));
      return data.resp;
    });
  };
}

export function addPersonRequest() {
  return {
    type: ADD_PERSON_REQUEST,
  };
}

export function addPersonSuccess(data) {
  return {
    type: ADD_PERSON_SUCCESS,
    payload: data,
  };
}

export function addPersonFailure(error) {
  return {
    type: ADD_PERSON_FAILURE,
    payload: error,
  };
}

export function getAddPersonAction(params) {
  return (dispatch, getState, { getAddPersonRequest }) => {
    dispatch(addPersonRequest());
    return getAddPersonRequest(params).then(data => {
      if (data.err) {
        dispatch(addPersonFailure(data));
        return false;
      }
      dispatch(addPersonSuccess(data.resp));
      return data.resp;
    });
  };
}

export function personByMobileRequest() {
  return {
    type: PERSON_BY_MOBILE_REQUEST,
  };
}

export function personByMobileSuccess(data) {
  return {
    type: PERSON_BY_MOBILE_SUCCESS,
    payload: data,
  };
}

export function personByMobileFailure(error) {
  return {
    type: PERSON_BY_MOBILE_FAILURE,
    payload: error,
  };
}

export function getPersonByMobileAction(params) {
  return (dispatch, getState, { getPersonByMobileRequest }) => {
    dispatch(personByMobileRequest());
    return getPersonByMobileRequest(params).then(data => {
      if (data.err) {
        dispatch(personByMobileFailure(data));
        return false;
      }
      dispatch(personByMobileSuccess(data.resp));
      return data.resp;
    });
  };
}

export function createPartyPersonRequest() {
  return {
    type: CREATE_PARTY_PERSON_REQUEST,
  };
}

export function createPartyPersonSuccess(data) {
  return {
    type: CREATE_PARTY_PERSON_SUCCESS,
    payload: data,
  };
}

export function createPartyPersonFailure(error) {
  return {
    type: CREATE_PARTY_PERSON_FAILURE,
    payload: error,
  };
}

export function postCreatePartyPersonAction(params) {
  return (dispatch, getState, { postCreatePartyPersonRequest }) => {
    dispatch(createPartyPersonRequest());
    return postCreatePartyPersonRequest(params).then(data => {
      if (data.err) {
        dispatch(createPartyPersonFailure(data));
        return false;
      }
      dispatch(createPartyPersonSuccess(data.resp));
      return data.resp;
    });
  };
}

export function personInfoRequest() {
  return {
    type: PERSON_INFO_REQUEST,
  };
}

export function personInfoSuccess(data) {
  return {
    type: PERSON_INFO_SUCCESS,
    payload: data,
  };
}

export function personInfoFailure(error) {
  return {
    type: PERSON_INFO_FAILURE,
    payload: error,
  };
}

export function getPersonInfoAction(params) {
  return (dispatch, getState, { getPersonInfoRequest }) => {
    dispatch(personInfoRequest());
    return getPersonInfoRequest(params).then(data => {
      if (data.err) {
        dispatch(personInfoFailure(data));
        return false;
      }
      dispatch(personInfoSuccess(data.resp));
      return data.resp;
    });
  };
}
