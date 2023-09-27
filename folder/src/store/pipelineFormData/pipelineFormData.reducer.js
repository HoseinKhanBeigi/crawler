import {
  PIPELINE_FORM_DATA_REQUEST,
  PIPELINE_FORM_DATA_SUCCESS,
  PIPELINE_FORM_DATA_FAILURE,
} from './pipelineFormData.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineFormData(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_FORM_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FORM_DATA_SUCCESS: {
      const formsDataMap = state.data || {};
      if (action.payload?.id) {
        formsDataMap[action.payload?.id] = {
          ...(formsDataMap[action.payload?.id] || {}),
          [action.payload?.cardId]: action.payload?.data,
        };
      }
      return {
        ...state,
        loading: false,
        data: formsDataMap,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FORM_DATA_FAILURE: {
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
