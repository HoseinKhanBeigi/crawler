/* eslint-disable import/prefer-default-export */

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

export function getUserActivitiesAction(params) {
  return (dispatch, getState, { getNewActivitiesRequest }) => {
    dispatch({ type: GET_ACTIVITIES_REQUEST });
    return getNewActivitiesRequest({ ...params }).then(data => {
      if (data.err) {
        dispatch({ type: GET_ACTIVITIES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getCrmActivitiesAction(params) {
  return (dispatch, getState, { getCrmActivitiesRequest }) => {
    dispatch({ type: GET_CRM_ACTIVITIES_REQUEST });
    return getCrmActivitiesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_CRM_ACTIVITIES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_CRM_ACTIVITIES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

// export function getAllContactsAction(params) {
//   return (dispatch, getState, { getAllContactsRequest }) => {
//     dispatch({ type: GET_ALL_CONTACTS_REQUEST });
//     return getAllContactsRequest(params).then(data => {
//       if (data.err) {
//         dispatch({ type: GET_ALL_CONTACTS_FAILURE, payload: data });
//         return data;
//       }
//       dispatch({ type: GET_ALL_CONTACTS_SUCCESS, payload: data.resp });
//       return data.resp;
//     });
//   };
// }

export function postContactAction(body) {
  return (dispatch, getState, { postContactRequest }) => {
    dispatch({ type: POST_CONTACT_REQUEST });
    return postContactRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_CONTACT_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_CONTACT_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getActionTypesAction(params) {
  return (dispatch, getState, { getActionTypesRequest }) => {
    dispatch({ type: GET_ACTION_TYPES_REQUEST });
    return getActionTypesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_ACTION_TYPES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_ACTION_TYPES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
