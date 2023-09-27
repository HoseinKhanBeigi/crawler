import { PIPELINE_CARD_HISTORY_SUCCESS } from './pipelineCardHistory.constants';
import {
  PIPELINE_FORM_FAILURE,
  PIPELINE_FORM_REQUEST,
} from '../pipelineForm/pipelineForm.constants';

export function pipelineCardHistorySuccess(data) {
  return {
    type: PIPELINE_CARD_HISTORY_SUCCESS,
    payload: data,
  };
}
export function pipelineCardHistoryRequest() {
  return {
    type: PIPELINE_FORM_REQUEST,
  };
}

export function pipelineCardHistoryFailure(error) {
  return {
    type: PIPELINE_FORM_FAILURE,
    payload: error,
  };
}

function sortHistory(a, b) {
  const firstTimeStamp = new Date(a.createdAt).getTime();
  const secondTimeStamp = new Date(b.createdAt).getTime();
  if (firstTimeStamp < secondTimeStamp) {
    return 1;
  }
  if (firstTimeStamp > secondTimeStamp) {
    return -1;
  }
  return 0;
}

export function getCardHistory(cardId) {
  return (
    dispatch,
    getState,
    { getPipelineCardHistoryRequest, getPipelineCardDataRequest },
  ) => {
    dispatch(pipelineCardHistoryRequest());
    return getPipelineCardHistoryRequest(cardId).then(data => {
      if (data.err) {
        dispatch(pipelineCardHistoryFailure(data));
        return false;
      }
      const response = data;
      // eslint-disable-next-line consistent-return
      return getPipelineCardDataRequest(cardId).then(dataHistory => {
        if (dataHistory.err) {
          dispatch(pipelineCardHistoryFailure(dataHistory));
          return false;
        }
        dispatch(
          pipelineCardHistorySuccess(
            [...response.resp, ...dataHistory.resp]?.sort(sortHistory),
          ),
        );
      });
    });
  };
}
