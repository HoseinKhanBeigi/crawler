import * as neshanConstant from './neshan.constants';
import { deleteCookie, setCookie } from '../../utils';
import { getNeshanLogoutUrl } from './neshan.services';

export function loginSuccess(data) {
  return {
    type: neshanConstant.SET_LOGIN_SUCCESS,
    payload: data,
  };
}

export function jwtSuccess(data) {
  return {
    type: neshanConstant.SET_JWT_SUCCESS,
    payload: data,
  };
}

export function setUserDataCookie(data, isRefreshToken = false) {
  const expirationTime = new Date().getTime() + data.expires_in * 1000;
  const refreshExpireIn = new Date().getTime() + data.refresh_expires_in * 1000;
  localStorage.setItem('id_token', data.id_token);
  setCookie('access_token', data.access_token, data.refresh_expires_in / 3600);
  setCookie('expires_in', expirationTime, data.expires_in / 3600);
  if (!isRefreshToken)
    setCookie(
      'refresh_expires_in',
      refreshExpireIn,
      data.refresh_expires_in / 3600,
    );
  setCookie(
    'refresh_token',
    data.refresh_token,
    data.refresh_expires_in / 3600,
  );
}

export function deleteUserDataCookie() {
  localStorage.removeItem('id_token');
  deleteCookie('id_token');
  deleteCookie('access_token');
  deleteCookie('expires_in');
  deleteCookie('refresh_expires_in');
  deleteCookie('refresh_token');
  deleteCookie('application_name');
  deleteCookie('product_name');
}

export function postNeshanTokenDataAction(body) {
  return (dispatch, getState, { postNeshanTokenDataRequest }) => {
    dispatch({ type: neshanConstant.POST_NESH_TOKEN_DATA_REQUEST });
    return postNeshanTokenDataRequest(body).then(async data => {
      if (data.err) {
        dispatch({
          type: neshanConstant.POST_NESH_TOKEN_DATA_FAILURE,
          payload: data,
        });
        return data;
      }
      // setUserDataCookie(data.resp);
      // const applications = await dispatch(getApplicationsAction());
      // await dispatch(getGetProductsAction());
      // if (applications?.length) {
      //   await dispatch(
      //     selectApplicationAction(Context || applications[0]?.code),
      //   );
      //   await dispatch(selectFirstProduct());
      // }
      dispatch({
        type: neshanConstant.POST_NESH_TOKEN_DATA_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postNeshanLogoutAction() {
  return () => {
    const idToken = localStorage.getItem('id_token');
    window.location.assign(
      `${getNeshanLogoutUrl()}?redirect_uri=${encodeURI(
        `${window.location.origin}/logout?state=success`,
      )}&post_logout_redirect_uri=${encodeURI(
        `${window.location.origin}/logout?state=success`,
      )}&id_token_hint=${idToken}`,
    );
  };
}

// TODO: check why there is no usage for this function and remove if it's no longer needed
export function postNeshanRefreshTokenAction(body) {
  return (dispatch, getState, { postNeshanRefreshTokenRequest }) => {
    dispatch({ type: neshanConstant.POST_NESHAN_REFRESH_TOKEN_REQUEST });
    return postNeshanRefreshTokenRequest(body).then(async data => {
      if (data?.err) {
        dispatch({
          type: neshanConstant.POST_NESHAN_REFRESH_TOKEN_FAILURE,
          payload: data,
        });
        dispatch(postNeshanLogoutAction());
        return data;
      }
      setUserDataCookie(data.resp);
      loginSuccess(data.resp);
      dispatch({
        type: neshanConstant.POST_NESHAN_REFRESH_TOKEN_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}
