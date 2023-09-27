import {
  PIPELINE_PHASE_FORM_REQUEST,
  PIPELINE_PHASE_FORM_SUCCESS,
  PIPELINE_PHASE_FORM_FAILURE,
} from './pipelinePhaseForm.constants';

const initialValue = {
  loading: false,
  data: [],
  error: null,
  errorMessage: null,
};

export default function phaseFieldsData(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_PHASE_FORM_REQUEST: {
      return {
        data: [],
        loading: true,
        error: null,
        errorMessage: null,
      };
    }
    case PIPELINE_PHASE_FORM_SUCCESS: {
      return {
        loading: true,
        data: [...action.payload],
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_PHASE_FORM_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload?.errorCode,
        errorMessage: action.payload?.errorMessage,
      };
    }

    default: {
      return state;
    }
  }
}
