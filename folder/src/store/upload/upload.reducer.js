import {
  POST_UPLOAD_FILE_FAILURE,
  POST_UPLOAD_FILE_REQUEST,
  POST_UPLOAD_FILE_SUCCESS,
} from './upload.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case POST_UPLOAD_FILE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case POST_UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case POST_UPLOAD_FILE_FAILURE: {
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
