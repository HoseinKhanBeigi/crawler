import {
  ACTIVITIES_FAILURE,
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITY_FAILURE,
  ACTIVITY_LIST_FAILURE,
  ACTIVITY_LIST_REQUEST,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_REQUEST,
  ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAILURE,
  DELETE_ACTIVITY_REQUEST,
  DELETE_ACTIVITY_SUCCESS,
  POST_CREATE_CALL_ACTIVITY_FAILURE,
  POST_CREATE_CALL_ACTIVITY_REQUEST,
  POST_CREATE_CALL_ACTIVITY_SUCCESS,
  PUT_ACTIVITY_FAILURE,
  PUT_ACTIVITY_REQUEST,
  PUT_ACTIVITY_SUCCESS,
  POST_LOG_ACTIVITY_FAILURE,
  POST_LOG_ACTIVITY_REQUEST,
  POST_LOG_ACTIVITY_SUCCESS,
} from './activities.constants';

const initialValue = {
  postCreateCallActivityLoading: false,
  postCreateCallActivityData: null,
  postCreateCallActivityError: null,
  activityLoading: false,
  activityData: null,
  activityError: null,
  putActivityLoading: false,
  putActivityData: null,
  putActivityError: null,
  createActivityLoading: false,
  createActivityData: null,
  createActivityError: null,
  deleteActivityLoading: false,
  deleteActivityData: null,
  deleteActivityError: null,
  activitiesLoading: false,
  activitiesData: null,
  activitiesError: null,
  activityListLoading: false,
  activityListData: null,
  activityListError: null,
  postLogActivityLoading: false,
  postLogActivityData: null,
  postLogActivityError: null,
};
export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    // Activities
    case ACTIVITIES_REQUEST: {
      return {
        ...state,
        activitiesLoading: true,
      };
    }
    case ACTIVITIES_SUCCESS: {
      return {
        ...state,
        activitiesLoading: false,
        activitiesData: action.payload,
      };
    }
    case ACTIVITIES_FAILURE: {
      return {
        ...state,
        activitiesLoading: false,
        activitiesData: null,
        activitiesError: action.payload,
      };
    }

    // Activity List
    case ACTIVITY_LIST_REQUEST: {
      return {
        ...state,
        activityListLoading: true,
      };
    }
    case ACTIVITY_LIST_SUCCESS: {
      return {
        ...state,
        activityListLoading: false,
        activityListData: action.payload,
      };
    }
    case ACTIVITY_LIST_FAILURE: {
      return {
        ...state,
        activityListLoading: false,
        activityListData: null,
        activityListError: action.payload,
      };
    }

    case DELETE_ACTIVITY_REQUEST: {
      return {
        ...state,
        deleteActivityLoading: true,
      };
    }

    case DELETE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        deleteActivityLoading: false,
        deleteActivityData: action.payload,
      };
    }

    case DELETE_ACTIVITY_FAILURE: {
      return {
        ...state,
        deleteActivityLoading: false,
        deleteActivityData: null,
        deleteActivityError: action.payload,
      };
    }

    case CREATE_ACTIVITY_REQUEST: {
      return {
        ...state,
        createActivityLoading: true,
      };
    }

    case CREATE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        createActivityLoading: false,
        createActivityData: action.payload,
      };
    }

    case CREATE_ACTIVITY_FAILURE: {
      return {
        ...state,
        createActivityLoading: false,
        createActivityData: null,
        createActivityError: action.payload,
      };
    }

    case PUT_ACTIVITY_REQUEST: {
      return {
        ...state,
        putActivityLoading: true,
      };
    }

    case PUT_ACTIVITY_SUCCESS: {
      return {
        ...state,
        putActivityLoading: false,
        putActivityData: action.payload,
      };
    }

    case PUT_ACTIVITY_FAILURE: {
      return {
        ...state,
        putActivityLoading: false,
        putActivityData: null,
        putActivityError: action.payload,
      };
    }

    case ACTIVITY_REQUEST: {
      return {
        ...state,
        activityLoading: true,
      };
    }

    case ACTIVITY_SUCCESS: {
      return {
        ...state,
        activityLoading: false,
        activityData: action.payload,
      };
    }

    case ACTIVITY_FAILURE: {
      return {
        ...state,
        activityLoading: false,
        activityData: null,
        activityError: action.payload,
      };
    }

    case POST_CREATE_CALL_ACTIVITY_REQUEST: {
      return {
        ...state,
        postCreateCallActivityLoading: true,
      };
    }

    case POST_CREATE_CALL_ACTIVITY_SUCCESS: {
      return {
        ...state,
        postCreateCallActivityLoading: false,
        postCreateCallActivityData: action.payload,
      };
    }

    case POST_CREATE_CALL_ACTIVITY_FAILURE: {
      return {
        ...state,
        postCreateCallActivityLoading: false,
        postCreateCallActivityData: null,
        postCreateCallActivityError: action.payload,
      };
    }

    case POST_LOG_ACTIVITY_REQUEST: {
      return {
        ...state,
        postLogActivityLoading: true,
      };
    }

    case POST_LOG_ACTIVITY_SUCCESS: {
      return {
        ...state,
        postLogActivityLoading: false,
        postLogActivityData: action.payload,
      };
    }

    case POST_LOG_ACTIVITY_FAILURE: {
      return {
        ...state,
        postLogActivityLoading: false,
        postLogActivityData: null,
        postLogActivityError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
