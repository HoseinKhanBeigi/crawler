import {
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAILURE,
  POST_FIELD_FAILURE,
  POST_FIELD_REQUEST,
  POST_FIELD_SUCCESS,
  PUT_FIELD_FAILURE,
  PUT_FIELD_REQUEST,
  PUT_FIELD_SUCCESS,
  PUT_FIELDS_ORDER_REQUEST,
  PUT_FIELDS_ORDER_SUCCESS,
  PUT_FIELDS_ORDER_FAILURE,
} from './formSetting.constants';

const initialValue = {
  putFieldsOrderLoading: false,
  putFieldsOrderData: null,
  putFieldsOrderError: null,
  deleteFieldLoading: false,
  deleteFieldData: null,
  deleteFieldError: null,
  putFieldLoading: false,
  putFieldData: null,
  putFieldError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case POST_FIELD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case POST_FIELD_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case POST_FIELD_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case PUT_FIELD_REQUEST: {
      return {
        ...state,
        putFieldLoading: true,
      };
    }

    case PUT_FIELD_SUCCESS: {
      return {
        ...state,
        putFieldLoading: false,
        putFieldData: action.payload,
      };
    }

    case PUT_FIELD_FAILURE: {
      return {
        ...state,
        putFieldLoading: false,
        putFieldData: null,
        putFieldError: action.payload,
      };
    }

    case DELETE_FIELD_REQUEST: {
      return {
        ...state,
        deleteFieldLoading: true,
      };
    }

    case DELETE_FIELD_SUCCESS: {
      return {
        ...state,
        deleteFieldLoading: false,
        deleteFieldData: action.payload,
      };
    }

    case DELETE_FIELD_FAILURE: {
      return {
        ...state,
        deleteFieldLoading: false,
        deleteFieldData: null,
        deleteFieldError: action.payload,
      };
    }

    case PUT_FIELDS_ORDER_REQUEST: {
      return {
        ...state,
        putFieldsOrderLoading: true,
      };
    }

    case PUT_FIELDS_ORDER_SUCCESS: {
      return {
        ...state,
        putFieldsOrderLoading: false,
        putFieldsOrderData: action.payload,
      };
    }

    case PUT_FIELDS_ORDER_FAILURE: {
      return {
        ...state,
        putFieldsOrderLoading: false,
        putFieldsOrderData: null,
        putFieldsOrderError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
