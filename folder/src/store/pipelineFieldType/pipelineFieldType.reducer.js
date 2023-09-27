import {
  PIPELINE_FIELD_TYPE_REQUEST,
  PIPELINE_FIELD_TYPE_SUCCESS,
  PIPELINE_FIELD_TYPE_FAILURE,
} from './pipelineFieldType.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
  errorMessage: null,
};

export default function pipelineFieldType(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_FIELD_TYPE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FIELD_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FIELD_TYPE_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload?.errorCode,
        errorMessage: action.payload?.errorMessage,
      };
    }

    default: {
      return state;
    }
  }
}
