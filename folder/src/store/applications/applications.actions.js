import { setCookie } from '../../utils';
import {
  APPLICATION_SELECT_SUCCESS,
  APPLICATIONS_FAILURE,
  APPLICATIONS_REQUEST,
  APPLICATIONS_SUCCESS,
} from './applications.constants';

export function applicationsRequest() {
  return {
    type: APPLICATIONS_REQUEST,
  };
}

export function applicationsSuccess(data) {
  return {
    type: APPLICATIONS_SUCCESS,
    payload: data,
  };
}

export function applicationsFailure(error) {
  return {
    type: APPLICATIONS_FAILURE,
    payload: error,
  };
}

export function selectApplicationSuccess(data) {
  return {
    type: APPLICATION_SELECT_SUCCESS,
    payload: data,
  };
}

export function getApplicationsAction(params) {
  return (dispatch, getState, { getApplicationsRequest }) => {
    dispatch(applicationsRequest());
    return getApplicationsRequest(params).then(data => {
      if (data.err) {
        dispatch(applicationsFailure(data));
        return false;
      }
      dispatch(applicationsSuccess(data.resp));
      return data.resp || data; // @TODO fix this.
    });
  };
}

export function selectApplicationAction(selectedApplicationCode) {
  return dispatch => {
    setCookie('application_name', selectedApplicationCode, 86400);
    dispatch(selectApplicationSuccess(selectedApplicationCode));
  };
}
