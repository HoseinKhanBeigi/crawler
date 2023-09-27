import { HIDE_MODAL, SHOW_MODAL } from './modals.constants';

export const hideModalAction = modal => (dispatch, getState) => {
  const { modals } = getState();
  const filteredModals = modals.filter(m => m.type !== modal.type);

  dispatch({ type: HIDE_MODAL, payload: filteredModals });
};

export const showModalAction = modal => (dispatch, getState) => {
  const { modals } = getState();
  // prevent duplicate modals...
  const isOpened = modals.find(m => m.type === modal.type);
  if (!isOpened) {
    dispatch({ type: SHOW_MODAL, payload: modal });
  } else {
    // close opened modal
    dispatch(hideModalAction(modal));
  }
};

export const hideAllModalAction = () => dispatch => {
  dispatch({ type: HIDE_MODAL, payload: [] });
};
