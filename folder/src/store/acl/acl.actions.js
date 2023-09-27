import {
  GET_ACL_MENU_ACTION_REQUEST,
  GET_ACL_MENU_ACTION_SUCCESS,
  GET_ACL_MENU_ACTION_FAILURE,
  GET_ACL_AUTHORITIES_REQUEST,
  GET_ACL_AUTHORITIES_SUCCESS,
  GET_ACL_AUTHORITIES_FAILURE,
} from './acl.constants';

export function getAclMenuListAction() {
  return (dispatch, getState, { getAclMenuListRequest }) => {
    dispatch({ type: GET_ACL_MENU_ACTION_REQUEST });
    return getAclMenuListRequest().then(data => {
      if (data.err) {
        dispatch({ type: GET_ACL_MENU_ACTION_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_ACL_MENU_ACTION_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getAclAuthoritiesListAction() {
  return (dispatch, getState, { getAclAuthoritiesListRequest }) => {
    dispatch({ type: GET_ACL_AUTHORITIES_REQUEST });
    return getAclAuthoritiesListRequest().then(data => {
      if (data.err) {
        dispatch({ type: GET_ACL_AUTHORITIES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_ACL_AUTHORITIES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
