import {
  GET_GET_FAILURE,
  GET_GET_REQUEST,
  GET_GET_SUCCESS,
} from './reports.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case GET_GET_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case GET_GET_FAILURE: {
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
