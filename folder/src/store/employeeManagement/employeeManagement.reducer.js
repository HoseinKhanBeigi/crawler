import {
  POST_REGISTER_EMPLOYEE_REQUEST,
  POST_REGISTER_EMPLOYEE_SUCCESS,
  POST_REGISTER_EMPLOYEE_FAILURE,
  SET_EMPLOYEE_REGISTERED_INFO_DETAIL,
} from './employeeManagement.constant';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case POST_REGISTER_EMPLOYEE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_REGISTER_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }
    case POST_REGISTER_EMPLOYEE_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }
    case SET_EMPLOYEE_REGISTERED_INFO_DETAIL: {
      return {
        ...state,
        lastEmployeeAddedInfo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
