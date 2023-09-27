/* eslint-disable import/prefer-default-export */

import {
  FULL_SEARCH_FAILURE,
  FULL_SEARCH_REQUEST,
  FULL_SEARCH_SUCCESS,
} from './fullSearch.constants';

export function fullSearchRequest() {
  return {
    type: FULL_SEARCH_REQUEST,
  };
}

export function fullSearchSuccess(data) {
  return {
    type: FULL_SEARCH_SUCCESS,
    payload: data,
  };
}

export function fullSearchFailure(error) {
  return {
    type: FULL_SEARCH_FAILURE,
    payload: error,
  };
}

export function getFullSearchAction(
  params,
  isAll = true,
  filterActives = false,
  ignoreContext = true,
) {
  return (dispatch, getState, { getFullSearchRequest }) => {
    dispatch(fullSearchRequest());
    return getFullSearchRequest(
      params,
      isAll,
      filterActives,
      ignoreContext,
    ).then(data => {
      if (data.err) {
        dispatch(fullSearchFailure(data));
        return false;
      }
      dispatch(fullSearchSuccess(data.resp));
      return data.resp;
    });
  };
}
