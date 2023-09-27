import {
  POST_ADD_CASE_FAILURE,
  POST_ADD_CASE_REQUEST,
  POST_ADD_CASE_SUCCESS,
} from './case.constant';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case POST_ADD_CASE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_ADD_CASE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }
    case POST_ADD_CASE_FAILURE: {
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
