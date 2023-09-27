import {
  PIPELINE_CARD_REQUEST,
  PIPELINE_CARD_SUCCESS,
  PIPELINE_CARD_FAILURE,
} from './pipelineCard.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineCard(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_CARD_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_SUCCESS: {
      const cardMap = state.data || {};
      cardMap[action.payload?.id] = action.payload;
      return {
        ...state,
        loading: false,
        data: cardMap,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_FAILURE: {
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
