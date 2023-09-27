import {
  GET_PRODUCT_FORMS_FAILURE,
  GET_PRODUCT_FORMS_REQUEST,
  GET_PRODUCT_FORMS_SUCCESS,
} from './product.constants';

const initialValue = {
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case GET_PRODUCT_FORMS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PRODUCT_FORMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case GET_PRODUCT_FORMS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
