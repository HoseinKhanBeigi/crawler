import { initialState } from './index';
import { actions } from './actions';

const modalWrapperReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL: {
      const modalsMap = state.modals || {};
      modalsMap[action.payload.key] = {
        visible: true,
        data: action.payload.data,
      };
      return {
        modals: modalsMap,
      };
    }
    case actions.CLOSE_MODAL: {
      const modalsMap = state.modals || {};
      modalsMap[action.payload.key] = {
        visible: false,
      };
      return {
        modals: modalsMap,
      };
    }
    case actions.INITIALIZE_ACTION: {
      return action?.payload ? { ...state, ...action.payload } : state;
    }
    default:
      return state;
  }
};

export default modalWrapperReducer;
