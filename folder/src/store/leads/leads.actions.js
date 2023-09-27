import {
  GET_LEAD_IMPORT_PROGRESS_FAILURE,
  GET_LEAD_IMPORT_PROGRESS_REQUEST,
  GET_LEAD_IMPORT_PROGRESS_SUCCESS,
  GET_LEADS_EXCEL_TEMPLATE_FAILURE,
  GET_LEADS_EXCEL_TEMPLATE_REQUEST,
  GET_LEADS_EXCEL_TEMPLATE_SUCCESS,
  GET_LEADS_USERS_FAILURE,
  GET_LEADS_USERS_REQUEST,
  GET_LEADS_USERS_SUCCESS,
  LEADS_ASSIGN_OPERATORS_FAILURE,
  LEADS_ASSIGN_OPERATORS_REQUEST,
  LEADS_ASSIGN_OPERATORS_SUCCESS,
  LEADS_FAILURE,
  LEADS_REQUEST,
  LEADS_SUCCESS,
  POST_DO_ACTION_FOR_LEAD_FAILURE,
  POST_DO_ACTION_FOR_LEAD_REQUEST,
  POST_DO_ACTION_FOR_LEAD_SUCCESS,
  POST_IMPORT_LEADS_FAILURE,
  POST_IMPORT_LEADS_REQUEST,
  POST_IMPORT_LEADS_SUCCESS,
  POST_SEARCH_LEAD_FAILURE,
  POST_SEARCH_LEAD_REQUEST,
  POST_SEARCH_LEAD_SUCCESS,
  GET_LEAD_COMPANY_REQUEST,
  GET_LEAD_COMPANY_SUCCESS,
  GET_LEAD_COMPANY_FAILURE,
  POST_NEW_RELATION_FOR_A_PERSON_REQUEST,
  POST_NEW_RELATION_FOR_A_PERSON_FAILORE,
  POST_NEW_RELATION_FOR_A_PERSON_SUCCESS,
  DELETE_A_PERSON_COMPANY_RELATION_REQUEST,
  DELETE_A_PERSON_COMPANY_RELATION_SUCCESS,
  DELETE_A_PERSON_COMPANY_RELATION_FAILURE,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_SUCCESS,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_FAILURE,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_REQUEST,
  GET_BUSINESS_RELATIONS_SUCCESS,
  GET_BUSINESS_RELATIONS_FAILURE,
  GET_BUSINESS_RELATIONS_REQUEST,
  POST_BUSINESS_RELATION_SUCCESS,
  POST_BUSINESS_RELATION_FAILURE,
  POST_BUSINESS_RELATION_REQUEST,
  GET_PERSONS_COMPANY_PROFILE_REQUEST,
  GET_BUSINESS_RELATION_PROFILE_SUCCESS,
  GET_PERSONS_COMPANY_PROFILE_FAILURE,
  GET_PERSONS_COMPANY_PROFILE_SUCCESS,
  GET_BUSINESS_RELATION_PROFILE_FAILURE,
  GET_BUSINESS_RELATION_PROFILE_REQUEST,
} from './leads.constants';
import CPMessage from '../../components/CP/CPMessage';

export function leadsRequest() {
  return {
    type: LEADS_REQUEST,
  };
}

export function leadsSuccess(data) {
  return {
    type: LEADS_SUCCESS,
    payload: data,
  };
}

export function leadsFailure(error) {
  return {
    type: LEADS_FAILURE,
    payload: error,
  };
}

export function getLeadsAction(params) {
  return (dispatch, getState, { getLeadsRequest }) => {
    dispatch(leadsRequest());
    return getLeadsRequest(params).then(data => {
      if (data.err) {
        dispatch(leadsFailure(data));
        return false;
      }
      dispatch(leadsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function leadsAssignOperatorsRequest() {
  return {
    type: LEADS_ASSIGN_OPERATORS_REQUEST,
  };
}

export function leadsAssignOperatorsSuccess(data) {
  return {
    type: LEADS_ASSIGN_OPERATORS_SUCCESS,
    payload: data,
  };
}

export function leadsAssignOperatorsFailure(error) {
  return {
    type: LEADS_ASSIGN_OPERATORS_FAILURE,
    payload: error,
  };
}

export function getLeadsAssignOperatorsAction(params) {
  return (dispatch, getState, { getLeadsAssignOperatorsRequest }) => {
    dispatch(leadsAssignOperatorsRequest());
    return getLeadsAssignOperatorsRequest(params).then(data => {
      if (data.err) {
        dispatch(leadsAssignOperatorsFailure(data));
        return false;
      }
      dispatch(leadsAssignOperatorsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function postImportLeadsAction(body) {
  return (dispatch, getState, { postImportLeadsRequest }) => {
    dispatch({ type: POST_IMPORT_LEADS_REQUEST });
    return postImportLeadsRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_IMPORT_LEADS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_IMPORT_LEADS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getLeadsUsersAction(unitId, ...params) {
  return (dispatch, getState, { getLeadsUsersRequest }) => {
    dispatch({ type: GET_LEADS_USERS_REQUEST });
    return getLeadsUsersRequest(unitId, ...params).then(data => {
      if (data.err) {
        dispatch({ type: GET_LEADS_USERS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_LEADS_USERS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getPersonsCompaniesAction(personLeadId) {
  return (dispatch, getState, { getLeadCompanyRequest }) => {
    dispatch({ type: GET_LEAD_COMPANY_REQUEST });
    return getLeadCompanyRequest(personLeadId).then(data => {
      if (data.err) {
        dispatch({ type: GET_LEAD_COMPANY_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_LEAD_COMPANY_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postNewRelationForAPersonAction(body) {
  return (dispatch, getState, { postNewRelationForAPersonRequest }) => {
    dispatch({ type: POST_NEW_RELATION_FOR_A_PERSON_REQUEST });
    return postNewRelationForAPersonRequest(body).then(data => {
      if (data.error) {
        dispatch({
          type: POST_NEW_RELATION_FOR_A_PERSON_FAILORE,
          payload: data,
        });
        CPMessage('مشگلی پیش آمده', 'error');
        return data;
      }
      dispatch({
        type: POST_NEW_RELATION_FOR_A_PERSON_SUCCESS,
        payload: data.resp,
      });
      CPMessage('ذخیره شد.', 'success');
      return data.resp;
    });
  };
}

export function deleteAPersonRelationCompanyAction(relationId) {
  return (dispatch, getState, { deleteAPersonRelationCompanyRequest }) => {
    dispatch({ type: DELETE_A_PERSON_COMPANY_RELATION_REQUEST });
    return deleteAPersonRelationCompanyRequest(relationId).then(data => {
      if (data.err) {
        dispatch({ type: DELETE_A_PERSON_COMPANY_RELATION_FAILURE });
        CPMessage('مشگلی پیش آمده', 'error');
        return data;
      }
      dispatch({ type: DELETE_A_PERSON_COMPANY_RELATION_SUCCESS });
      CPMessage('عنوان شغلی مورد نظر حذف شد.', 'success');
      return data.resp;
    });
  };
}

export function putAPersonRelationOfCompanyAction(body) {
  return (dispatch, getState, { putAPersonRelationOfCompanyRequest }) => {
    dispatch({ type: EDIT_RELATION_OF_A_PERSON_IN_COMPANY_REQUEST });
    return putAPersonRelationOfCompanyRequest(body).then(data => {
      if (data.error) {
        dispatch({
          type: EDIT_RELATION_OF_A_PERSON_IN_COMPANY_FAILURE,
          payload: data,
        });
        CPMessage('مشگلی پیش آمده', 'error');
        return data;
      }
      dispatch({
        type: EDIT_RELATION_OF_A_PERSON_IN_COMPANY_SUCCESS,
        payload: data.resp,
      });
      CPMessage('عنوان شغلی مورد نظر ویرایش شد.', 'success');
      return data.resp;
    });
  };
}

export function getBusinessRelationsAction(businessId) {
  return (dispatch, getState, { getBusinessRelationsRequest }) => {
    dispatch({ type: GET_BUSINESS_RELATIONS_REQUEST });
    return getBusinessRelationsRequest(businessId).then(data => {
      if (data.err) {
        dispatch({ type: GET_BUSINESS_RELATIONS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_BUSINESS_RELATIONS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postBusinessRelationAction(body) {
  return (dispatch, getatet, { postBusinessRelationRequest }) => {
    dispatch({ type: POST_BUSINESS_RELATION_REQUEST });
    return postBusinessRelationRequest(body).then(data => {
      if (data.error) {
        dispatch({ type: POST_BUSINESS_RELATION_FAILURE, payload: data });
        CPMessage('مشگلی پیش آمده', 'error');
        return data;
      }
      dispatch({ type: POST_BUSINESS_RELATION_SUCCESS, payload: data.resp });
      CPMessage('ذخیره شد', 'success');
      return data.resp;
    });
  };
}

export function getLeadsExcelTemplateAction(leadType) {
  return (dispatch, getState, { getLeadsExcelTemplateRequest }) => {
    dispatch({ type: GET_LEADS_EXCEL_TEMPLATE_REQUEST });
    return getLeadsExcelTemplateRequest(leadType).then(data => {
      if (data.err) {
        dispatch({ type: GET_LEADS_EXCEL_TEMPLATE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_LEADS_EXCEL_TEMPLATE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getLeadImportProgressAction(params) {
  return (dispatch, getState, { getLeadImportProgressRequest }) => {
    dispatch({ type: GET_LEAD_IMPORT_PROGRESS_REQUEST });
    return getLeadImportProgressRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: GET_LEAD_IMPORT_PROGRESS_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: GET_LEAD_IMPORT_PROGRESS_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postSearchLeadAction(body) {
  return (dispatch, getState, { postSearchLeadRequest }) => {
    dispatch({ type: POST_SEARCH_LEAD_REQUEST });
    return postSearchLeadRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: POST_SEARCH_LEAD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_SEARCH_LEAD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function postDoActionForLeadAction(...params) {
  return (dispatch, getState, { postDoActionForLeadRequest }) => {
    dispatch({ type: POST_DO_ACTION_FOR_LEAD_REQUEST });
    return postDoActionForLeadRequest(...params).then(data => {
      if (data.err) {
        dispatch({ type: POST_DO_ACTION_FOR_LEAD_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_DO_ACTION_FOR_LEAD_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getPersonsCompanyProfileAction(levantId) {
  return (dispatch, getState, { getPersonsCompanyProfileRequest }) => {
    dispatch({ type: GET_PERSONS_COMPANY_PROFILE_REQUEST });
    return getPersonsCompanyProfileRequest(levantId).then(data => {
      if (data.error) {
        dispatch({ type: GET_PERSONS_COMPANY_PROFILE_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: GET_PERSONS_COMPANY_PROFILE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getBusinessRelationProfileAction(levantId) {
  return (dispatch, getState, { getBusinessesRelationProfileRequest }) => {
    dispatch({ type: GET_BUSINESS_RELATION_PROFILE_REQUEST });
    return getBusinessesRelationProfileRequest(levantId).then(data => {
      if (data.error) {
        dispatch({
          type: GET_BUSINESS_RELATION_PROFILE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: GET_BUSINESS_RELATION_PROFILE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}
