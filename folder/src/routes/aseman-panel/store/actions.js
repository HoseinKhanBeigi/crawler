export const actions = {
  FILTER_ACTION: 'FILTER_ACTION',
  GROUP_BY_ACTION: 'GROUP_BY_ACTION',
  INITIALIZE_ACTION: 'INITIALIZE_ACTION',
};

export const filterAction = form => ({
  type: actions.FILTER_ACTION,
  payload: {
    ...form,
  },
});

export const groupByAction = (name, value) => ({
  type: actions.GROUP_BY_ACTION,
  payload: {
    name,
    value,
  },
});

export const initializeAction = initialState => ({
  type: actions.INITIALIZE_ACTION,
  payload: initialState,
});
