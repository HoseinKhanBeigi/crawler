import {
  PIPELINE_PHASE_REQUEST,
  PIPELINE_PHASE_SUCCESS,
  PIPELINE_PHASE_FAILURE,
  FETCH_PIPELINE_PHASE_SUCCESS,
} from './pipelinePhase.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelinePhase(state = initialValue, action = {}) {
  switch (action.type) {
    case PIPELINE_PHASE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }
    case FETCH_PIPELINE_PHASE_SUCCESS: {
      const pipePhasesMap = {
        ...state.data,
        [action.payload.pipeId]: action.payload.phases,
      };
      return {
        ...state,
        loading: true,
        data: pipePhasesMap,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_PHASE_SUCCESS: {
      const phases = (state.data && state.data[action.payload.pipeId]) || [];
      const pipePhasesMap = {
        ...state.data,
        [action.payload.pipeId]: [...phases, action.payload?.createdPhase],
      };
      return {
        ...state,
        loading: false,
        data: pipePhasesMap,
        error: null,
        errorMessage: null,
      };
    }

    case PIPELINE_PHASE_FAILURE: {
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
