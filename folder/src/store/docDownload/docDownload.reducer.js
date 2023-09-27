import {
  DOC_DOWNLOAD_FAILURE,
  DOC_DOWNLOAD_REQUEST,
  DOC_DOWNLOAD_SUCCESS,
} from './docDownload.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};
export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case DOC_DOWNLOAD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case DOC_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case DOC_DOWNLOAD_FAILURE: {
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
