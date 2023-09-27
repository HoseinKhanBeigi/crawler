import {
  GET_EMAIL_PATTERNS_FAILURE,
  GET_EMAIL_PATTERNS_REQUEST,
  GET_EMAIL_PATTERNS_SUCCESS,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from './sendEmail.constants';

const initialValue = {
  getEmailPatternsLoading: false,
  getEmailPatternsData: null,
  getEmailPatternsError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case SEND_EMAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_EMAIL_PATTERNS_REQUEST: {
      return {
        ...state,
        getEmailPatternsLoading: true,
      };
    }

    case GET_EMAIL_PATTERNS_SUCCESS: {
      return {
        ...state,
        getEmailPatternsLoading: false,
        getEmailPatternsData: action.payload,
      };
    }

    case GET_EMAIL_PATTERNS_FAILURE: {
      return {
        ...state,
        getEmailPatternsLoading: false,
        getEmailPatternsData: null,
        getEmailPatternsError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
