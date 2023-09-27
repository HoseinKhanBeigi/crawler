import {
  DO_ACTION_ON_MESSAGE_TEMPLATES_REQUEST,
  DO_ACTION_ON_MESSAGE_TEMPLATES_SUCCESS,
  DO_ACTION_ON_MESSAGE_TEMPLATES_FAILURE,
  CREATE_NEW_MESSAGE_TEMPLATE_REQUEST,
  CREATE_NEW_MESSAGE_TEMPLATE_SUCCESS,
  CREATE_NEW_MESSAGE_TEMPLATE_FAILURE,
  EDIT_MESSAGE_TEMPLATE_REQUEST,
  EDIT_MESSAGE_TEMPLATE_SUCCESS,
  EDIT_MESSAGE_TEMPLATE_FAILURE,
} from './messageTemplate.constants';

const initialState = {
  uploading: false,
};

export default function messageTemplate(state = initialState, action) {
  switch (action.type) {
    case DO_ACTION_ON_MESSAGE_TEMPLATES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DO_ACTION_ON_MESSAGE_TEMPLATES_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case DO_ACTION_ON_MESSAGE_TEMPLATES_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case CREATE_NEW_MESSAGE_TEMPLATE_REQUEST: {
      return {
        ...state,
        uploading: true,
      };
    }
    case CREATE_NEW_MESSAGE_TEMPLATE_SUCCESS: {
      return {
        ...state,
        uploading: false,
      };
    }
    case CREATE_NEW_MESSAGE_TEMPLATE_FAILURE: {
      return {
        ...state,
        uploading: false,
      };
    }
    case EDIT_MESSAGE_TEMPLATE_REQUEST: {
      return {
        ...state,
        uploading: true,
      };
    }
    case EDIT_MESSAGE_TEMPLATE_SUCCESS: {
      return {
        ...state,
        uploading: false,
      };
    }
    case EDIT_MESSAGE_TEMPLATE_FAILURE: {
      return {
        ...state,
        uploading: false,
      };
    }
    default:
      return state;
  }
}
