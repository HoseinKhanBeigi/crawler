import {
  HIDE_STICKY_WINDOW,
  SHOW_STICKY_WINDOW,
} from './stickyWindow.constant';

export const hideStickyWindowAction = window => (dispatch, getState) => {
  const { stickyWindow } = getState();

  const filteredWindow = stickyWindow.filter(m => m.type !== window.type);

  dispatch({ type: HIDE_STICKY_WINDOW, payload: filteredWindow });
};

export const showStickyWindowAction = window => (dispatch, getState) => {
  const { stickyWindow } = getState();
  // prevent duplicate windows...
  const isOpened = stickyWindow.find(m => m.type === window.type);
  if (!isOpened) {
    dispatch({ type: SHOW_STICKY_WINDOW, payload: window });
  } else {
    // close opened window
    dispatch(hideStickyWindowAction(window));
  }
};

export const hideAllStickyWindowAction = () => dispatch => {
  dispatch({ type: HIDE_STICKY_WINDOW, payload: [] });
};
