import { SET_RUNTIME_VARIABLE } from './runtime.constants';

export default function runtimeReducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
