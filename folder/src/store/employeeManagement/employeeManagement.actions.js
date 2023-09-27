import {
  POST_REGISTER_EMPLOYEE_REQUEST,
  POST_REGISTER_EMPLOYEE_SUCCESS,
  POST_REGISTER_EMPLOYEE_FAILURE,
  SET_EMPLOYEE_REGISTERED_INFO_DETAIL,
} from './employeeManagement.constant';

export function postRegisterEmployeeAction(body) {
  return (dispatch, getState, { postRegisterEmployeeRequest }) => {
    dispatch({ type: POST_REGISTER_EMPLOYEE_REQUEST });
    return postRegisterEmployeeRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_REGISTER_EMPLOYEE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_REGISTER_EMPLOYEE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postEmployeeRegisteredInfoDetail(info) {
  return dispatch => {
    dispatch({
      type: SET_EMPLOYEE_REGISTERED_INFO_DETAIL,
      payload: info,
    });
  };
}
