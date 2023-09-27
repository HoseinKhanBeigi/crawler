import {
  BASE_VARIABLE_KEYS,
  DeleteData,
  FetchData,
  mockService,
  PostData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';

/** ******************************  Mock data  ****************************************** */
const activitiesMockData = mockService
  ? require('../../../restApiDesign/activity/activities')
  : {};
const activityListMockData = mockService
  ? require('../../../restApiDesign/activity/activities')
  : {};
const activityMockData = mockService
  ? require('../../../restApiDesign/activity/activity')
  : {};
const deleteActivityMockData = mockService
  ? require('../../../restApiDesign/activity/deleteActivity')
  : {};
const createActivityMockData = mockService
  ? require('../../../restApiDesign/activity/createActivity')
  : {};
const putActivityMockData = mockService
  ? require('../../../restApiDesign/activity/putActivity')
  : {};
/** ******************************  URL Address    ****************************************** */
export const createCallActivityUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/contact-center/call`;
export const putActivityUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/`;
export const createActivityUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/`;
export const deleteActivityUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/${id}`;
export const getActivityUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/${id}`;
export const activityListUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/`;
export const activitiesUrl = leadId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/activity/source/LEAD/${leadId}`;
export const createLogActivityUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/log-activity/${levantId}`;

/** ******************************Service Function******************************************* */
export function createGetActivitiesRequest(fetch, token) {
  return async function activitiesRequest(leadId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: activitiesMockData,
      };
    }
    return FetchData(fetch, activitiesUrl(leadId), token);
  };
}

// Activities Get Func
export function createGetActivityListRequest(fetch, token) {
  return async function activityListRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: activityListMockData,
      };
    }
    return FetchData(fetch, activityListUrl(), token);
  };
}

// Delete Activity
export function createGetDeleteActivityRequest(fetch, token) {
  return async function deleteActivityRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        res: deleteActivityMockData,
      };
    }
    return DeleteData(fetch, deleteActivityUrl(id), token);
  };
}

// Create Activity
export function createGetCreateActivityRequest(fetch, token) {
  return async function createActivityRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        res: createActivityMockData,
      };
    }
    return PostData(fetch, createActivityUrl(), params, token);
  };
}

// Put Activity
export function createGetPutActivityRequest(fetch, token) {
  return async function putActivityRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        res: putActivityMockData,
      };
    }
    return PutData(fetch, putActivityUrl(), params, token);
  };
}

// Get Single Activity
export function createGetActivityRequest(fetch, token) {
  return async function activityRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: activityMockData,
      };
    }
    return FetchData(fetch, getActivityUrl(id), token);
  };
}

export function createPostCreateCallActivityRequest(fetch, token) {
  return async function postCreateCallActivityRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: activityMockData,
      };
    }
    return PostData(fetch, createCallActivityUrl(), body, token);
  };
}

export function createPostLogActivityRequest(fetch, token) {
  return async function postLogActivityAction({ levantId, body }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: activityMockData,
      };
    }
    return PostData(fetch, createLogActivityUrl(levantId), body, token);
  };
}
