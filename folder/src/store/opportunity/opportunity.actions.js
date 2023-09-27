/* eslint-disable import/prefer-default-export */

import {
  DELETE_OPPORTUNITY_FAILURE,
  DELETE_OPPORTUNITY_REQUEST,
  DELETE_OPPORTUNITY_SUCCESS,
  OPPORTUNITY_FAILURE,
  OPPORTUNITY_REQUEST,
  OPPORTUNITY_SUCCESS,
} from './opportunity.constants';

export function opportunityRequest() {
  return {
    type: OPPORTUNITY_REQUEST,
  };
}

export function opportunitySuccess(data) {
  return {
    type: OPPORTUNITY_SUCCESS,
    payload: data,
  };
}

export function opportunityFailure(error) {
  return {
    type: OPPORTUNITY_FAILURE,
    payload: error,
  };
}

export function getOpportunityAction(params) {
  return (dispatch, getState, { getOpportunityRequest }) => {
    dispatch(opportunityRequest());
    return getOpportunityRequest(params).then(data => {
      if (data.err) {
        dispatch(opportunityFailure(data));
        return false;
      }
      dispatch(opportunitySuccess(data.resp));
      return data.resp;
    });
  };
}

export function deleteOpportunityAction(params) {
  return (dispatch, getState, { deleteOpportunityRequest }) => {
    dispatch({ type: DELETE_OPPORTUNITY_REQUEST });
    return deleteOpportunityRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: DELETE_OPPORTUNITY_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: DELETE_OPPORTUNITY_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
