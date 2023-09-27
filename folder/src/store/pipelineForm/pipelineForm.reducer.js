import {
  PIPELINE_FORM_REQUEST,
  PIPELINE_FORM_SUCCESS,
  PIPELINE_FORM_FAILURE,
} from './pipelineForm.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineFormData(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_FORM_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FORM_SUCCESS: {
      const formsMap = state.data || {};
      formsMap[action.payload?.id] = action.payload?.data;
      return {
        ...state,
        loading: false,
        data: formsMap,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_FORM_FAILURE: {
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
