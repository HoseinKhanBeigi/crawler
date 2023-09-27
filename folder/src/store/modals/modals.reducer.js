import { HIDE_MODAL, SHOW_MODAL } from './modals.constants';

const initialState = [];

export default function ModalsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return [...state, action.payload];
    }
    case HIDE_MODAL: {
      return action.payload;
    }
    default:
      return state;
  }
}
