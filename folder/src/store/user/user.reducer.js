import {
  GET_USER_EMPLOYEE_PROFILE_FAILURE,
  GET_USER_EMPLOYEE_PROFILE_REQUEST,
  GET_USER_EMPLOYEE_PROFILE_SUCCESS,
} from './user.constants';

const initialValue = {
  currentUserInfoEmployee: null,
  currentUserInfoEmployeeError: null,
  currentUserInfoEmployeeLoading: false,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_USER_EMPLOYEE_PROFILE_REQUEST: {
      return {
        ...state,
        currentUserInfoEmployee: true,
      };
    }

    case GET_USER_EMPLOYEE_PROFILE_SUCCESS: {
      return {
        ...state,
        currentUserInfoEmployeeLoading: false,
        currentUserInfoEmployee: action.payload,
      };
    }

    case GET_USER_EMPLOYEE_PROFILE_FAILURE: {
      return {
        ...state,
        currentUserInfoEmployeeLoading: false,
        currentUserInfoEmployee: null,
        currentUserInfoEmployeeError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
