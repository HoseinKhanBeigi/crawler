import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  SELECT_PRODUCT_SUCCESS,
  GET_PRODUCTS_GROUPS_FAILURE,
  GET_PRODUCTS_GROUPS_REQUEST,
  GET_PRODUCTS_GROUPS_SUCCESS,
  SELECT_PRODUCT_GROUPS_SUCCESS,
} from './getProducts.constants';

const initialValue = {
  loading: false,
  data: [],
  productGroupsData: [],
  productGroupsSelected: null,
  error: null,
  selected: null,
};

export default function(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case GET_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        selected: null,
        error: action.payload,
      };
    }

    case SELECT_PRODUCT_SUCCESS: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case GET_PRODUCTS_GROUPS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PRODUCTS_GROUPS_SUCCESS: {
      return {
        ...state,
        loading: false,
        productGroupsData: action.payload,
      };
    }

    case GET_PRODUCTS_GROUPS_FAILURE: {
      return {
        ...state,
        loading: false,
        productGroupsData: null,
        productGroupsSelected: null,
        error: action.payload,
      };
    }

    case SELECT_PRODUCT_GROUPS_SUCCESS: {
      return {
        ...state,
        productGroupsSelected: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
