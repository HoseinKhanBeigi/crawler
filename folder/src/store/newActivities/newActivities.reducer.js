import {
  GET_ACTIVITIES_FAILURE,
  GET_ACTIVITIES_REQUEST,
  GET_ACTIVITIES_SUCCESS,
} from '../activities/activities.constants';
import {
  GET_CRM_ACTIVITIES_FAILURE,
  GET_CRM_ACTIVITIES_REQUEST,
  GET_CRM_ACTIVITIES_SUCCESS,
  POST_CONTACT_FAILURE,
  POST_CONTACT_REQUEST,
  POST_CONTACT_SUCCESS,
  GET_ACTION_TYPES_REQUEST,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_FAILURE,
} from './newActivities.constants';

const initialValue = {
  getActionTypesLoading: false,
  getActionTypesData: {},
  getActionTypesError: null,
  postContactLoading: false,
  postContactData: null,
  postContactError: null,
  getAllContactsLoading: false,
  getAllContactsData: null,
  getAllContactsError: null,
  getCrmActivitiesLoading: false,
  getCrmActivitiesData: null,
  getCrmActivitiesError: null,
  userActivitiesLoading: false,
  userActivitiesData: null,
  userActivitiesError: null,
};

export default function user(state = initialValue, action) {
  switch (action.type) {
    case GET_ACTIVITIES_REQUEST: {
      return {
        ...state,
        userActivitiesLoading: true,
      };
    }

    case GET_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        userActivitiesLoading: false,
        userActivitiesData: action.payload,
        userActivitiesError: null,
      };
    }

    case GET_ACTIVITIES_FAILURE: {
      return {
        ...state,
        userActivitiesLoading: false,
        userActivitiesData: null,
        userActivitiesError: action.payload,
      };
    }

    case GET_CRM_ACTIVITIES_REQUEST: {
      return {
        ...state,
        getCrmActivitiesLoading: true,
      };
    }

    case GET_CRM_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        getCrmActivitiesLoading: false,
        getCrmActivitiesData: action.payload,
        getCrmActivitiesError: null,
      };
    }

    case GET_CRM_ACTIVITIES_FAILURE: {
      return {
        ...state,
        getCrmActivitiesLoading: false,
        getCrmActivitiesData: null,
        getCrmActivitiesError: action.payload,
      };
    }

    case POST_CONTACT_REQUEST: {
      return {
        ...state,
        postContactLoading: true,
      };
    }

    case POST_CONTACT_SUCCESS: {
      return {
        ...state,
        postContactLoading: false,
        postContactData: action.payload,
      };
    }

    case POST_CONTACT_FAILURE: {
      return {
        ...state,
        postContactLoading: false,
        postContactData: null,
        postContactError: action.payload,
      };
    }

    case GET_ACTION_TYPES_REQUEST: {
      return {
        ...state,
        getActionTypesLoading: true,
      };
    }

    case GET_ACTION_TYPES_SUCCESS: {
      return {
        ...state,
        getActionTypesLoading: false,
        getActionTypesData: action.payload,
        getActionTypesError: null,
      };
    }

    case GET_ACTION_TYPES_FAILURE: {
      return {
        ...state,
        getActionTypesLoading: false,
        getActionTypesData: null,
        getActionTypesError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
