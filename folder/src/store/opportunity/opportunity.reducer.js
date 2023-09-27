import {
  DELETE_OPPORTUNITY_FAILURE,
  DELETE_OPPORTUNITY_REQUEST,
  DELETE_OPPORTUNITY_SUCCESS,
  OPPORTUNITY_FAILURE,
  OPPORTUNITY_REQUEST,
  OPPORTUNITY_SUCCESS,
} from './opportunity.constants';

const initialValue = {
  deleteOpportunityLoading: false,
  deleteOpportunityData: null,
  deleteOpportunityError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case OPPORTUNITY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case OPPORTUNITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case OPPORTUNITY_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case DELETE_OPPORTUNITY_REQUEST: {
      return {
        ...state,
        deleteOpportunityLoading: true,
      };
    }

    case DELETE_OPPORTUNITY_SUCCESS: {
      return {
        ...state,
        deleteOpportunityLoading: false,
        deleteOpportunityData: action.payload,
      };
    }

    case DELETE_OPPORTUNITY_FAILURE: {
      return {
        ...state,
        deleteOpportunityLoading: false,
        deleteOpportunityData: null,
        deleteOpportunityError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
