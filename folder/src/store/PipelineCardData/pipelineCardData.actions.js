/* eslint-disable import/prefer-default-export */
import {
  PIPELINE_CARD_DATA_REQUEST,
  PIPELINE_CARD_DATA_SUCCESS,
  PIPELINE_CARD_DATA_FAILURE,
} from './pipelineCardData.constants';

export function pipelineCardDataRequest() {
  return {
    type: PIPELINE_CARD_DATA_REQUEST,
  };
}

export function pipelineCardDataSuccess(data) {
  return {
    type: PIPELINE_CARD_DATA_SUCCESS,
    payload: data,
  };
}

export function pipelineCardDataFailure(error) {
  return {
    type: PIPELINE_CARD_DATA_FAILURE,
    payload: error,
  };
}

export function getPipelineCardData(cardId) {
  return (dispatch, getState, { getPipelineCardRequest }) => {
    dispatch(pipelineCardDataRequest());
    return getPipelineCardRequest(cardId).then(data => {
      if (data.err) {
        dispatch(pipelineCardDataFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipelineCardDataSuccess(response));
      return response;
    });
  };
}
