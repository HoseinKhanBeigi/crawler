import {
  CREATE_DOCUMENTS_BY_LEVANT_ID_FAILURE,
  CREATE_DOCUMENTS_BY_LEVANT_ID_REQUEST,
  CREATE_DOCUMENTS_BY_LEVANT_ID_SUCCESS,
  DOCUMENT_TOKEN_BY_LEVANT_ID_FAILURE,
  DOCUMENT_TOKEN_BY_LEVANT_ID_REQUEST,
  DOCUMENT_TOKEN_BY_LEVANT_ID_SUCCESS,
  DOCUMENT_TOKEN_FAILURE,
  DOCUMENT_TOKEN_REQUEST,
  DOCUMENT_TOKEN_SUCCESS,
  GET_DOCUMENT_FILES_FAILURE,
  GET_DOCUMENT_FILES_REQUEST,
  GET_DOCUMENT_FILES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,
  GET_DOCUMENT_TYPES_REQUEST,
  GET_DOCUMENT_TYPES_SUCCESS,
  POST_PRINT_ACTIVITY_FAILURE,
  POST_PRINT_ACTIVITY_REQUEST,
  POST_PRINT_ACTIVITY_SUCCESS,
  POST_UPLOAD_SIGN_DOCUMENT_FAILURE,
  POST_UPLOAD_SIGN_DOCUMENT_REQUEST,
  POST_UPLOAD_SIGN_DOCUMENT_SUCCESS,
} from './documentToken.constants';

const initialValue = {
  postPrintActivityLoading: false,
  postPrintActivityData: null,
  postPrintActivityError: null,
  postUploadSignDocumentLoading: false,
  postUploadSignDocumentData: null,
  postUploadSignDocumentError: null,
  getDocumentFilesLoading: false,
  getDocumentFilesData: null,
  getDocumentFilesError: null,
  getDocumentTypesLoading: false,
  getDocumentTypesData: [],
  getDocumentTypesError: [],
  createDocumentsByLevantIdLoading: false,
  createDocumentsByLevantIdData: null,
  createDocumentsByLevantIdError: null,
  documentTokenByLevantIdLoading: false,
  documentTokenByLevantIdData: null,
  documentTokenByLevantIdError: false,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case DOCUMENT_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case DOCUMENT_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case DOCUMENT_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case DOCUMENT_TOKEN_BY_LEVANT_ID_REQUEST: {
      return {
        ...state,
        documentTokenByLevantIdLoading: true,
      };
    }

    case DOCUMENT_TOKEN_BY_LEVANT_ID_SUCCESS: {
      return {
        ...state,
        documentTokenByLevantIdLoading: false,
        documentTokenByLevantIdData: action.payload,
      };
    }

    case DOCUMENT_TOKEN_BY_LEVANT_ID_FAILURE: {
      return {
        ...state,
        documentTokenByLevantIdLoading: false,
        documentTokenByLevantIdData: null,
        documentTokenByLevantIdError: action.payload,
      };
    }

    case CREATE_DOCUMENTS_BY_LEVANT_ID_REQUEST: {
      return {
        ...state,
        createDocumentsByLevantIdLoading: true,
      };
    }

    case CREATE_DOCUMENTS_BY_LEVANT_ID_SUCCESS: {
      return {
        ...state,
        createDocumentsByLevantIdLoading: false,
        createDocumentsByLevantIdData: action.payload,
      };
    }

    case CREATE_DOCUMENTS_BY_LEVANT_ID_FAILURE: {
      return {
        ...state,
        createDocumentsByLevantIdLoading: false,
        createDocumentsByLevantIdData: null,
        createDocumentsByLevantIdError: action.payload,
      };
    }

    case GET_DOCUMENT_TYPES_REQUEST: {
      return {
        ...state,
        getDocumentTypesLoading: true,
      };
    }

    case GET_DOCUMENT_TYPES_SUCCESS: {
      return {
        ...state,
        getDocumentTypesLoading: false,
        getDocumentTypesData: action.payload,
      };
    }

    case GET_DOCUMENT_TYPES_FAILURE: {
      return {
        ...state,
        getDocumentTypesLoading: false,
        getDocumentTypesData: null,
        getDocumentTypesError: action.payload,
      };
    }

    case GET_DOCUMENT_FILES_REQUEST: {
      return {
        ...state,
        getDocumentFilesLoading: true,
      };
    }

    case GET_DOCUMENT_FILES_SUCCESS: {
      return {
        ...state,
        getDocumentFilesLoading: false,
        getDocumentFilesData: action.payload,
      };
    }

    case GET_DOCUMENT_FILES_FAILURE: {
      return {
        ...state,
        getDocumentFilesLoading: false,
        getDocumentFilesData: null,
        getDocumentFilesError: action.payload,
      };
    }

    case POST_UPLOAD_SIGN_DOCUMENT_REQUEST: {
      return {
        ...state,
        postUploadSignDocumentLoading: true,
      };
    }

    case POST_UPLOAD_SIGN_DOCUMENT_SUCCESS: {
      return {
        ...state,
        postUploadSignDocumentLoading: false,
        postUploadSignDocumentData: action.payload,
      };
    }

    case POST_UPLOAD_SIGN_DOCUMENT_FAILURE: {
      return {
        ...state,
        postUploadSignDocumentLoading: false,
        postUploadSignDocumentData: null,
        postUploadSignDocumentError: action.payload,
      };
    }

    case POST_PRINT_ACTIVITY_REQUEST: {
      return {
        ...state,
        postPrintActivityLoading: true,
      };
    }

    case POST_PRINT_ACTIVITY_SUCCESS: {
      return {
        ...state,
        postPrintActivityLoading: false,
        postPrintActivityData: action.payload,
      };
    }

    case POST_PRINT_ACTIVITY_FAILURE: {
      return {
        ...state,
        postPrintActivityLoading: false,
        postPrintActivityData: null,
        postPrintActivityError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
