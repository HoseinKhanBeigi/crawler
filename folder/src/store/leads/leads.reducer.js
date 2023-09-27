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
  GET_LEAD_COMPANY_SUCCESS,
  GET_LEAD_COMPANY_REQUEST,
  GET_LEAD_COMPANY_FAILURE,
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
  POST_NEW_RELATION_FOR_A_PERSON_SUCCESS,
  POST_NEW_RELATION_FOR_A_PERSON_REQUEST,
  POST_NEW_RELATION_FOR_A_PERSON_FAILORE,
  DELETE_A_PERSON_COMPANY_RELATION_REQUEST,
  DELETE_A_PERSON_COMPANY_RELATION_SUCCESS,
  DELETE_A_PERSON_COMPANY_RELATION_FAILURE,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_REQUEST,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_FAILURE,
  EDIT_RELATION_OF_A_PERSON_IN_COMPANY_SUCCESS,
  GET_BUSINESS_RELATIONS_REQUEST,
  GET_BUSINESS_RELATIONS_SUCCESS,
  GET_BUSINESS_RELATIONS_FAILURE,
  POST_BUSINESS_RELATION_REQUEST,
  POST_BUSINESS_RELATION_SUCCESS,
  POST_BUSINESS_RELATION_FAILURE,
  GET_PERSONS_COMPANY_PROFILE_REQUEST,
  GET_PERSONS_COMPANY_PROFILE_SUCCESS,
  GET_PERSONS_COMPANY_PROFILE_FAILURE,
  GET_BUSINESS_RELATION_PROFILE_SUCCESS,
  GET_BUSINESS_RELATION_PROFILE_REQUEST,
  GET_BUSINESS_RELATION_PROFILE_FAILURE,
} from './leads.constants';

const initialValue = {
  postDoActionForLeadLoading: false,
  postDoActionForLeadData: null,
  postDoActionForLeadError: null,
  postSearchLeadLoading: false,
  postSearchLeadData: null,
  postSearchLeadError: null,
  getLeadImportProgressLoading: false,
  getLeadImportProgressData: null,
  getLeadImportProgressError: null,
  getLeadsExcelTemplateLoading: false,
  getLeadsExcelTemplateData: null,
  getLeadsExcelTemplateError: null,
  getLeadsUsersLoading: false,
  getLeadsUsersData: [],
  getLeadsUsersError: null,
  getLeadCompanyLoading: false,
  getLeadCompanyData: [],
  getLeadCompanyError: null,
  postImportLeadsLoading: false,
  postImportLeadsData: null,
  postImportLeadsError: null,
  leadsAssignOperatorsLoading: false,
  leadsAssignOperatorsData: null,
  leadsAssignOperatorsError: null,
  postNewRelationForAPersonLoading: false,
  postNewRelationForAPersonData: null,
  postNewRelationForAPersonError: null,
  isDeletingAPersonCompanyRelation: false,
  putPersonRelationLoading: false,
  PutPersonRelationData: null,
  putPersonRelationError: null,
  getBusinessRelationLoading: false,
  getBusinessRelationData: [],
  getBusinessRelationError: null,
  postBusinessRelationLoading: false,
  postBusinessRelationData: null,
  postBusinessRelationError: null,
  getPersonsCompanyProfileLoading: false,
  getPersonsCompanyProfileData: null,
  getPersonsCompanyProfileError: null,
  getBusinessRelationProfileLoading: false,
  getBusinessRelationProfileData: null,
  getBusinessRelationProfileError: null,
  loading: false,
  data: null,
  error: null,
};
export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case LEADS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LEADS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case LEADS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case GET_LEAD_COMPANY_REQUEST: {
      return {
        ...state,
        getLeadCompanyLoading: true,
      };
    }

    case GET_LEAD_COMPANY_SUCCESS: {
      return {
        ...state,
        getLeadCompanyLoading: false,
        getLeadCompanyData: action.payload,
      };
    }

    case GET_LEAD_COMPANY_FAILURE: {
      return {
        ...state,
        getLeadCompanyLoading: false,
        getLeadCompanyData: null,
        getLeadCompanyError: action.payload,
      };
    }

    case LEADS_ASSIGN_OPERATORS_REQUEST: {
      return {
        ...state,
        leadsAssignOperatorsLoading: true,
      };
    }

    case LEADS_ASSIGN_OPERATORS_SUCCESS: {
      return {
        ...state,
        leadsAssignOperatorsLoading: false,
        leadsAssignOperatorsData: action.payload,
      };
    }

    case LEADS_ASSIGN_OPERATORS_FAILURE: {
      return {
        ...state,
        leadsAssignOperatorsLoading: false,
        leadsAssignOperatorsData: null,
        leadsAssignOperatorsError: action.payload,
      };
    }

    case POST_IMPORT_LEADS_REQUEST: {
      return {
        ...state,
        postImportLeadsLoading: true,
      };
    }

    case POST_IMPORT_LEADS_SUCCESS: {
      return {
        ...state,
        postImportLeadsLoading: false,
        postImportLeadsData: action.payload,
      };
    }

    case POST_IMPORT_LEADS_FAILURE: {
      return {
        ...state,
        postImportLeadsLoading: false,
        postImportLeadsData: null,
        postImportLeadsError: action.payload,
      };
    }

    case GET_LEADS_USERS_REQUEST: {
      return {
        ...state,
        getLeadsUsersLoading: true,
      };
    }

    case GET_LEADS_USERS_SUCCESS: {
      return {
        ...state,
        getLeadsUsersLoading: false,
        getLeadsUsersData: action.payload,
      };
    }

    case GET_LEADS_USERS_FAILURE: {
      return {
        ...state,
        getLeadsUsersLoading: false,
        getLeadsUsersData: null,
        getLeadsUsersError: action.payload,
      };
    }

    case GET_LEADS_EXCEL_TEMPLATE_REQUEST: {
      return {
        ...state,
        getLeadsExcelTemplateLoading: true,
      };
    }

    case GET_LEADS_EXCEL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        getLeadsExcelTemplateLoading: false,
        getLeadsExcelTemplateData: action.payload,
      };
    }

    case GET_LEADS_EXCEL_TEMPLATE_FAILURE: {
      return {
        ...state,
        getLeadsExcelTemplateLoading: false,
        getLeadsExcelTemplateData: null,
        getLeadsExcelTemplateError: action.payload,
      };
    }

    case GET_LEAD_IMPORT_PROGRESS_REQUEST: {
      return {
        ...state,
        getLeadImportProgressLoading: true,
      };
    }

    case GET_LEAD_IMPORT_PROGRESS_SUCCESS: {
      return {
        ...state,
        getLeadImportProgressLoading: false,
        getLeadImportProgressData: action.payload,
      };
    }

    case GET_LEAD_IMPORT_PROGRESS_FAILURE: {
      return {
        ...state,
        getLeadImportProgressLoading: false,
        getLeadImportProgressData: null,
        getLeadImportProgressError: action.payload,
      };
    }

    case POST_SEARCH_LEAD_REQUEST: {
      return {
        ...state,
        postSearchLeadLoading: true,
      };
    }

    case POST_SEARCH_LEAD_SUCCESS: {
      return {
        ...state,
        postSearchLeadLoading: false,
        postSearchLeadData: action.payload,
      };
    }

    case POST_SEARCH_LEAD_FAILURE: {
      return {
        ...state,
        postSearchLeadLoading: false,
        postSearchLeadData: null,
        postSearchLeadError: action.payload,
      };
    }

    case POST_DO_ACTION_FOR_LEAD_REQUEST: {
      return {
        ...state,
        postDoActionForLeadLoading: true,
      };
    }

    case POST_DO_ACTION_FOR_LEAD_SUCCESS: {
      return {
        ...state,
        postDoActionForLeadLoading: false,
        postDoActionForLeadData: action.payload,
      };
    }

    case POST_DO_ACTION_FOR_LEAD_FAILURE: {
      return {
        ...state,
        postDoActionForLeadLoading: false,
        postDoActionForLeadData: null,
        postDoActionForLeadError: action.payload,
      };
    }

    case POST_NEW_RELATION_FOR_A_PERSON_REQUEST: {
      return {
        ...state,
        postNewRelationForAPersonLoading: true,
      };
    }

    case POST_NEW_RELATION_FOR_A_PERSON_SUCCESS: {
      return {
        ...state,
        postNewRelationForAPersonLoading: false,
        postNewRelationForAPersonData: action.payload,
      };
    }

    case POST_NEW_RELATION_FOR_A_PERSON_FAILORE: {
      return {
        ...state,
        postNewRelationForAPersonLoading: false,
        postNewRelationForAPersonData: null,
        postDoActionForLeadError: action.payload,
      };
    }

    case DELETE_A_PERSON_COMPANY_RELATION_REQUEST: {
      return {
        ...state,
        isDeletingAPersonCompanyRelation: true,
      };
    }

    case DELETE_A_PERSON_COMPANY_RELATION_SUCCESS: {
      return {};
    }

    case DELETE_A_PERSON_COMPANY_RELATION_FAILURE: {
      return {
        ...state,
        isDeletingAPersonCompanyRelation: false,
      };
    }

    case EDIT_RELATION_OF_A_PERSON_IN_COMPANY_REQUEST: {
      return {
        ...state,
        putPersonRelationLoading: true,
      };
    }

    case EDIT_RELATION_OF_A_PERSON_IN_COMPANY_SUCCESS: {
      return {
        ...state,
        putPersonRelationLoading: false,
        putPersonRelationData: action.payload,
      };
    }

    case EDIT_RELATION_OF_A_PERSON_IN_COMPANY_FAILURE: {
      return {
        ...state,
        putPersonRelationLoading: false,
        putPersonRelationData: null,
        putPersonRelationError: action.payload,
      };
    }

    case GET_BUSINESS_RELATIONS_REQUEST: {
      return {
        ...state,
        getBusinessRelationLoading: true,
      };
    }

    case GET_BUSINESS_RELATIONS_SUCCESS: {
      return {
        ...state,
        getBusinessRelationLoading: false,
        getBusinessRelationData: action.payload,
      };
    }

    case GET_BUSINESS_RELATIONS_FAILURE: {
      return {
        ...state,
        getBusinessRelationLoading: false,
        getBusinessRelationData: null,
        getBusinessRelationError: action.payload,
      };
    }

    case POST_BUSINESS_RELATION_REQUEST: {
      return {
        ...state,
        postBusinessRelationLoading: true,
      };
    }

    case POST_BUSINESS_RELATION_SUCCESS: {
      return {
        ...state,
        postBusinessRelationLoading: false,
        postBusinessRelationData: action.payload,
      };
    }

    case POST_BUSINESS_RELATION_FAILURE: {
      return {
        ...state,
        postBusinessRelationLoading: false,
        postBusinessRelationData: null,
        postBusinessRelationError: action.payload,
      };
    }

    case GET_PERSONS_COMPANY_PROFILE_REQUEST: {
      return {
        ...state,
        getPersonsCompanyProfileLoading: true,
      };
    }

    case GET_PERSONS_COMPANY_PROFILE_SUCCESS: {
      return {
        ...state,
        getPersonsCompanyProfileLoading: false,
        getPersonsCompanyProfileData: action.payload,
      };
    }

    case GET_PERSONS_COMPANY_PROFILE_FAILURE: {
      return {
        ...state,
        getPersonsCompanyProfileLoading: false,
        getPersonsCompanyProfileData: null,
        getPersonsCompanyProfileError: action.payload,
      };
    }

    case GET_BUSINESS_RELATION_PROFILE_REQUEST: {
      return {
        ...state,
        getBusinessRelationProfileLoading: true,
      };
    }

    case GET_BUSINESS_RELATION_PROFILE_SUCCESS: {
      return {
        ...state,
        getBusinessRelationProfileLoading: false,
        getBusinessRelationProfileData: action.payload,
      };
    }

    case GET_BUSINESS_RELATION_PROFILE_FAILURE: {
      return {
        ...state,
        getBusinessRelationProfileLoading: false,
        getBusinessRelationProfileData: null,
        getBusinessRelationProfileError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
