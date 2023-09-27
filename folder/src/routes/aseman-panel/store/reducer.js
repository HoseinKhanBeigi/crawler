import { initialState } from './index';
import { actions } from './actions';

const filter = (state, action) => ({
  ...state,
  filter: {
    ...action.payload,
  },
});

const groupBy = (state, action) => ({
  ...state,
  groupBy: {
    ...state.groupBy,
    [action.payload.name]: action.payload.value,
  },
});

const initialize = (state, action) =>
  action?.payload ? { ...state, ...action.payload } : state;

const asemanPanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILTER_ACTION:
      return filter(state, action);
    case actions.GROUP_BY_ACTION:
      return groupBy(state, action);
    case actions.INITIALIZE_ACTION:
      return initialize(state, action);
    default:
      return state;
  }
};

export default asemanPanelReducer;
