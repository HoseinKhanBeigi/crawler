import {
  POST_REGISTER_NEW_EMPLOYEE_FAILURE,
  POST_REGISTER_NEW_EMPLOYEE_REQUEST,
  POST_REGISTER_NEW_EMPLOYEE_SUCCESS,
} from './employee.constant';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function newEmployee(state = initialValue, action = {}) {
  switch (action.type) {
    case POST_REGISTER_NEW_EMPLOYEE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_REGISTER_NEW_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }
    case POST_REGISTER_NEW_EMPLOYEE_FAILURE: {
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
