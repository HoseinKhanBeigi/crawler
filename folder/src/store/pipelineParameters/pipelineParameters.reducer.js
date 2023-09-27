import {
  PIPELINE_PARAMETERS_FAILURE,
  PIPELINE_PARAMETERS_REQUEST,
  PIPELINE_PARAMETERS_SUCCESS,
} from './pipelineParameters.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineParameters(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_PARAMETERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }
    case PIPELINE_PARAMETERS_SUCCESS: {
      const PIPE_SETTING = {
        DEFAULT_PHASE_NAME: '',
        CARD_TITLE_ID: null,
      };
      action.payload.forEach(setting => {
        // eslint-disable-next-line no-unused-expressions
        setting.key === 'DEFAULT_PHASE_NAME'
          ? (PIPE_SETTING.DEFAULT_PHASE_NAME = setting.value)
          : (PIPE_SETTING.CARD_TITLE_ID = setting.value);
      });
      return {
        ...state,
        loading: false,
        data: { ...state.data, PIPE_SETTING },
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_PARAMETERS_FAILURE: {
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
