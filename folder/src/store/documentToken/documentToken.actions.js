/* eslint-disable import/prefer-default-export */

import {
  CREATE_DOCUMENTS_BY_LEVANT_ID_FAILURE,
  CREATE_DOCUMENTS_BY_LEVANT_ID_REQUEST,
  CREATE_DOCUMENTS_BY_LEVANT_ID_SUCCESS,
  DOCUMENT_TOKEN_BY_LEVANT_ID_FAILURE,
  DOCUMENT_TOKEN_BY_LEVANT_ID_REQUEST,
  DOCUMENT_TOKEN_BY_LEVANT_ID_SUCCESS,
  DOCUMENT_TOKEN_FAILURE,
  DOCUMENT_TOKEN_REQUEST,
  DOCUMENT_TOKEN_SUCCESS,
  GET_DOCUMENT_FILES_FAILURE,
  GET_DOCUMENT_FILES_REQUEST,
  GET_DOCUMENT_FILES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,
  GET_DOCUMENT_TYPES_REQUEST,
  GET_DOCUMENT_TYPES_SUCCESS,
  POST_PRINT_ACTIVITY_FAILURE,
  POST_PRINT_ACTIVITY_REQUEST,
  POST_PRINT_ACTIVITY_SUCCESS,
  POST_UPLOAD_SIGN_DOCUMENT_FAILURE,
  POST_UPLOAD_SIGN_DOCUMENT_REQUEST,
  POST_UPLOAD_SIGN_DOCUMENT_SUCCESS,
} from './documentToken.constants';

export function documentTokenRequest() {
  return {
    type: DOCUMENT_TOKEN_REQUEST,
  };
}

export function documentTokenSuccess(data) {
  return {
    type: DOCUMENT_TOKEN_SUCCESS,
    payload: data,
  };
}

export function documentTokenFailure(error) {
  return {
    type: DOCUMENT_TOKEN_FAILURE,
    payload: error,
  };
}

export function getDocumentTokenAction(params) {
  return (dispatch, getState, { getDocumentTokenRequest }) => {
    dispatch(documentTokenRequest());

    const isBusiness = getState().opportunities
      .identificationWithDocsIsBusiness;

    return getDocumentTokenRequest(params, isBusiness).then(data => {
      if (data.err) {
        dispatch(documentTokenFailure(data));
        return false;
      }
      dispatch(documentTokenSuccess(data.resp));
      return data.resp;
    });
  };
}

export function documentTokenByLevantIdRequest() {
  return {
    type: DOCUMENT_TOKEN_BY_LEVANT_ID_REQUEST,
  };
}

export function documentTokenByLevantIdSuccess(data) {
  return {
    type: DOCUMENT_TOKEN_BY_LEVANT_ID_SUCCESS,
    payload: data,
  };
}

export function documentTokenByLevantIdFailure(error) {
  return {
    type: DOCUMENT_TOKEN_BY_LEVANT_ID_FAILURE,
    payload: error,
  };
}

export function getDocumentTokenByLevantIdAction(levantId, product = '') {
  return (dispatch, getState, { getDocumentTokenByLevantIdRequest }) => {
    dispatch(documentTokenByLevantIdRequest());
    return getDocumentTokenByLevantIdRequest(levantId, product).then(data => {
      if (data.err) {
        dispatch(documentTokenByLevantIdFailure(data));
        return false;
      }
      dispatch(documentTokenByLevantIdSuccess(data.resp));
      return data.resp;
    });
  };
}

export function createDocumentsByLevantIdRequest() {
  return {
    type: CREATE_DOCUMENTS_BY_LEVANT_ID_REQUEST,
  };
}

export function createDocumentsByLevantIdSuccess(data) {
  return {
    type: CREATE_DOCUMENTS_BY_LEVANT_ID_SUCCESS,
    payload: data,
  };
}

export function createDocumentsByLevantIdFailure(error) {
  return {
    type: CREATE_DOCUMENTS_BY_LEVANT_ID_FAILURE,
    payload: error,
  };
}

export function postCreateDocumentsByLevantIdAction(params) {
  return (dispatch, getState, { postCreateDocumentsByLevantIdRequest }) => {
    dispatch(createDocumentsByLevantIdRequest());
    return postCreateDocumentsByLevantIdRequest(params).then(data => {
      if (data.err) {
        dispatch(createDocumentsByLevantIdFailure(data));
        return false;
      }
      dispatch(createDocumentsByLevantIdSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getDocumentTypesAction(params) {
  return (dispatch, getState, { getDocumentTypesRequest }) => {
    dispatch({ type: GET_DOCUMENT_TYPES_REQUEST });
    return getDocumentTypesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_DOCUMENT_TYPES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_DOCUMENT_TYPES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getDocumentFilesAction(params) {
  return (dispatch, getState, { getDocumentFilesRequest }) => {
    dispatch({ type: GET_DOCUMENT_FILES_REQUEST });
    return getDocumentFilesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_DOCUMENT_FILES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_DOCUMENT_FILES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postUploadSignDocumentAction(body) {
  return (dispatch, getState, { postUploadSignDocumentRequest }) => {
    dispatch({ type: POST_UPLOAD_SIGN_DOCUMENT_REQUEST });
    return postUploadSignDocumentRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_UPLOAD_SIGN_DOCUMENT_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_UPLOAD_SIGN_DOCUMENT_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postPrintActivityAction(body) {
  return (dispatch, getState, { postPrintActivityRequest }) => {
    dispatch({ type: POST_PRINT_ACTIVITY_REQUEST });
    return postPrintActivityRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_PRINT_ACTIVITY_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_PRINT_ACTIVITY_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
