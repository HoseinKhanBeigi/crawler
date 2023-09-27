import {
  ADD_PERSON_FAILURE,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  CREATE_PARTY_PERSON_FAILURE,
  CREATE_PARTY_PERSON_REQUEST,
  CREATE_PARTY_PERSON_SUCCESS,
  PERSON_BY_MOBILE_FAILURE,
  PERSON_BY_MOBILE_REQUEST,
  PERSON_BY_MOBILE_SUCCESS,
  PERSON_FAILURE,
  PERSON_INFO_FAILURE,
  PERSON_INFO_REQUEST,
  PERSON_INFO_SUCCESS,
  PERSON_REQUEST,
  PERSON_SUCCESS,
} from './person.constants';

const initialValue = {
  personInfoLoading: false,
  personInfoData: null,
  personInfoError: null,
  createPartyPersonLoading: false,
  createPartyPersonData: null,
  createPartyPersonError: null,
  personByMobileLoading: false,
  personByMobileData: null,
  personByMobileError: null,
  addPersonLoading: false,
  addPersonData: null,
  addPersonError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case PERSON_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PERSON_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case PERSON_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case ADD_PERSON_REQUEST: {
      return {
        ...state,
        addPersonLoading: true,
      };
    }

    case ADD_PERSON_SUCCESS: {
      return {
        ...state,
        addPersonLoading: false,
        addPersonData: action.payload,
      };
    }

    case ADD_PERSON_FAILURE: {
      return {
        ...state,
        addPersonLoading: false,
        addPersonData: null,
        addPersonError: action.payload,
      };
    }

    case PERSON_BY_MOBILE_REQUEST: {
      return {
        ...state,
        personByMobileLoading: true,
      };
    }

    case PERSON_BY_MOBILE_SUCCESS: {
      return {
        ...state,
        personByMobileLoading: false,
        personByMobileData: action.payload,
      };
    }

    case PERSON_BY_MOBILE_FAILURE: {
      return {
        ...state,
        personByMobileLoading: false,
        personByMobileData: null,
        personByMobileError: action.payload,
      };
    }

    case CREATE_PARTY_PERSON_REQUEST: {
      return {
        ...state,
        createPartyPersonLoading: true,
      };
    }

    case CREATE_PARTY_PERSON_SUCCESS: {
      return {
        ...state,
        createPartyPersonLoading: false,
        createPartyPersonData: action.payload,
      };
    }

    case CREATE_PARTY_PERSON_FAILURE: {
      return {
        ...state,
        createPartyPersonLoading: false,
        createPartyPersonData: null,
        createPartyPersonError: action.payload,
      };
    }

    case PERSON_INFO_REQUEST: {
      return {
        ...state,
        personInfoLoading: true,
        personInfoError: null,
      };
    }

    case PERSON_INFO_SUCCESS: {
      return {
        ...state,
        personInfoLoading: false,
        personInfoError: null,
        personInfoData: action.payload,
      };
    }

    case PERSON_INFO_FAILURE: {
      return {
        ...state,
        personInfoLoading: false,
        personInfoData: null,
        personInfoError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
