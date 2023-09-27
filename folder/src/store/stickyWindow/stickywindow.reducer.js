import {
  HIDE_STICKY_WINDOW,
  SHOW_STICKY_WINDOW,
} from './stickyWindow.constant';

const initialState = [];

export default function StickyWindowReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_STICKY_WINDOW: {
      return [...state, action.payload];
    }
    case HIDE_STICKY_WINDOW: {
      return action.payload;
    }
    default:
      return state;
  }
}
