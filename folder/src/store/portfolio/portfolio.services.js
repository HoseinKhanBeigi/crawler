import {
  FetchData,
  PostData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const getFundsUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/portfolio/kd-fund/all/${levantId}`;

const getFundByDsCOdeUrl = (dscode, levantId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/portfolio/kd-fund/${dscode}/${levantId}`;

const getNetAssetChartUrl = ({ dscode, fromDate, toDate, levantId }) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/portfolio/kd-fund/${dscode}/kpi/net-asset-chart/${levantId}?fromDate=${fromDate}&toDate=${toDate}`;

const getPortfolioReasonsUrl = `${resolveVariable(
  BASE_VARIABLE_KEYS.BASE_URL,
)}/portfolio/get-view-portfo-reasons`;

const postReasonUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/portfolio/${levantId}/submit-view-portfo-reason`;

export function createGetAllFundsRequest(fetch, token) {
  return async function getAllFundsRequest(levantId) {
    return FetchData(fetch, getFundsUrl(levantId), token);
  };
}

export function createGetFundByDsCodeRequest(fetch, token) {
  return async function getFundByDsCodeRequest(dsCode, levantId) {
    return FetchData(fetch, getFundByDsCOdeUrl(dsCode, levantId), token);
  };
}

export function createGetNetAssetChartDataRequest(fetch, token) {
  return async function getNetAssetChartDataRequest({
    dscode,
    fromDate,
    toDate,
    levantId,
  }) {
    return FetchData(
      fetch,
      getNetAssetChartUrl({ dscode, fromDate, toDate, levantId }),
      token,
    );
  };
}

export function createGetPortfolioReasonsRequest(fetch, token) {
  return async function getPortfolioReasonsRequest() {
    return FetchData(fetch, getPortfolioReasonsUrl, token);
  };
}

export function createPostPortfolioReasonRequest(fetch, token) {
  return async function postPortfolioReasonRequest(levantId, body) {
    return PostData(fetch, postReasonUrl(levantId), body, token);
  };
}
