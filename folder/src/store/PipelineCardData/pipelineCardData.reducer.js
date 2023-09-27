import {
  PIPELINE_CARD_DATA_REQUEST,
  PIPELINE_CARD_DATA_SUCCESS,
  PIPELINE_CARD_DATA_FAILURE,
} from './pipelineCardData.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineCardData(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_CARD_DATA_REQUEST: {
      return {
        loading: true,
        data: {},
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_DATA_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_DATA_FAILURE: {
      return {
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
