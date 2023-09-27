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
} from './portfolio.constant';

const initialValue = {
  funds: [],
  loading: false,
  error: null,
  selectedFund: null,
  selectedFundLoading: false,
  selectedFundError: null,
  netAssetChartData: [],
  netAssetChartError: null,
  netAssetChartLoading: false,
  reasons: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_ALL_FUNDS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ALL_FUNDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        funds: action.payload,
        error: null,
      };
    }

    case GET_ALL_FUNDS_FAILURE: {
      return {
        ...state,
        loading: false,
        funds: null,
        error: action.payload,
      };
    }

    case GET_FUNDS_BY_DSCODE_REQUEST: {
      return {
        ...state,
        selectedFundLoading: true,
      };
    }

    case GET_FUNDS_BY_DSCODE_SUCCESS: {
      return {
        ...state,
        selectedFundLoading: false,
        selectedFund: action.payload,
        selectedFundError: null,
      };
    }

    case GET_FUNDS_BY_DSCODE_FAILURE: {
      return {
        ...state,
        selectedFundLoading: false,
        selectedFund: null,
        selectedFundError: action.payload,
      };
    }
    case GET_NET_ASSET_CHART_DATA_REQUEST: {
      return {
        ...state,
        netAssetChartLoading: true,
      };
    }

    case GET_NET_ASSET_CHART_DATA_SUCCESS: {
      return {
        ...state,
        netAssetChartLoading: false,
        netAssetChartData: action.payload,
        netAssetChartError: null,
      };
    }

    case GET_NET_ASSET_CHART_DATA_FAILURE: {
      return {
        ...state,
        netAssetChartLoading: false,
        netAssetChartData: [],
        netAssetChartError: action.payload,
      };
    }

    case GET_PORTOFLIO_REASONS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PORTOFLIO_REASONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        reasons: action.payload,
        error: null,
      };
    }

    case GET_PORTOFLIO_REASONS_FAILURE: {
      return {
        ...state,
        loading: false,
        reasons: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
