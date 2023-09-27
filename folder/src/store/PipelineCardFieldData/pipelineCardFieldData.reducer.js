import {
  PIPELINE_CARD_FIELD_DATA_FAILURE,
  PIPELINE_CARD_FIELD_DATA_REQUEST,
  PIPELINE_CARD_FIELD_DATA_SUCCESS,
} from './pipelineCardFieldData.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
  errorMessage: null,
};

export default function pipelineCardFieldData(
  state = initialValue,
  action = {},
) {
  switch (action.type) {
    case PIPELINE_CARD_FIELD_DATA_REQUEST: {
      return {
        loading: true,
        data: [],
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_FIELD_DATA_SUCCESS: {
      return {
        loading: false,
        data: [...action.payload],
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_FIELD_DATA_FAILURE: {
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
