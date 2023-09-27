import { SET_CALL_DETAIL_WINDOW } from './onComingCall.constant';

export function setCallDetailWindowDataAction(payload) {
  return dispatch => {
    dispatch({
      type: SET_CALL_DETAIL_WINDOW,
      payload,
    });
  };
}
