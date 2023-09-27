import {
  DELETE_FILTER_PRESET_FAILURE,
  DELETE_FILTER_PRESET_REQUEST,
  DELETE_FILTER_PRESET_SUCCESS,
  GET_SEARCH_BY_ID_FAILURE,
  GET_SEARCH_BY_ID_REQUEST,
  GET_SEARCH_BY_ID_SUCCESS,
  GET_SEARCH_LIST_FAILURE,
  GET_SEARCH_LIST_REQUEST,
  GET_SEARCH_LIST_SUCCESS,
  POST_SAVE_SEARCH_FAILURE,
  POST_SAVE_SEARCH_REQUEST,
  POST_SAVE_SEARCH_SUCCESS,
} from './search.constants';

const initialValue = {
  getSearchByIdLoading: false,
  getSearchByIdData: null,
  getSearchByIdError: null,
  getSearchListLoading: false,
  getSearchListData: [],
  getSearchListError: null,
  loading: false,
  isDeleting: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case POST_SAVE_SEARCH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case POST_SAVE_SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case POST_SAVE_SEARCH_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_SEARCH_LIST_REQUEST: {
      return {
        ...state,
        getSearchListLoading: true,
      };
    }

    case GET_SEARCH_LIST_SUCCESS: {
      return {
        ...state,
        getSearchListLoading: false,
        getSearchListData: action.payload,
      };
    }

    case GET_SEARCH_LIST_FAILURE: {
      return {
        ...state,
        getSearchListLoading: false,
        getSearchListData: [],
        getSearchListError: action.payload,
      };
    }

    case GET_SEARCH_BY_ID_REQUEST: {
      return {
        ...state,
        getSearchByIdLoading: true,
      };
    }

    case GET_SEARCH_BY_ID_SUCCESS: {
      return {
        ...state,
        getSearchByIdLoading: false,
        getSearchByIdData: action.payload,
      };
    }

    case GET_SEARCH_BY_ID_FAILURE: {
      return {
        ...state,
        getSearchByIdLoading: false,
        getSearchByIdData: null,
        getSearchByIdError: action.payload,
      };
    }

    case DELETE_FILTER_PRESET_REQUEST: {
      return {
        ...state,
        isDeleting: true,
      };
    }

    case DELETE_FILTER_PRESET_SUCCESS:
    case DELETE_FILTER_PRESET_FAILURE: {
      return {
        ...state,
        isDeleting: false,
      };
    }

    default: {
      return state;
    }
  }
}
