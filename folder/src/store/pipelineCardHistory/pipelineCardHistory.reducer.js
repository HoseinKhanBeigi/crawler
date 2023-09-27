import {
  PIPELINE_CARD_HISTORY_FAILURE,
  PIPELINE_CARD_HISTORY_REQUEST,
  PIPELINE_CARD_HISTORY_SUCCESS,
} from './pipelineCardHistory.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
};

export default function cardHistory(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_CARD_HISTORY_REQUEST: {
      return {
        loading: true,
        data: [],
        error: null,
      };
    }

    case PIPELINE_CARD_HISTORY_SUCCESS: {
      return {
        ...state,
        data: [...action.payload],
      };
    }

    case PIPELINE_CARD_HISTORY_FAILURE: {
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
