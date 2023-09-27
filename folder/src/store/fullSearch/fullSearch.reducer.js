import {
  FULL_SEARCH_FAILURE,
  FULL_SEARCH_REQUEST,
  FULL_SEARCH_SUCCESS,
} from './fullSearch.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case FULL_SEARCH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case FULL_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case FULL_SEARCH_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
