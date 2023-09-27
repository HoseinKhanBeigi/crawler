import {
  DELETE_TAGS_FAILURE,
  DELETE_TAGS_REQUEST,
  DELETE_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_USAGE_FAILURE,
  GET_USAGE_REQUEST,
  GET_USAGE_SUCCESS,
  POST_TAGS_FAILURE,
  POST_TAGS_REQUEST,
  POST_TAGS_SUCCESS,
  POST_UNTAGS_FAILURE,
  POST_UNTAGS_SUCCESS,
  POST_UNTAGS_REQUEST,
  PUT_TAGS_FAILURE,
  PUT_TAGS_REQUEST,
  PUT_TAGS_SUCCESS,
  GET_USER_TAG_LIST_REQUEST,
  GET_USER_TAG_LIST_SUCCESS,
  GET_USER_TAG_LIST_FAILURE,
  GET_TASK_TAG_LIST_REQUEST,
  GET_TASK_TAG_LIST_SUCCESS,
  GET_TASK_TAG_LIST_FAILURE,
} from './tag.constants';

const initialValue = {
  getUsageLoading: false,
  getUsageData: null,
  getUsageError: null,
  deleteTagsLoading: false,
  deleteTagsData: null,
  deleteTagsError: null,
  putTagsLoading: false,
  putTagsData: null,
  putTagsError: null,
  postTagsLoading: false,
  postUnTagsLoading: false,
  postTagsData: null,
  postTagsError: null,
  loading: false,
  data: null,
  userTagsList: null,
  taskTagsList: null,
  error: null,
};

export default function tag(state = initialValue, action) {
  switch (action.type) {
    case GET_TAGS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TAGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case GET_TAGS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_USER_TAG_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_USER_TAG_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        userTagsList: action.payload,
      };
    }

    case GET_USER_TAG_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_TASK_TAG_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TASK_TAG_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        taskTagsList: action.payload,
      };
    }

    case GET_TASK_TAG_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case POST_TAGS_REQUEST: {
      return {
        ...state,
        postTagsLoading: true,
      };
    }

    case POST_TAGS_SUCCESS: {
      return {
        ...state,
        postTagsLoading: false,
        postTagsData: action.payload,
      };
    }

    case POST_TAGS_FAILURE: {
      return {
        ...state,
        postTagsLoading: false,
        postTagsData: null,
        postTagsError: action.payload,
      };
    }

    case PUT_TAGS_REQUEST: {
      return {
        ...state,
        putTagsLoading: true,
      };
    }

    case PUT_TAGS_SUCCESS: {
      return {
        ...state,
        putTagsLoading: false,
        putTagsData: action.payload,
      };
    }

    case PUT_TAGS_FAILURE: {
      return {
        ...state,
        putTagsLoading: false,
        putTagsData: null,
        putTagsError: action.payload,
      };
    }

    case DELETE_TAGS_REQUEST: {
      return {
        ...state,
        deleteTagsLoading: true,
      };
    }

    case DELETE_TAGS_SUCCESS: {
      return {
        ...state,
        deleteTagsLoading: false,
        deleteTagsData: action.payload,
      };
    }

    case DELETE_TAGS_FAILURE: {
      return {
        ...state,
        deleteTagsLoading: false,
        deleteTagsData: null,
        deleteTagsError: action.payload,
      };
    }

    case POST_UNTAGS_REQUEST: {
      return {
        ...state,
        postUnTagsLoading: true,
        postTagsData: action.payload,
      };
    }

    case POST_UNTAGS_FAILURE: {
      return {
        ...state,
        postUnTagsLoading: false,
        postTagsData: null,
        postTagsError: action.payload,
      };
    }

    case POST_UNTAGS_SUCCESS: {
      return {
        ...state,
        postUnTagsLoading: false,
      };
    }

    case GET_USAGE_REQUEST: {
      return {
        ...state,
        getUsageLoading: true,
      };
    }

    case GET_USAGE_SUCCESS: {
      return {
        ...state,
        getUsageLoading: false,
        getUsageData: action.payload,
      };
    }

    case GET_USAGE_FAILURE: {
      return {
        ...state,
        getUsageLoading: false,
        getUsageData: null,
        getUsageError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
