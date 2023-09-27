import {
  GET_ALL_FUNDS_REQUEST,
  GET_ALL_FUNDS_SUCCESS,
  GET_ALL_FUNDS_FAILURE,
  GET_FUNDS_BY_DSCODE_REQUEST,
  GET_FUNDS_BY_DSCODE_FAILURE,
  GET_FUNDS_BY_DSCODE_SUCCESS,
  GET_NET_ASSET_CHART_DATA_REQUEST,
  GET_NET_ASSET_CHART_DATA_FAILURE,
  GET_NET_ASSET_CHART_DATA_SUCCESS,
  GET_PORTOFLIO_REASONS_REQUEST,
  GET_PORTOFLIO_REASONS_SUCCESS,
  GET_PORTOFLIO_REASONS_FAILURE,
  POST_PORTOFLIO_REASON_REQUEST,
  POST_PORTOFLIO_REASON_SUCCESS,
  POST_PORTOFLIO_REASON_FAILURE,
} from './portfolio.constant';

export function getAllFundsAction(levantId) {
  return (dispatch, getState, { getAllFundsRequest }) => {
    dispatch({ type: GET_ALL_FUNDS_REQUEST });
    return getAllFundsRequest(levantId).then(data => {
      if (data.err) {
        dispatch({ type: GET_ALL_FUNDS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_ALL_FUNDS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
export function getFundByDsCodeAction(dsCodeParam, levantId) {
  return (dispatch, getState, { getFundByDsCodeRequest }) => {
    dispatch({ type: GET_FUNDS_BY_DSCODE_REQUEST });
    return getFundByDsCodeRequest(dsCodeParam, levantId).then(data => {
      if (data.err) {
        dispatch({ type: GET_FUNDS_BY_DSCODE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_FUNDS_BY_DSCODE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
export function getNetAssetChartDataAction({
  dscode,
  fromDate,
  toDate,
  levantId,
}) {
  return (dispatch, getState, { getNetAssetChartDataRequest }) => {
    dispatch({ type: GET_NET_ASSET_CHART_DATA_REQUEST });
    return getNetAssetChartDataRequest({
      dscode,
      fromDate,
      toDate,
      levantId,
    }).then(data => {
      if (data.err) {
        dispatch({ type: GET_NET_ASSET_CHART_DATA_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: GET_NET_ASSET_CHART_DATA_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}
export function getPortfolioReasonsAction() {
  return (dispatch, getState, { getPortfolioReasonsRequest }) => {
    dispatch({ type: GET_PORTOFLIO_REASONS_REQUEST });
    return getPortfolioReasonsRequest().then(data => {
      if (data.err) {
        dispatch({ type: GET_PORTOFLIO_REASONS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_PORTOFLIO_REASONS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
export function postPortfolioReasonAction(levantId, body) {
  return (dispatch, getState, { postPortfolioReasonRequest }) => {
    dispatch({ type: POST_PORTOFLIO_REASON_REQUEST });
    return postPortfolioReasonRequest(levantId, body).then(data => {
      if (data.err) {
        dispatch({ type: POST_PORTOFLIO_REASON_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_PORTOFLIO_REASON_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
