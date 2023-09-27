import {
  APPLICATION_SELECT_SUCCESS,
  APPLICATIONS_FAILURE,
  APPLICATIONS_REQUEST,
  APPLICATIONS_SUCCESS,
} from './applications.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
  selected: null,
};
export default function user(state = initialValue, action) {
  switch (action.type) {
    case APPLICATIONS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case APPLICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case APPLICATIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        selected: null,
        error: action.payload,
      };
    }

    case APPLICATION_SELECT_SUCCESS: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
