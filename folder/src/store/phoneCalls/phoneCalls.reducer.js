import {
  GET_PHONE_CALLS_PATTERNS_FAILURE,
  GET_PHONE_CALLS_PATTERNS_REQUEST,
  GET_PHONE_CALLS_PATTERNS_SUCCESS,
  GET_TEMPLATES_FAILURE,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  PHONE_CALLS_FAILURE,
  PHONE_CALLS_REQUEST,
  PHONE_CALLS_SUCCESS,
  POST_ADD_CALL_DETAILS_REQUEST,
  POST_ADD_CALL_DETAILS_SUCCESS,
  POST_ADD_CALL_DETAILS_FAILURE,
  POST_CLICK_TO_CALL_REQUEST,
  POST_CLICK_TO_CALL_SUCCESS,
  POST_CLICK_TO_CALL_FAILURE,
  PUT_CALL_DETAIL_REQUEST,
  PUT_CALL_DETAIL_SUCCESS,
  PUT_CALL_DETAIL_FAILURE,
  GET_CALL_DETAIL_BY_ID_REQUEST,
  GET_CALL_DETAIL_BY_ID_SUCCESS,
  GET_CALL_DETAIL_BY_ID_FAILURE,
} from './phoneCalls.constants';

const initialValue = {
  getTemplatesLoading: false,
  getTemplatesData: null,
  getTemplatesError: null,
  getPhoneCallsPatternsLoading: false,
  getPhoneCallsPatternsData: null,
  getPhoneCallsPatternsError: null,
  loading: false,
  data: null,
  error: null,
  call: null,
  sms: [],
  whatsapp: [],
  email: [],
  session: [],
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case PHONE_CALLS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PHONE_CALLS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case PHONE_CALLS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case POST_ADD_CALL_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case POST_ADD_CALL_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case POST_ADD_CALL_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case PUT_CALL_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PUT_CALL_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case PUT_CALL_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_PHONE_CALLS_PATTERNS_REQUEST: {
      return {
        ...state,
        getPhoneCallsPatternsLoading: true,
      };
    }

    case GET_PHONE_CALLS_PATTERNS_SUCCESS: {
      return {
        ...state,
        getPhoneCallsPatternsLoading: false,
        getPhoneCallsPatternsData: action.payload,
      };
    }

    case GET_PHONE_CALLS_PATTERNS_FAILURE: {
      return {
        ...state,
        getPhoneCallsPatternsLoading: false,
        getPhoneCallsPatternsData: null,
        getPhoneCallsPatternsError: action.payload,
      };
    }

    case GET_TEMPLATES_REQUEST: {
      return {
        ...state,
        getTemplatesLoading: true,
      };
    }

    case GET_TEMPLATES_SUCCESS: {
      if (action.payload.type === 'CALL') {
        return {
          ...state,
          getTemplatesLoading: false,
          call: action.payload.data,
        };
      } else if (action.payload.type === 'CASE') {
        return {
          ...state,
          getTemplatesLoading: false,
          case: action.payload.data,
        };
      } else if (action.payload.type === 'SMS') {
        return {
          ...state,
          getTemplatesLoading: false,
          sms: action.payload.data,
        };
      } else if (action.payload.type === 'WHATSAPP') {
        return {
          ...state,
          getTemplatesLoading: false,
          whatsapp: action.payload.data,
        };
      } else if (action.payload.type === 'EMAIL') {
        return {
          ...state,
          getTemplatesLoading: false,
          email: action.payload.data,
        };
      } else if (action.payload.type === 'SESSION') {
        return {
          ...state,
          getTemplatesLoading: false,
          session: action.payload.data,
        };
      }
      return {
        ...state,
        getLeadFormFieldsLoading: false,
        getTemplatesData: action.payload,
      };
    }

    case GET_TEMPLATES_FAILURE: {
      return {
        ...state,
        getTemplatesLoading: false,
        getTemplatesData: null,
        getTemplatesError: action.payload,
      };
    }

    case POST_CLICK_TO_CALL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case POST_CLICK_TO_CALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case POST_CLICK_TO_CALL_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_CALL_DETAIL_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_CALL_DETAIL_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case GET_CALL_DETAIL_BY_ID_FAILURE: {
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
