import {
  BASE_VARIABLE_KEYS,
  DeleteData,
  FetchData,
  mockService,
  resolveVariable,
} from '../../serviceConfig';

const opportunitiesMockData = mockService
  ? require('../../../restApiDesign/lead/opportunities')
  : {};

export const deleteOpportunityUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/${opportunityId}`;

export const opportunityUrl = params =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/levants/${params}`;

export function createGetOpportunityRequest(fetch, token) {
  return async function opportunityRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: opportunitiesMockData,
      };
    }
    return FetchData(fetch, opportunityUrl(params), token);
  };
}

export function createDeleteOpportunityRequest(fetch, token) {
  return async function deleteOpportunityRequest(opportunityId) {
    return DeleteData(fetch, deleteOpportunityUrl(opportunityId), token);
  };
}
