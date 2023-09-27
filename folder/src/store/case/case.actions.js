import {
  POST_ADD_CASE_FAILURE,
  POST_ADD_CASE_REQUEST,
  POST_ADD_CASE_SUCCESS,
} from './case.constant';

export function postAddCaseAction(body) {
  return (dispatch, getState, { postAddCaseRequest }) => {
    dispatch({ type: POST_ADD_CASE_REQUEST });
    return postAddCaseRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_ADD_CASE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_ADD_CASE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
