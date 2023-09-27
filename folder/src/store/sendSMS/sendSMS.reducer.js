import {
  GET_SMS_PATTERNS_FAILURE,
  GET_SMS_PATTERNS_REQUEST,
  GET_SMS_PATTERNS_SUCCESS,
  POST_SEND_WHATS_APP_FAILURE,
  POST_SEND_WHATS_APP_REQUEST,
  POST_SEND_WHATS_APP_SUCCESS,
  SEND_SMS_FAILURE,
  SEND_SMS_REQUEST,
  SEND_SMS_SUCCESS,
} from './sendSMS.constants';

const initialValue = {
  postSendWhatsAppLoading: false,
  postSendWhatsAppData: null,
  postSendWhatsAppError: null,
  getSmsPatternsLoading: false,
  getSmsPatternsData: null,
  getSmsPatternsError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case SEND_SMS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case SEND_SMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case SEND_SMS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_SMS_PATTERNS_REQUEST: {
      return {
        ...state,
        getSmsPatternsLoading: true,
      };
    }

    case GET_SMS_PATTERNS_SUCCESS: {
      return {
        ...state,
        getSmsPatternsLoading: false,
        getSmsPatternsData: action.payload,
      };
    }

    case GET_SMS_PATTERNS_FAILURE: {
      return {
        ...state,
        getSmsPatternsLoading: false,
        getSmsPatternsData: null,
        getSmsPatternsError: action.payload,
      };
    }

    case POST_SEND_WHATS_APP_REQUEST: {
      return {
        ...state,
        postSendWhatsAppLoading: true,
      };
    }

    case POST_SEND_WHATS_APP_SUCCESS: {
      return {
        ...state,
        postSendWhatsAppLoading: false,
        postSendWhatsAppData: action.payload,
      };
    }

    case POST_SEND_WHATS_APP_FAILURE: {
      return {
        ...state,
        postSendWhatsAppLoading: false,
        postSendWhatsAppData: null,
        postSendWhatsAppError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
