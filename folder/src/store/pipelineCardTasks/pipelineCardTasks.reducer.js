import {
  PIPELINE_CARD_TASKS_FAILURE,
  PIPELINE_CARD_TASKS_REQUEST,
  PIPELINE_CARD_TASKS_SUCCESS,
} from '../pipelineCardTasks/pipelineCardTasks.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
};

export default function cardTasks(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_CARD_TASKS_REQUEST: {
      return {
        loading: true,
        data: [],
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_TASKS_SUCCESS: {
      return {
        loading: false,
        data: [...action.payload],
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_CARD_TASKS_FAILURE: {
      return {
        loading: false,
        data: [],
        error: action.payload?.errorCode,
      };
    }
    default: {
      return state;
    }
  }
}
