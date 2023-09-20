export const actions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  INITIALIZE_ACTION: 'INITIALIZE_ACTION',
};

export function openModal(key, data) {
  return {
    type: actions.OPEN_MODAL,
    payload: { key, data },
  };
}

export function closeModal(key) {
  return {
    type: actions.CLOSE_MODAL,
    payload: { key },
  };
}

export const initializeAction = initialState => ({
  type: actions.INITIALIZE_ACTION,
  payload: initialState,
});
