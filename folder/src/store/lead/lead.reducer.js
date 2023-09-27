import {
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_FAILURE,
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_REQUEST,
  GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_SUCCESS,
  GET_CONTACTS_BY_LEVANT_ID_FAILURE,
  GET_CONTACTS_BY_LEVANT_ID_REQUEST,
  GET_CONTACTS_BY_LEVANT_ID_SUCCESS,
  GET_LEAD_FORM_FIELDS_FAILURE,
  GET_LEAD_FORM_FIELDS_REQUEST,
  GET_LEAD_FORM_FIELDS_SUCCESS,
  LEAD_FAILURE,
  LEAD_REQUEST,
  LEAD_SUCCESS,
  LEAD_LOAD_COLUMNS_FAILURE,
  LEAD_LOAD_COLUMNS_REQUEST,
  LEAD_LOAD_COLUMNS_SUCCESS,
  POST_ADD_LEAD_FAILURE,
  POST_ADD_LEAD_REQUEST,
  POST_ADD_LEAD_SUCCESS,
  PUT_LEAD_FAILURE,
  PUT_LEAD_REQUEST,
  PUT_LEAD_SUCCESS,
  LEAD_RELATIONS_REQUEST,
  LEAD_RELATIONS_SUCCESS,
  LEAD_RELATIONS_FAILURE,
} from './lead.constants';

const initialValue = {
  getLeadFormFieldsLoading: false,
  getLeadFormFieldsData: null,
  getLeadFormFieldsError: null,
  getContactsByLevantIdLoading: false,
  contactsByLevantIdData: null,
  getContactsByLevantIdError: null,
  postAddLeadLoading: false,
  postAddLeadData: null,
  postAddLeadError: null,
  getPartyPhoneNumberByLevantIdLoading: false,
  getPartyPhoneNumberByLevantIdData: null,
  getPartyPhoneNumberByLevantIdError: null,
  loading: false,
  data: null,
  leadPersonColumnsAndValues: null,
  error: null,
  person: null,
  business: null,
  leadRelationsLoading: false,
  leadRelationsData: [],
  leadRelationsError: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case LEAD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LEAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case LEAD_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
        person: null,
        business: null,
      };
    }

    case LEAD_LOAD_COLUMNS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LEAD_LOAD_COLUMNS_SUCCESS: {
      return {
        ...state,
        loading: false,
        leadPersonColumnsAndValues: action.payload,
        error: null,
      };
    }

    case LEAD_LOAD_COLUMNS_FAILURE: {
      return {
        ...state,
        loading: false,
        leadPersonColumnsAndValues: null,
        error: action.payload,
        person: null,
        business: null,
      };
    }

    case GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_REQUEST: {
      return {
        ...state,
        getPartyPhoneNumberByLevantIdLoading: true,
      };
    }

    case GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_SUCCESS: {
      return {
        ...state,
        getPartyPhoneNumberByLevantIdLoading: false,
        getPartyPhoneNumberByLevantIdData: action.payload,
      };
    }

    case GET__PARTY_PHONE_NUMBER_BY_LEVANT_ID_FAILURE: {
      return {
        ...state,
        getPartyPhoneNumberByLevantIdLoading: false,
        getPartyPhoneNumberByLevantIdData: null,
        getPartyPhoneNumberByLevantIdError: action.payload,
      };
    }

    case POST_ADD_LEAD_REQUEST: {
      return {
        ...state,
        postAddLeadLoading: true,
      };
    }

    case POST_ADD_LEAD_SUCCESS: {
      return {
        ...state,
        postAddLeadLoading: false,
        postAddLeadData: action.payload,
      };
    }

    case POST_ADD_LEAD_FAILURE: {
      return {
        ...state,
        postAddLeadLoading: false,
        postAddLeadData: null,
        postAddLeadError: action.payload,
      };
    }

    case PUT_LEAD_REQUEST: {
      return {
        ...state,
        postAddLeadLoading: true,
      };
    }

    case PUT_LEAD_SUCCESS: {
      return {
        ...state,
        postAddLeadLoading: false,
      };
    }

    case PUT_LEAD_FAILURE: {
      return {
        ...state,
        postAddLeadLoading: false,
      };
    }

    case GET_CONTACTS_BY_LEVANT_ID_REQUEST: {
      return {
        ...state,
        getContactsByLevantIdLoading: true,
      };
    }

    case GET_CONTACTS_BY_LEVANT_ID_SUCCESS: {
      return {
        ...state,
        getContactsByLevantIdLoading: false,
        contactsByLevantIdData: action.payload,
      };
    }

    case GET_CONTACTS_BY_LEVANT_ID_FAILURE: {
      return {
        ...state,
        getContactsByLevantIdLoading: false,
        contactsByLevantIdData: null,
        getContactsByLevantIdError: action.payload,
      };
    }

    case GET_LEAD_FORM_FIELDS_REQUEST: {
      return {
        ...state,
        getLeadFormFieldsLoading: true,
      };
    }

    case GET_LEAD_FORM_FIELDS_SUCCESS: {
      if (action.payload.type === 'PERSON') {
        return {
          ...state,
          getLeadFormFieldsLoading: false,
          person: action.payload.data,
        };
      } else if (action.payload.type === 'BUSINESS') {
        return {
          ...state,
          getLeadFormFieldsLoading: false,
          business: action.payload.data,
        };
      }
      return {
        ...state,
        getLeadFormFieldsLoading: false,
        getLeadFormFieldsData: action.payload.data,
      };
    }

    case GET_LEAD_FORM_FIELDS_FAILURE: {
      return {
        ...state,
        getLeadFormFieldsLoading: false,
        getLeadFormFieldsData: null,
        getLeadFormFieldsError: action.payload,
      };
    }

    case LEAD_RELATIONS_REQUEST: {
      return {
        ...state,
        leadRelationsLoading: true,
      };
    }

    case LEAD_RELATIONS_SUCCESS: {
      const systemRoles = {
        BUSINESS_INITIATOR: '#4f66a5',
        BUSINESS_ADMIN: '#03a262',
      };

      const mergeRelations = (relations = []) => {
        const addRole = (relation, merged) => {
          const { relationTitle, relationType } = relation;
          if (relationType in systemRoles) {
            merged[relation.relationLevantId].roles.push({
              relationTitle,
              relationType,
              tagColor: systemRoles[relationType],
            });
          } else {
            merged[relation.relationLevantId].relations.push({
              relationTitle,
              relationType,
            });
          }
          return merged;
        };
        const initializeRelationData = (relation, merged) => {
          // eslint-disable-next-line no-param-reassign
          merged[relation.relationLevantId] = {
            name: relation.relationFullName,
            relations: [],
            roles: [],
          };
          addRole(relation, merged);
          return merged;
        };
        return relations.reduce(
          (merged, relation) =>
            relation.relationLevantId in merged
              ? addRole(relation, merged)
              : initializeRelationData(relation, merged),
          {},
        );
      };
      return {
        ...state,
        leadRelationsLoading: false,
        leadRelationsData: mergeRelations(action.payload),
      };
    }

    case LEAD_RELATIONS_FAILURE: {
      return {
        ...state,
        leadRelationsLoading: false,
        leadRelationsData: null,
        leadRelationsError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
