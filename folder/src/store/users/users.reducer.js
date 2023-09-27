import {
  SET_PASSWORD_FAILURE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  USER_STATUS_FAILURE,
  USER_STATUS_REQUEST,
  USER_STATUS_SUCCESS,
  USERS_FAILURE,
  USERS_REQUEST,
  USERS_SUCCESS,
} from './users.constants';

const initialValue = {
  rePrintPasswordLoading: false,
  rePrintPasswordData: null,
  rePrintPasswordError: null,
  setPasswordLoading: false,
  setPasswordData: null,
  setPasswordError: null,
  userStatusLoading: false,
  userStatusData: null,
  userStatusError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case USERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case USER_STATUS_REQUEST: {
      return {
        ...state,
        userStatusLoading: true,
      };
    }

    case USER_STATUS_SUCCESS: {
      return {
        ...state,
        userStatusLoading: false,
        userStatusData: action.payload,
      };
    }

    case USER_STATUS_FAILURE: {
      return {
        ...state,
        userStatusLoading: false,
        userStatusData: null,
        userStatusError: action.payload,
      };
    }

    case SET_PASSWORD_REQUEST: {
      return {
        ...state,
        setPasswordLoading: true,
      };
    }

    case SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordData: action.payload,
      };
    }

    case SET_PASSWORD_FAILURE: {
      return {
        ...state,
        setPasswordLoading: false,
        setPasswordData: null,
        setPasswordError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
