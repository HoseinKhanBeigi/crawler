import {
  POST_ASSIGNS_FAILURE,
  POST_ASSIGNS_REQUEST,
  POST_ASSIGNS_SUCCESS,
  POST_CHECK_UNASSIGN_FAILURE,
  POST_CHECK_UNASSIGN_REQUEST,
  POST_CHECK_UNASSIGN_SUCCESS,
  POST_UNASSIGNS_FAILURE,
  POST_UNASSIGNS_REQUEST,
  POST_UNASSIGNS_SUCCESS,
} from './assign.constants';

const initialValue = {
  postAssignsLoading: false,
  postAssignsData: null,
  postAssignsError: null,
  postUnAssignsLoading: false,
  postUnAssignsData: null,
  postUnAssignsError: null,
  loading: false,
  data: null,
  error: null,
};
export default function user(state = initialValue, action) {
  switch (action.type) {
    case POST_ASSIGNS_REQUEST: {
      return {
        ...state,
        postAssignsLoading: true,
      };
    }

    case POST_ASSIGNS_SUCCESS: {
      return {
        ...state,
        postAssignsLoading: false,
        postAssignsData: action.payload,
      };
    }

    case POST_ASSIGNS_FAILURE: {
      return {
        ...state,
        postAssignsLoading: false,
        postAssignsData: null,
        postAssignsError: action.payload,
      };
    }

    case POST_CHECK_UNASSIGN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case POST_CHECK_UNASSIGN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case POST_CHECK_UNASSIGN_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case POST_UNASSIGNS_REQUEST: {
      return {
        ...state,
        postUnAssignsLoading: true,
      };
    }

    case POST_UNASSIGNS_SUCCESS: {
      return {
        ...state,
        postUnAssignsLoading: false,
        postUnAssignsData: action.payload,
      };
    }

    case POST_UNASSIGNS_FAILURE: {
      return {
        ...state,
        postUnAssignsLoading: false,
        postUnAssignsData: null,
        postUnAssignsError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
