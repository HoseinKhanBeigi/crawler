import CPMessage from '../../components/CP/CPMessage';
import {
  GET_UI_SETTINGS_FAILURE,
  GET_UI_SETTINGS_REQUEST,
  GET_UI_SETTINGS_SUCCESS,
  POST_UI_SETTINGS_FAILURE,
  POST_UI_SETTINGS_REQUEST,
  POST_UI_SETTINGS_SUCCESS,
} from './settings.constants';

export function getUISettingsAction(params) {
  return (dispatch, getState, { getUISettingsRequest }) => {
    dispatch({ type: GET_UI_SETTINGS_REQUEST });
    return getUISettingsRequest(params).then(data => {
      if (data.err) {
        CPMessage('خطای دریافت تنظیمات!', 'error');
        dispatch({ type: GET_UI_SETTINGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_UI_SETTINGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postUISettingsAction(params) {
  return (dispatch, getState, { postUISettingsRequest }) => {
    dispatch({ type: POST_UI_SETTINGS_REQUEST, payload: params });
    return postUISettingsRequest(params).then(data => {
      if (data.err) {
        CPMessage('خطای ذخیره تنظیمات!', 'error');
        dispatch({ type: POST_UI_SETTINGS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_UI_SETTINGS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
