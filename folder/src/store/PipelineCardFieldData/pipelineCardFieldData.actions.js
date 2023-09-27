import {
  PIPELINE_CARD_FIELD_DATA_FAILURE,
  PIPELINE_CARD_FIELD_DATA_REQUEST,
  PIPELINE_CARD_FIELD_DATA_SUCCESS,
} from './pipelineCardFieldData.constants';

export function pipelineCardFieldDataRequest() {
  return {
    type: PIPELINE_CARD_FIELD_DATA_REQUEST,
  };
}

export function pipelineCardFieldDataSuccess(data) {
  return {
    type: PIPELINE_CARD_FIELD_DATA_SUCCESS,
    payload: data,
  };
}

export function pipelineCardFieldDataFailure(error) {
  return {
    type: PIPELINE_CARD_FIELD_DATA_FAILURE,
    payload: error,
  };
}

export function getPipelineCardFieldData(cardId) {
  return (dispatch, getState, { getCardFieldDataRequest }) => {
    dispatch(pipelineCardFieldDataRequest());
    return getCardFieldDataRequest(cardId).then(data => {
      if (data.err) {
        dispatch(pipelineCardFieldDataFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipelineCardFieldDataSuccess(response));
      return response;
    });
  };
}
