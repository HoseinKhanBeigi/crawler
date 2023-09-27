/* eslint-disable import/prefer-default-export */

import {
  DELETE_FILTER_PRESET_FAILURE,
  DELETE_FILTER_PRESET_REQUEST,
  DELETE_FILTER_PRESET_SUCCESS,
  GET_SEARCH_BY_ID_FAILURE,
  GET_SEARCH_BY_ID_REQUEST,
  GET_SEARCH_BY_ID_SUCCESS,
  GET_SEARCH_LIST_FAILURE,
  GET_SEARCH_LIST_REQUEST,
  GET_SEARCH_LIST_SUCCESS,
  POST_SAVE_SEARCH_FAILURE,
  POST_SAVE_SEARCH_REQUEST,
  POST_SAVE_SEARCH_SUCCESS,
} from './search.constants';
import CPMessage from '../../components/CP/CPMessage';

export function postSaveSearchAction(params) {
  return (dispatch, getState, { postSaveSearchRequest }) => {
    dispatch({ type: POST_SAVE_SEARCH_REQUEST });
    return postSaveSearchRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: POST_SAVE_SEARCH_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_SAVE_SEARCH_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getSearchListAction(params) {
  return (dispatch, getState, { getSearchListRequest }) => {
    dispatch({ type: GET_SEARCH_LIST_REQUEST });
    return getSearchListRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_SEARCH_LIST_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_SEARCH_LIST_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getSearchByIdAction(params) {
  return (dispatch, getState, { getSearchByIdRequest }) => {
    dispatch({ type: GET_SEARCH_BY_ID_REQUEST });
    return getSearchByIdRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_SEARCH_BY_ID_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_SEARCH_BY_ID_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function deleteFilterPresetAction(params) {
  return (dispatch, getState, { deleteFilterPresetRequest }) => {
    dispatch({ type: DELETE_FILTER_PRESET_REQUEST });
    return deleteFilterPresetRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: DELETE_FILTER_PRESET_FAILURE });
        CPMessage('خطایی در حذف جستجوی ذخیره شده به‌وجود آمد!', 'error');
        return data;
      }
      dispatch({ type: DELETE_FILTER_PRESET_SUCCESS });
      CPMessage('جستجوی ذخیره شده حذف شد.', 'success');
      return data.resp;
    });
  };
}
