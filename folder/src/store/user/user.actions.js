import {
  GET_USER_EMPLOYEE_PROFILE_SUCCESS,
  GET_USER_EMPLOYEE_PROFILE_FAILURE,
  GET_USER_EMPLOYEE_PROFILE_REQUEST,
} from './user.constants';

export function getUserEmployeeProfileAction() {
  return (dispatch, getState, { getUserEmployeeProfileRequest }) => {
    dispatch({ type: GET_USER_EMPLOYEE_PROFILE_REQUEST });
    return getUserEmployeeProfileRequest().then(data => {
      if (data.err) {
        dispatch({ type: GET_USER_EMPLOYEE_PROFILE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_USER_EMPLOYEE_PROFILE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
