import mockData from '../../../restApiDesign/empty.json';
import {
  PostData,
  FetchData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';
import { mockService } from '../../webConfig';

export const contactUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/contact-center/contact`;

export const crmActivitiesUrl = (levantId, pagination, params = '') => {
  if (levantId) {
    return `${resolveVariable(
      BASE_VARIABLE_KEYS.BASE_URL,
    )}/activity?applicationName=CRM&levantId=${levantId}&${pagination}&${params}`;
  }
  return `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/activity?applicationName=CRM&${pagination}&${params}`;
};

export const userActivitiesUrl = (levantId, pagination, params = '') =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/activity?applicationName=${resolveVariable(
    BASE_VARIABLE_KEYS.CONTEXT,
  )}&levantId=${levantId}&${pagination}&${params}`;

export const actionTypesUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/activity/actions`;

export function createGetNewActivitiesRequest(fetch, token) {
  return async function activitiesRequest({ levantId, pagination, params }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(
      fetch,
      userActivitiesUrl(levantId, pagination, params),
      token,
    );
  };
}

export function createGetCrmActivitiesRequest(fetch, token) {
  return async function getCrmActivitiesRequest({
    levantId,
    pagination,
    params,
  }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(
      fetch,
      crmActivitiesUrl(levantId, pagination, params),
      token,
    );
  };
}

export function createPostContactRequest(fetch, token) {
  return async function postContactRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return PostData(fetch, contactUrl(), body, token);
  };
}

export function createGetActionTypesRequest(fetch, token) {
  return async function getActionTypesRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, actionTypesUrl(), token);
  };
}
