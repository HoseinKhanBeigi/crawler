/* eslint-disable import/extensions */
import {
  BASE_VARIABLE_KEYS,
  basicDownload,
  FetchData,
  mockService,
  PostData,
  PostFileData,
  PutData,
  DeleteData,
  resolveVariable,
} from '../../serviceConfig';
import mockData from '../../../restApiDesign/empty.json';

/** ******************************  Mock data  ****************************************** */
const leadsMockData = mockService
  ? require('../../../restApiDesign/leads/leadsList')
  : {};
const leadsAssignOperatorsMockData = mockService
  ? require('../../../restApiDesign/leads/operators')
  : {};
/** ******************************  URL Address    ****************************************** */
const leadImportProgressUrl = trackingId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/leads/import/progress/${trackingId}`;
const leadsExcelTemplateUrl = leadType =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/columns/leads/export/excel/${leadType}`;
const leadsUsersUrl = (unitId, ...codes) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/acl-unit-employee-group/list?${new URLSearchParams({
    ...(codes.length && { aclGroupId: codes.join(',') }),
  }).toString()}${unitId ? `&unitId=${unitId}` : ''}`;
const importLeadsUrl = (fileName, leadType) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/leads/${leadType}/import?fileName=${fileName}`;
const leadsUrl = params =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/search?${params}`;
const searchLeadUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/lookup`;
const leadsAssignOperatorsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/operators`;
const doActionForLeadUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/leads/action`;
const leadChangeStatusUrl = type =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/leads/${type}/change-status/`;
const saveRelationUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.LEAD_RELATION)}`;
const leadCompanyUrl = personId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.LEAD_RELATION,
  )}/find-businesses/${personId}`;
const leadRelationUrl = businessId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.LEAD_RELATION,
  )}/find-persons/${businessId}`;
const deletePersonRelationCompanyUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.LEAD_RELATION)}/${id}`;
const putPersonRelationCompanyUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.LEAD_RELATION)}/edit`;
const getPersonsCompanyProfileUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.LEAD_RELATION,
  )}/find-businesses/by-levantId/${levantId}`;
const getBusinessesRelationsProfileUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.LEAD_RELATION,
  )}/find-persons/by-levantId/${levantId}`;

/** ******************************Service Function******************************************* */
export function createGetLeadsRequest(fetch, token) {
  return async function leadsRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: leadsMockData,
      };
    }
    return FetchData(fetch, leadsUrl(params), token);
  };
}

export function createGetLeadsAssignOperatorsRequest(fetch, token) {
  return async function leadsAssignOperatorsRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: leadsAssignOperatorsMockData,
      };
    }
    return FetchData(fetch, leadsAssignOperatorsUrl(), token);
  };
}

export function createPostImportLeadsRequest(fetch, token) {
  return async function postImportLeadsRequest({ fileName, body, leadType }) {
    return PostFileData(fetch, importLeadsUrl(fileName, leadType), body, token);
  };
}

export function createGetLeadsUsersRequest(fetch, token) {
  return async function getLeadsUsersRequest(unitId, ...codes) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, leadsUsersUrl(unitId, ...codes), token);
  };
}

export function createGetLeadsExcelTemplateRequest(fetch, token) {
  return async function getLeadsExcelTemplateRequest(leadType) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return basicDownload(fetch, leadsExcelTemplateUrl(leadType), token);
  };
}

export function createGetLeadImportProgressRequest(fetch, token) {
  return async function getLeadImportProgressRequest({ trackingId }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, leadImportProgressUrl(trackingId), token);
  };
}

export function createPostSearchLeadRequest(fetch, token) {
  return async function postSearchLeadRequest(body) {
    return PostData(fetch, searchLeadUrl(), body, token);
  };
}

export function createPostDoActionForLeadRequest(fetch, token) {
  return async function postDoActionForLeadRequest(body, leadType) {
    let requestUrl = doActionForLeadUrl();
    if (leadType) requestUrl = leadChangeStatusUrl(leadType);
    return PutData(fetch, requestUrl, body, token);
  };
}

export function createPostAPersonRelation(fetch, token) {
  return async function postNewRelationForAPersonRequest(body) {
    return PostData(fetch, saveRelationUrl(), body, token);
  };
}

export function createGetLeadCompanyRequest(fetch, token) {
  return async function getLeadCompanyRequest(personLeadId) {
    return FetchData(fetch, leadCompanyUrl(personLeadId), token);
  };
}

export function createDeleteAPersonCompanyRelation(fetch, token) {
  return async function deleteAPersonRelationCompanyRequest(relationId) {
    return DeleteData(fetch, deletePersonRelationCompanyUrl(relationId), token);
  };
}

export function createPutAPersonCompanyRelation(fetch, token) {
  return async function putAPersonRelationOfCompanyRequest(body) {
    return PutData(fetch, putPersonRelationCompanyUrl(), body, token);
  };
}

export function createGetBusinessRelations(fetch, token) {
  return async function getBusinessRelationsRequest(businessId) {
    return FetchData(fetch, leadRelationUrl(businessId), token);
  };
}

export function createPostBusinessRelations(fetch, token) {
  return async function postBusinessRelationRequest(body) {
    return PostData(fetch, saveRelationUrl(), body, token);
  };
}

export function createGetPersonsCompanyProfile(fetch, token) {
  return async function getPersonsCompanyProfileRequest(levantId) {
    return FetchData(fetch, getPersonsCompanyProfileUrl(levantId), token);
  };
}

export function createGetBusinessesRelationProfile(fetch, token) {
  return async function getBusinessesRelationProfileRequest(levantId) {
    return FetchData(fetch, getBusinessesRelationsProfileUrl(levantId), token);
  };
}
