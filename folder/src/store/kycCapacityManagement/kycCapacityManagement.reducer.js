import {
  GET_MEETING_SCHEDULE_EXCEL_FAILURE,
  GET_MEETING_SCHEDULE_EXCEL_REQUEST,
  GET_MEETING_SCHEDULE_EXCEL_SUCCESS,
  KYC_CAPACITY_EDIT_FAILURE,
  KYC_CAPACITY_EDIT_REQUEST,
  KYC_CAPACITY_EDIT_SUCCESS,
  KYC_CAPACITY_MANAGEMENT_FAILURE,
  KYC_CAPACITY_MANAGEMENT_REQUEST,
  KYC_CAPACITY_MANAGEMENT_SUCCESS,
  MEETINGS_MANAGEMENT_FAILURE,
  MEETINGS_MANAGEMENT_REQUEST,
  MEETINGS_MANAGEMENT_SUCCESS,
} from './kycCapacityManagement.constants';

const initialValue = {
  getMeetingScheduleExcelLoading: false,
  getMeetingScheduleExcelData: null,
  getMeetingScheduleExcelError: null,
  kycCapacityEditLoading: false,
  kycCapacityEditData: null,
  kycCapacityEditError: null,
  loading: false,
  data: null,
  error: null,
  meetingsManagementLoading: false,
  meetingsManagementData: [],
  meetingsManagementError: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case KYC_CAPACITY_MANAGEMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case KYC_CAPACITY_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case KYC_CAPACITY_MANAGEMENT_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case MEETINGS_MANAGEMENT_REQUEST: {
      return {
        ...state,
        meetingsManagementLoading: true,
      };
    }

    case MEETINGS_MANAGEMENT_SUCCESS: {
      return {
        ...state,
        meetingsManagementLoading: false,
        meetingsManagementData: action.payload,
      };
    }

    case MEETINGS_MANAGEMENT_FAILURE: {
      return {
        ...state,
        meetingsManagementLoading: false,
        meetingsManagementData: null,
        meetingsManagementError: action.payload,
      };
    }

    case KYC_CAPACITY_EDIT_REQUEST: {
      return {
        ...state,
        kycCapacityEditLoading: true,
      };
    }

    case KYC_CAPACITY_EDIT_SUCCESS: {
      return {
        ...state,
        kycCapacityEditLoading: false,
        kycCapacityEditData: action.payload,
      };
    }

    case KYC_CAPACITY_EDIT_FAILURE: {
      return {
        ...state,
        kycCapacityEditLoading: false,
        kycCapacityEditData: null,
        kycCapacityEditError: action.payload,
      };
    }

    case GET_MEETING_SCHEDULE_EXCEL_REQUEST: {
      return {
        ...state,
        getMeetingScheduleExcelLoading: true,
      };
    }

    case GET_MEETING_SCHEDULE_EXCEL_SUCCESS: {
      return {
        ...state,
        getMeetingScheduleExcelLoading: false,
        getMeetingScheduleExcelData: action.payload,
      };
    }

    case GET_MEETING_SCHEDULE_EXCEL_FAILURE: {
      return {
        ...state,
        getMeetingScheduleExcelLoading: false,
        getMeetingScheduleExcelData: null,
        getMeetingScheduleExcelError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
