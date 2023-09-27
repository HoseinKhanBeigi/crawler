/* eslint-disable import/prefer-default-export */

import {
  DELETE_TAGS_FAILURE,
  DELETE_TAGS_REQUEST,
  DELETE_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_USAGE_FAILURE,
  GET_USAGE_REQUEST,
  GET_USAGE_SUCCESS,
  GET_USER_TAG_LIST_REQUEST,
  GET_USER_TAG_LIST_SUCCESS,
  GET_USER_TAG_LIST_FAILURE,
  POST_TAGGING_FAILURE,
  POST_TAGGING_REQUEST,
  POST_TAGGING_SUCCESS,
  POST_UNTAGS_REQUEST,
  POST_UNTAGS_SUCCESS,
  POST_UNTAGS_FAILURE,
  POST_TAGS_FAILURE,
  POST_TAGS_REQUEST,
  POST_TAGS_SUCCESS,
  PUT_TAGS_FAILURE,
  PUT_TAGS_REQUEST,
  PUT_TAGS_SUCCESS,
  GET_TASK_TAG_LIST_FAILURE,
  GET_TASK_TAG_LIST_SUCCESS,
  GET_TASK_TAG_LIST_REQUEST,
} from './tag.constants';
import CPMessage from '../../components/CP/CPMessage';

export function getTagsAction(params) {
  return (dispatch, getState, { getTagsRequest }) => {
    dispatch({ type: GET_TAGS_REQUEST });
    return getTagsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_TAGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_TAGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postTagsAction(body) {
  return (dispatch, getState, { postTagsRequest }) => {
    dispatch({ type: POST_TAGS_REQUEST });
    return postTagsRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_TAGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_TAGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postTaggingAction(...params) {
  return (dispatch, getState, { postTaggingRequest }) => {
    dispatch({ type: POST_TAGGING_REQUEST });
    return postTaggingRequest(...params).then(data => {
      if (data.err) {
        dispatch({ type: POST_TAGGING_FAILURE });
        CPMessage('مشکلی در برچسب زدن به‌وجود آمده است!', 'error');
        return data;
      }
      dispatch({ type: POST_TAGGING_SUCCESS });
      CPMessage('عملیات برچسب زدن با موفقیت انجام شد.', 'success');
      return data.resp;
    });
  };
}

export function putTagsAction(body) {
  return (dispatch, getState, { putTagsRequest }) => {
    dispatch({ type: PUT_TAGS_REQUEST });
    return putTagsRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: PUT_TAGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: PUT_TAGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function deleteTagsAction(params) {
  return (dispatch, getState, { deleteTagsRequest }) => {
    dispatch({ type: DELETE_TAGS_REQUEST });
    return deleteTagsRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: DELETE_TAGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: DELETE_TAGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getUsageAction(params) {
  return (dispatch, getState, { getUsageRequest }) => {
    dispatch({ type: GET_USAGE_REQUEST });
    return getUsageRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_USAGE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_USAGE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getUserTagsListAction(params) {
  return (dispatch, getState, { getTagsListRequest }) => {
    dispatch({ type: GET_USER_TAG_LIST_REQUEST });
    return getTagsListRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_USER_TAG_LIST_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_USER_TAG_LIST_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getTaskTagsListAction(params) {
  return (dispatch, getState, { getTaskTagsListRequest }) => {
    dispatch({ type: GET_TASK_TAG_LIST_REQUEST });
    return getTaskTagsListRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_TASK_TAG_LIST_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_TASK_TAG_LIST_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
// body can be array for many of array or an param for just an id
export function postUnTagAction(...params) {
  return (dispatch, getState, { postUnTaggingRequest }) => {
    dispatch({ type: POST_UNTAGS_REQUEST });
    return postUnTaggingRequest(...params).then(data => {
      if (data.err) {
        dispatch({ type: POST_UNTAGS_FAILURE });
        CPMessage('مشکلی در حذف برچسب به‌وجود آمده است!', 'error');
        return data;
      }
      dispatch({ type: POST_UNTAGS_SUCCESS });
      CPMessage('عملیات حذف برچسب با موفقیت انجام شد.', 'success');
      return data.resp;
    });
  };
}
