/* eslint-disable import/prefer-default-export */

import {
  GET_MEETING_SCHEDULE_EXCEL_FAILURE,
  GET_MEETING_SCHEDULE_EXCEL_REQUEST,
  GET_MEETING_SCHEDULE_EXCEL_SUCCESS,
  KYC_CAPACITY_EDIT_FAILURE,
  KYC_CAPACITY_EDIT_REQUEST,
  KYC_CAPACITY_EDIT_SUCCESS,
  KYC_CAPACITY_MANAGEMENT_FAILURE,
  KYC_CAPACITY_MANAGEMENT_REQUEST,
  KYC_CAPACITY_MANAGEMENT_SUCCESS,
  MEETINGS_MANAGEMENT_FAILURE,
  MEETINGS_MANAGEMENT_REQUEST,
  MEETINGS_MANAGEMENT_SUCCESS,
} from './kycCapacityManagement.constants';

export function meetingsManagementRequest() {
  return {
    type: MEETINGS_MANAGEMENT_REQUEST,
  };
}

export function meetingsManagementSuccess(data) {
  return {
    type: MEETINGS_MANAGEMENT_SUCCESS,
    payload: data,
  };
}

export function meetingsManagementFailure(error) {
  return {
    type: MEETINGS_MANAGEMENT_FAILURE,
    payload: error,
  };
}

export function getMeetingsManagementAction(params) {
  return (dispatch, getState, { getMeetingsManagementRequest }) => {
    dispatch(meetingsManagementRequest());
    return getMeetingsManagementRequest(params).then(data => {
      if (data.err) {
        dispatch(meetingsManagementFailure(data));
        return false;
      }
      dispatch(meetingsManagementSuccess(data.resp));
      return data.resp;
    });
  };
}

export function kycCapacityManagementRequest() {
  return {
    type: KYC_CAPACITY_MANAGEMENT_REQUEST,
  };
}

export function kycCapacityManagementSuccess(data) {
  return {
    type: KYC_CAPACITY_MANAGEMENT_SUCCESS,
    payload: data,
  };
}

export function kycCapacityManagementFailure(error) {
  return {
    type: KYC_CAPACITY_MANAGEMENT_FAILURE,
    payload: error,
  };
}

export function postKycCapacityManagementAction(params) {
  return (dispatch, getState, { postKycCapacityManagementRequest }) => {
    dispatch(kycCapacityManagementRequest());
    return postKycCapacityManagementRequest(params).then(data => {
      if (data.err) {
        dispatch(kycCapacityManagementFailure(data));
        return false;
      }
      dispatch(kycCapacityManagementSuccess(data.resp));
      return data.resp;
    });
  };
}

export function kycCapacityEditRequest() {
  return {
    type: KYC_CAPACITY_EDIT_REQUEST,
  };
}

export function kycCapacityEditSuccess(data) {
  return {
    type: KYC_CAPACITY_EDIT_SUCCESS,
    payload: data,
  };
}

export function kycCapacityEditFailure(error) {
  return {
    type: KYC_CAPACITY_EDIT_FAILURE,
    payload: error,
  };
}

export function putKycCapacityEditAction(body) {
  return (dispatch, getState, { putKycCapacityEditRequest }) => {
    dispatch(kycCapacityEditRequest());
    return putKycCapacityEditRequest(body).then(data => {
      if (data.err) {
        dispatch(kycCapacityEditFailure(data));
        return false;
      }
      dispatch(kycCapacityEditSuccess(data.resp));
      return data.resp;
    });
  };
}

export function getMeetingScheduleExcelAction(params) {
  return (dispatch, getState, { getMeetingScheduleExcelRequest }) => {
    dispatch({ type: GET_MEETING_SCHEDULE_EXCEL_REQUEST });
    return getMeetingScheduleExcelRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_MEETING_SCHEDULE_EXCEL_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: GET_MEETING_SCHEDULE_EXCEL_SUCCESS,
        payload: data,
      });
      return data;
    });
  };
}
