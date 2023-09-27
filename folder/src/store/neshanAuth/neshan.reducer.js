import * as neshanConstant from './neshan.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
  jwt: null,
  neshanToken: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case neshanConstant.SET_LOGIN_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case neshanConstant.SET_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    }

    case neshanConstant.SET_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case neshanConstant.POST_NESHAN_LOGOUT_REQUEST: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case neshanConstant.POST_NESHAN_LOGOUT_SUCCESS: {
      return {
        ...initialValue,
      };
    }

    case neshanConstant.POST_NESHAN_LOGOUT_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case neshanConstant.POST_NESH_TOKEN_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case neshanConstant.POST_NESH_TOKEN_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        neshanToken: action.payload,
      };
    }

    case neshanConstant.POST_NESH_TOKEN_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        neshanToken: null,
        error: action.payload,
      };
    }

    case neshanConstant.POST_NESHAN_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case neshanConstant.POST_NESHAN_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        neshanToken: action.payload,
      };
    }

    case neshanConstant.POST_NESHAN_REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        neshanToken: null,
        error: action.payload,
      };
    }

    case neshanConstant.SET_JWT_SUCCESS: {
      return {
        ...state,
        loading: false,
        jwt: action.payload,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
