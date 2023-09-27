import {
  POST_REGISTER_NEW_EMPLOYEE_REQUEST,
  POST_REGISTER_NEW_EMPLOYEE_SUCCESS,
  POST_REGISTER_NEW_EMPLOYEE_FAILURE,
} from './employee.constant';

export function postRegisterNewEmployeeAction(body) {
  return (dispatch, getState, { postRegisterNewEmployeeRequest }) => {
    dispatch({ type: POST_REGISTER_NEW_EMPLOYEE_REQUEST });
    return postRegisterNewEmployeeRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_REGISTER_NEW_EMPLOYEE_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: POST_REGISTER_NEW_EMPLOYEE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}
