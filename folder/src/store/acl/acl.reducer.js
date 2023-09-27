import {
  GET_ACL_MENU_ACTION_REQUEST,
  GET_ACL_MENU_ACTION_SUCCESS,
  GET_ACL_MENU_ACTION_FAILURE,
  GET_ACL_AUTHORITIES_REQUEST,
  GET_ACL_AUTHORITIES_SUCCESS,
  GET_ACL_AUTHORITIES_FAILURE,
} from './acl.constants';

const initialValue = {
  loading: false,
  menus: [],
  authorities: [],
  error: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_ACL_MENU_ACTION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ACL_MENU_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        menus: action.payload,
        error: null,
      };
    }
    case GET_ACL_MENU_ACTION_FAILURE: {
      return {
        ...state,
        loading: false,
        menus: null,
        error: action.payload,
      };
    }
    case GET_ACL_AUTHORITIES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ACL_AUTHORITIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        authorities: action.payload,
        error: null,
      };
    }
    case GET_ACL_AUTHORITIES_FAILURE: {
      return {
        ...state,
        loading: false,
        authorities: null,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
