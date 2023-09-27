import { SET_CALL_DETAIL_WINDOW } from './onComingCall.constant';

const initialValue = {
  callDetailWindow: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case SET_CALL_DETAIL_WINDOW: {
      return {
        ...state,
        callDetailWindow: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
