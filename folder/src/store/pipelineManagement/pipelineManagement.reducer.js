import {
  GET_PIPE_SUCCESS,
  GET_PIPES_FAILURE,
  GET_PIPES_REQUEST,
  GET_PIPES_SUCCESS,
} from './pipelineManagement.constants';

const initialValue = {
  loading: false,
  data: {},
  error: null,
  errorMessage: null,
};

export default function pipelineManagement(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_PIPES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
      };
    }

    case GET_PIPES_SUCCESS: {
      const pipeMap = {};
      action.payload?.forEach(pipe => {
        pipeMap[pipe.id] = pipe;
      });
      return {
        ...state,
        loading: false,
        data: pipeMap,
        error: null,
        errorMessage: null,
      };
    }

    case GET_PIPE_SUCCESS: {
      let pipeMap = {};
      if (state.data) {
        pipeMap = state.data;
      }
      pipeMap[action.payload?.id] = action.payload;
      return {
        ...state,
        loading: false,
        data: pipeMap,
        error: null,
        errorMessage: null,
      };
    }

    case GET_PIPES_FAILURE: {
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
