import * as constants from './opportunities.constants';

const initialValue = {
  getOpportunityByProductCodeLoading: false,
  getOpportunityByProductCodeData: null,
  getOpportunityByProductCodeError: null,
  postConfirmBusinessInfoLoading: false,
  postConfirmBusinessInfoData: null,
  postConfirmBusinessInfoError: null,
  putDoActionForDonyaFundLoading: false,
  putDoActionForDonyaFundData: null,
  putDoActionForDonyaFundError: null,
  getSejamByOpportunityIdLoading: false,
  getSejamByOpportunityIdData: null,
  getSejamByOpportunityIdError: null,
  putRejectSejamCodeLoading: false,
  putRejectSejamCodeData: null,
  putRejectSejamCodeError: null,
  putVerifySejaCodeLoading: false,
  putVerifySejaCodeData: null,
  putVerifySejaCodeError: null,
  putNeedSejamLoading: false,
  putNeedSejamData: null,
  putNeedSejamError: null,
  putDoActionLoading: false,
  putDoActionData: null,
  putDoActionError: null,
  getPrintFormsByFormIdLoading: false,
  getPrintFormsByFormIdData: null,
  getPrintFormsByFormIdError: null,
  getPipelinesLoading: false,
  getPipelinesData: null,
  getPipelinesError: null,
  postConfirmBrokerageLoading: false,
  postConfirmBrokerageData: null,
  postConfirmBrokerageError: null,
  getAddressStringByPostCodeLoading: false,
  getAddressStringByPostCodeData: null,
  getAddressStringByPostCodeError: null,
  postRejectByQcLoading: false,
  postRejectByQcData: null,
  postRejectByQcError: null,
  postConfirmByQcLoading: false,
  postConfirmByQcData: null,
  postConfirmByQcError: null,
  getIdentificationByLevantIdLoading: false,
  getIdentificationByLevantIdData: null,
  getIdentificationByLevantIdError: null,
  getIbanInfoLoading: false,
  getIbanInfoData: null,
  getIbanInfoError: null,
  getOpportunitiesListLoading: false,
  getOpportunitiesListData: null,
  getOpportunitiesListError: null,
  setMeetingTimeLoading: false,
  setMeetingTimeData: null,
  setMeetingTimeError: null,
  accountLocationLoading: false,
  accountLocationData: null,
  accountLocationError: null,
  meetingLocationLoading: false,
  meetingLocationData: null,
  meetingLocationError: null,
  applicationLoading: false,
  applicationData: null,
  applicationError: null,
  currentUser: null,
  availableTimeLoading: false,
  availableTimeData: null,
  availableTimeError: null,
  printFormsLoading: false,
  printFormsData: null,
  printFormsError: null,
  printPasswordLoading: false,
  printPasswordData: null,
  printPasswordError: null,
  // Verify user data modal
  identificationWithDocsLoading: false,
  identificationWithDocsData: null,
  identificationWithDocsError: null,
  identificationWithDocsOpportunityId: null,
  identificationWithDocsIsBusiness: false,
  identificationLoading: false,
  identificationData: null,
  identificationError: null,
  saveIdentificationLoading: false,
  saveIdentificationData: null,
  saveIdentificationError: null,
  // Meeting modal
  checkAppointmentsLoading: false,
  checkAppointmentsData: null,
  checkAppointmentsError: null,
  cancelMeetingLoading: false,
  cancelMeetingData: null,
  cancelMeetingError: null,
  kycDoneLoading: false,
  kycDoneData: null,
  kycDoneError: null,
  approveMeetingLoading: false,
  approveMeetingData: null,
  approveMeetingError: null,
  additionalInfoLoading: false,
  additionalInfoData: null,
  additionalInfoError: null,
  cancelOpportunityLoading: false,
  cancelOpportunityData: null,
  cancelOpportunityError: null,
  pipelineOpportunitiesLoading: false,
  pipelineOpportunitiesData: null,
  pipelineOpportunitiesError: null,
  loading: false,
  data: null,
  error: null,
  levantId: null,
  opportunityId: null,
  loadingOnCard: '',
  // upload documents modal
  anyModalVisible: null,
  isBankInVerificationMode: false,
  bankInfoLoading: false,
  bankInfoData: null,
  bankInfoError: null,
  setBankInfoLoading: false,
  setBankInfoData: null,
  setBankInfoError: null,
  putDoActionByLevantAndCommandLoading: false,
  putDoActionByLevantAndCommandData: null,
  putDoActionByLevantAndCommandError: null,
  getSejamTradingCodeLoading: false,
  getSejamTradingCodeData: {},
  getSejamTradingCodeError: null,
  postTradingInfoLoading: false,
  postTradingInfoData: null,
  postTradingInfoError: null,
  getSejamStatusByOpportunityIdLoading: false,
  getSejamStatusData: null,
  getSejamStatusDataError: null,
  putSejamOtpLoading: false,
  putSejamOtpData: null,
  putSejamOtpDataError: null,
  pipelineOpportunitiesTableParams: null,
  getTradingCodeLoading: false,
  getTradingCodeData: null,
  getTradingCodeDataError: null,
  getSetMeetingAddressLoading: false,
  getSetMeetingAddressData: null,
  getSetMeetingAddressError: null,
  visibleEmptyPipelines: true,
  verifyModalType: {},
  sorting: {
    sortDirection: null,
    sortField: null,
  },
  filterBy: 'all',
  draggingOpportunity: null,
  postModifyBankAccountNumberLoading: false,
  postModifyBankAccountNumberData: null,
  postModifyBankAccountNumberError: null,
  returnIdentification: null,
};
export default function reducer(state = initialValue, action = {}) {
  switch (action.type) {
    case constants.OPPORTUNITY_CARD_LOADING_START: {
      return {
        ...state,
        loadingOnCard: action.payload,
      };
    }

    case constants.OPPORTUNITY_CARD_LOADING_STOP: {
      return {
        ...state,
        loadingOnCard: '',
      };
    }

    case constants.SET_VERIFY_MODAL_TYPE: {
      return {
        ...state,
        verifyModalType: action.payload,
      };
    }

    case constants.SET_CURRENT_USER_OPPORTUNITY: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case constants.OPPORTUNITIES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.ANY_MODAL_OPEN: {
      return {
        ...state,
        anyModalVisible: action.payload,
      };
    }

    case constants.ANY_MODAL_CLOSE: {
      return {
        ...state,
        anyModalVisible: null,
      };
    }

    case constants.OPPORTUNITIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case constants.OPPORTUNITIES_FAILURE: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    }

    case constants.PIPELINE_OPPORTUNITIES_TABLE_UNSET_PARAMS: {
      return {
        ...state,
        pipelineOpportunitiesTableParams: null,
      };
    }

    case constants.PIPELINE_OPPORTUNITIES_REQUEST: {
      return {
        ...state,
        pipelineOpportunitiesLoading: true,
        pipelineOpportunitiesTableParams: action.payload,
      };
    }

    case constants.PIPELINE_OPPORTUNITIES_SUCCESS: {
      return {
        ...state,
        pipelineOpportunitiesLoading: false,
        pipelineOpportunitiesData: action.payload,
      };
    }

    case constants.PIPELINE_OPPORTUNITIES_FAILURE: {
      return {
        ...state,
        pipelineOpportunitiesLoading: false,
        pipelineOpportunitiesData: null,
        pipelineOpportunitiesError: action.payload,
      };
    }

    case constants.CANCEL_OPPORTUNITY_REQUEST: {
      return {
        ...state,
        cancelOpportunityLoading: true,
      };
    }

    case constants.TOGGLE_SHOW_EMPTY_PIPELINES: {
      return {
        ...state,
        visibleEmptyPipelines: action.payload,
      };
    }

    case constants.CANCEL_OPPORTUNITY_SUCCESS: {
      return {
        ...state,
        cancelOpportunityLoading: false,
        cancelOpportunityData: action.payload,
      };
    }

    case constants.CANCEL_OPPORTUNITY_FAILURE: {
      return {
        ...state,
        cancelOpportunityLoading: false,
        cancelOpportunityData: null,
        cancelOpportunityError: action.payload,
      };
    }

    case constants.ADDITIONAL_INFO_REQUEST: {
      return {
        ...state,
        additionalInfoLoading: true,
      };
    }

    case constants.ADDITIONAL_INFO_SUCCESS: {
      return {
        ...state,
        additionalInfoLoading: false,
        additionalInfoData: action.payload,
      };
    }

    case constants.ADDITIONAL_INFO_FAILURE: {
      return {
        ...state,
        additionalInfoLoading: false,
        additionalInfoData: null,
        additionalInfoError: action.payload,
      };
    }

    case constants.APPROVE_MEETING_REQUEST: {
      return {
        ...state,
        approveMeetingLoading: true,
      };
    }

    case constants.APPROVE_MEETING_SUCCESS: {
      return {
        ...state,
        approveMeetingLoading: false,
        approveMeetingData: action.payload,
      };
    }

    case constants.APPROVE_MEETING_FAILURE: {
      return {
        ...state,
        approveMeetingLoading: false,
        approveMeetingData: null,
        approveMeetingError: action.payload,
      };
    }

    case constants.KYC_DONE_REQUEST: {
      return {
        ...state,
        kycDoneLoading: true,
      };
    }

    case constants.KYC_DONE_SUCCESS: {
      return {
        ...state,
        kycDoneLoading: false,
        kycDoneData: action.payload,
      };
    }

    case constants.KYC_DONE_FAILURE: {
      return {
        ...state,
        kycDoneLoading: false,
        kycDoneData: null,
        kycDoneError: action.payload,
      };
    }

    case constants.CANCEL_MEETING_REQUEST: {
      return {
        ...state,
        cancelMeetingLoading: true,
      };
    }

    case constants.CANCEL_MEETING_SUCCESS: {
      return {
        ...state,
        cancelMeetingLoading: false,
        cancelMeetingData: action.payload,
      };
    }

    case constants.CANCEL_MEETING_FAILURE: {
      return {
        ...state,
        cancelMeetingLoading: false,
        cancelMeetingData: null,
        cancelMeetingError: action.payload,
      };
    }

    case constants.CHECK_APPOINTMENTS_REQUEST: {
      return {
        ...state,
        checkAppointmentsLoading: true,
      };
    }

    case constants.CHECK_APPOINTMENTS_SUCCESS: {
      return {
        ...state,
        checkAppointmentsLoading: false,
        checkAppointmentsData: action.payload,
      };
    }

    case constants.CHECK_APPOINTMENTS_FAILURE: {
      return {
        ...state,
        checkAppointmentsLoading: false,
        checkAppointmentsData: null,
        checkAppointmentsError: action.payload,
      };
    }

    case constants.SAVE_IDENTIFICATION_REQUEST: {
      return {
        ...state,
        saveIdentificationLoading: true,
      };
    }

    case constants.SAVE_IDENTIFICATION_SUCCESS: {
      return {
        ...state,
        saveIdentificationLoading: false,
        saveIdentificationData: action.payload,
      };
    }

    case constants.SAVE_IDENTIFICATION_FAILURE: {
      return {
        ...state,
        saveIdentificationLoading: false,
        saveIdentificationData: null,
        saveIdentificationError: action.payload,
      };
    }

    case constants.IDENTIFICATION_REQUEST: {
      return {
        ...state,
        identificationLoading: true,
      };
    }

    case constants.IDENTIFICATION_SUCCESS: {
      return {
        ...state,
        identificationLoading: false,
        identificationData: action.payload,
      };
    }

    case constants.IDENTIFICATION_FAILURE: {
      return {
        ...state,
        identificationLoading: false,
        identificationData: null,
        identificationError: action.payload,
      };
    }

    case constants.IDENTIFICATION_WITH_DOCS_REQUEST: {
      return {
        ...state,
        identificationWithDocsLoading: true,
      };
    }

    case constants.IDENTIFICATION_WITH_DOCS_SUCCESS: {
      return {
        ...state,
        identificationWithDocsLoading: false,
        identificationWithDocsData: action.payload.data,
        identificationWithDocsOpportunityId: action.payload.opportunityId,
      };
    }

    case constants.IDENTIFICATION_WITH_DOCS_FAILURE: {
      return {
        ...state,
        identificationWithDocsLoading: false,
        identificationWithDocsData: null,
        identificationWithDocsError: action.payload,
        identificationWithDocsOpportunityId: null,
      };
    }

    case constants.PRINT_FORMS_REQUEST: {
      return {
        ...state,
        printFormsLoading: true,
      };
    }

    case constants.PRINT_FORMS_SUCCESS: {
      return {
        ...state,
        printFormsLoading: false,
        printFormsData: action.payload,
      };
    }

    case constants.PRINT_FORMS_FAILURE: {
      return {
        ...state,
        printFormsLoading: false,
        printFormsData: null,
        printFormsError: action.payload,
      };
    }

    case constants.AVAILABLE_TIME_REQUEST: {
      return {
        ...state,
        availableTimeLoading: true,
      };
    }

    case constants.AVAILABLE_TIME_SUCCESS: {
      return {
        ...state,
        availableTimeLoading: false,
        availableTimeData: action.payload,
      };
    }

    case constants.AVAILABLE_TIME_FAILURE: {
      return {
        ...state,
        availableTimeLoading: false,
        availableTimeData: null,
        availableTimeError: action.payload,
      };
    }

    case constants.APPLICATION_REQUEST: {
      return {
        ...state,
        applicationLoading: true,
      };
    }

    case constants.APPLICATION_SUCCESS: {
      return {
        ...state,
        applicationLoading: false,
        applicationData: action.payload,
      };
    }

    case constants.APPLICATION_FAILURE: {
      return {
        ...state,
        applicationLoading: false,
        applicationData: null,
        applicationError: action.payload,
      };
    }

    case constants.MEETING_LOCATION_REQUEST: {
      return {
        ...state,
        meetingLocationLoading: true,
      };
    }

    case constants.MEETING_LOCATION_SUCCESS: {
      return {
        ...state,
        meetingLocationLoading: false,
        meetingLocationData: action.payload,
      };
    }

    case constants.MEETING_LOCATION_FAILURE: {
      return {
        ...state,
        meetingLocationLoading: false,
        meetingLocationData: null,
        meetingLocationError: action.payload,
      };
    }

    case constants.ACCOUNT_LOCATION_REQUEST: {
      return {
        ...state,
        accountLocationLoading: true,
      };
    }

    case constants.ACCOUNT_LOCATION_SUCCESS: {
      return {
        ...state,
        accountLocationLoading: false,
        accountLocationData: action.payload,
      };
    }

    case constants.ACCOUNT_LOCATION_FAILURE: {
      return {
        ...state,
        accountLocationLoading: false,
        accountLocationData: null,
        accountLocationError: action.payload,
      };
    }

    case constants.SET_MEETING_TIME_REQUEST: {
      return {
        ...state,
        setMeetingTimeLoading: true,
      };
    }

    case constants.SET_MEETING_TIME_SUCCESS: {
      return {
        ...state,
        setMeetingTimeLoading: false,
        setMeetingTimeData: action.payload,
      };
    }

    case constants.SET_MEETING_TIME_FAILURE: {
      return {
        ...state,
        setMeetingTimeLoading: false,
        setMeetingTimeData: null,
        setMeetingTimeError: action.payload,
      };
    }

    case constants.IS_BANK_VERIFICATION_MODE: {
      return {
        ...state,
        isBankInVerificationMode: action.payload,
      };
    }

    case constants.BANK_INFO_REQUEST: {
      return {
        ...state,
        bankInfoLoading: true,
      };
    }

    case constants.BANK_INFO_SUCCESS: {
      return {
        ...state,
        bankInfoLoading: false,
        bankInfoData: action.payload,
      };
    }

    case constants.BANK_INFO_FAILURE: {
      return {
        ...state,
        bankInfoLoading: false,
        bankInfoData: null,
        bankInfoError: action.payload,
      };
    }

    case constants.SET_BANK_INFO_REQUEST: {
      return {
        ...state,
        setBankInfoLoading: true,
      };
    }

    case constants.SET_BANK_INFO_SUCCESS: {
      return {
        ...state,
        setBankInfoLoading: false,
        setBankInfoData: action.payload,
      };
    }

    case constants.SET_BANK_INFO_FAILURE: {
      return {
        ...state,
        setBankInfoLoading: false,
        setBankInfoData: null,
        setBankInfoError: action.payload,
      };
    }

    case constants.GET_IBAN_INFO_REQUEST: {
      return {
        ...state,
        getIbanInfoLoading: true,
      };
    }

    case constants.GET_IBAN_INFO_SUCCESS: {
      return {
        ...state,
        getIbanInfoLoading: false,
        getIbanInfoError: null,
        getIbanInfoData: action.payload,
      };
    }

    case constants.GET_IBAN_INFO_FAILURE: {
      return {
        ...state,
        getIbanInfoLoading: false,
        getIbanInfoData: null,
        getIbanInfoError: action.payload,
      };
    }

    case constants.GET_OPPORTUNITIES_LIST_REQUEST: {
      return {
        ...state,
        getOpportunitiesListLoading: true,
      };
    }

    case constants.GET_OPPORTUNITIES_LIST_SUCCESS: {
      return {
        ...state,
        getOpportunitiesListLoading: false,
        getOpportunitiesListData: action.payload,
      };
    }

    case constants.GET_OPPORTUNITIES_LIST_FAILURE: {
      return {
        ...state,
        getOpportunitiesListLoading: false,
        getOpportunitiesListData: null,
        getOpportunitiesListError: action.payload,
      };
    }

    case constants.GET_IDENTIFICATION_BY_LEVANT_ID_REQUEST: {
      return {
        ...state,
        getIdentificationByLevantIdLoading: true,
      };
    }

    case constants.GET_IDENTIFICATION_BY_LEVANT_ID_SUCCESS: {
      return {
        ...state,
        getIdentificationByLevantIdLoading: false,
        getIdentificationByLevantIdData: action.payload,
      };
    }

    case constants.GET_IDENTIFICATION_BY_LEVANT_ID_FAILURE: {
      return {
        ...state,
        getIdentificationByLevantIdLoading: false,
        getIdentificationByLevantIdData: null,
        getIdentificationByLevantIdError: action.payload,
      };
    }

    case constants.POST_CONFIRM_BY_QC_REQUEST: {
      return {
        ...state,
        postConfirmByQcLoading: true,
      };
    }

    case constants.POST_CONFIRM_BY_QC_SUCCESS: {
      return {
        ...state,
        postConfirmByQcLoading: false,
        postConfirmByQcData: action.payload,
      };
    }

    case constants.POST_CONFIRM_BY_QC_FAILURE: {
      return {
        ...state,
        postConfirmByQcLoading: false,
        postConfirmByQcData: null,
        postConfirmByQcError: action.payload,
      };
    }

    case constants.POST_REJECT_BY_QC_REQUEST: {
      return {
        ...state,
        postRejectByQcLoading: true,
      };
    }

    case constants.POST_REJECT_BY_QC_SUCCESS: {
      return {
        ...state,
        postRejectByQcLoading: false,
        postRejectByQcData: action.payload,
      };
    }

    case constants.POST_REJECT_BY_QC_FAILURE: {
      return {
        ...state,
        postRejectByQcLoading: false,
        postRejectByQcData: null,
        postRejectByQcError: action.payload,
      };
    }

    case constants.GET_ADDRESS_STRING_BY_POST_CODE_REQUEST: {
      return {
        ...state,
        getAddressStringByPostCodeLoading: true,
      };
    }

    case constants.GET_ADDRESS_STRING_BY_POST_CODE_SUCCESS: {
      return {
        ...state,
        getAddressStringByPostCodeLoading: false,
        getAddressStringByPostCodeData: action.payload,
      };
    }

    case constants.GET_ADDRESS_STRING_BY_POST_CODE_FAILURE: {
      return {
        ...state,
        getAddressStringByPostCodeLoading: false,
        getAddressStringByPostCodeData: null,
        getAddressStringByPostCodeError: action.payload,
      };
    }

    case constants.POST_CONFIRM_BROKERAGE_REQUEST: {
      return {
        ...state,
        postConfirmBrokerageLoading: true,
      };
    }

    case constants.POST_CONFIRM_BROKERAGE_SUCCESS: {
      return {
        ...state,
        postConfirmBrokerageLoading: false,
        postConfirmBrokerageData: action.payload,
      };
    }

    case constants.POST_CONFIRM_BROKERAGE_FAILURE: {
      return {
        ...state,
        postConfirmBrokerageLoading: false,
        postConfirmBrokerageData: null,
        postConfirmBrokerageError: action.payload,
      };
    }

    case constants.GET_PIPELINES_REQUEST: {
      return {
        ...state,
        getPipelinesLoading: true,
      };
    }

    case constants.GET_PIPELINES_SUCCESS: {
      return {
        ...state,
        getPipelinesLoading: false,
        getPipelinesData: action.payload,
      };
    }

    case constants.GET_PIPELINES_FAILURE: {
      return {
        ...state,
        getPipelinesLoading: false,
        getPipelinesData: null,
        getPipelinesError: action.payload,
      };
    }

    case constants.GET_PRINT_FORMS_BY_FORM_ID_REQUEST: {
      return {
        ...state,
        getPrintFormsByFormIdLoading: true,
      };
    }

    case constants.GET_PRINT_FORMS_BY_FORM_ID_SUCCESS: {
      return {
        ...state,
        getPrintFormsByFormIdLoading: false,
        getPrintFormsByFormIdData: action.payload,
      };
    }

    case constants.GET_PRINT_FORMS_BY_FORM_ID_FAILURE: {
      return {
        ...state,
        getPrintFormsByFormIdLoading: false,
        getPrintFormsByFormIdData: null,
        getPrintFormsByFormIdError: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_REQUEST: {
      return {
        ...state,
        putDoActionLoading: true,
      };
    }

    case constants.PUT_DO_ACTION_SUCCESS: {
      return {
        ...state,
        putDoActionLoading: false,
        putDoActionData: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_FAILURE: {
      return {
        ...state,
        putDoActionLoading: false,
        putDoActionData: null,
        putDoActionError: action.payload,
      };
    }

    case constants.PUT_NEED_SEJAM_REQUEST: {
      return {
        ...state,
        putNeedSejamLoading: true,
      };
    }

    case constants.PUT_NEED_SEJAM_SUCCESS: {
      return {
        ...state,
        putNeedSejamLoading: false,
        putNeedSejamData: action.payload,
      };
    }

    case constants.PUT_NEED_SEJAM_FAILURE: {
      return {
        ...state,
        putNeedSejamLoading: false,
        putNeedSejamData: null,
        putNeedSejamError: action.payload,
      };
    }

    case constants.PUT_VERIFY_SEJAM_CODE_REQUEST: {
      return {
        ...state,
        putVerifySejamCodeLoading: true,
      };
    }

    case constants.PUT_VERIFY_SEJAM_CODE_SUCCESS: {
      return {
        ...state,
        putVerifySejamCodeLoading: false,
        putVerifySejamCodeData: action.payload,
      };
    }

    case constants.PUT_VERIFY_SEJAM_CODE_FAILURE: {
      return {
        ...state,
        putVerifySejamCodeLoading: false,
        putVerifySejamCodeData: null,
        putVerifySejamCodeError: action.payload,
      };
    }

    case constants.PUT_REJECT_SEJAM_CODE_REQUEST: {
      return {
        ...state,
        putRejectSejamCodeLoading: true,
      };
    }

    case constants.PUT_REJECT_SEJAM_CODE_SUCCESS: {
      return {
        ...state,
        putRejectSejamCodeLoading: false,
        putRejectSejamCodeData: action.payload,
      };
    }

    case constants.PUT_REJECT_SEJAM_CODE_FAILURE: {
      return {
        ...state,
        putRejectSejamCodeLoading: false,
        putRejectSejamCodeData: null,
        putRejectSejamCodeError: action.payload,
      };
    }

    case constants.GET_SEJAM_BY_OPPORTUNITY_ID_REQUEST: {
      return {
        ...state,
        getSejamByOpportunityIdLoading: true,
      };
    }

    case constants.GET_SEJAM_BY_OPPORTUNITY_ID_SUCCESS: {
      return {
        ...state,
        getSejamByOpportunityIdLoading: false,
        getSejamByOpportunityIdData: action.payload,
      };
    }

    case constants.GET_SEJAM_BY_OPPORTUNITY_ID_FAILURE: {
      return {
        ...state,
        getSejamByOpportunityIdLoading: false,
        getSejamByOpportunityIdData: null,
        getSejamByOpportunityIdError: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_FOR_DONYA_FUND_REQUEST: {
      return {
        ...state,
        putDoActionForDonyaFundLoading: true,
      };
    }

    case constants.PUT_DO_ACTION_FOR_DONYA_FUND_SUCCESS: {
      return {
        ...state,
        putDoActionForDonyaFundLoading: false,
        putDoActionForDonyaFundData: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_FOR_DONYA_FUND_FAILURE: {
      return {
        ...state,
        putDoActionForDonyaFundLoading: false,
        putDoActionForDonyaFundData: null,
        putDoActionForDonyaFundError: action.payload,
      };
    }

    case constants.POST_CONFIRM_BUSINESS_INFO_REQUEST: {
      return {
        ...state,
        postConfirmBusinessInfoLoading: true,
      };
    }

    case constants.POST_CONFIRM_BUSINESS_INFO_SUCCESS: {
      return {
        ...state,
        postConfirmBusinessInfoLoading: false,
        postConfirmBusinessInfoData: action.payload,
      };
    }

    case constants.POST_CONFIRM_BUSINESS_INFO_FAILURE: {
      return {
        ...state,
        postConfirmBusinessInfoLoading: false,
        postConfirmBusinessInfoData: null,
        postConfirmBusinessInfoError: action.payload,
      };
    }

    case constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_REQUEST: {
      return {
        ...state,
        getOpportunityByProductCodeLoading: true,
      };
    }

    case constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_SUCCESS: {
      return {
        ...state,
        getOpportunityByProductCodeLoading: false,
        getOpportunityByProductCodeData: action.payload,
      };
    }

    case constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_FAILURE: {
      return {
        ...state,
        getOpportunityByProductCodeLoading: false,
        getOpportunityByProductCodeData: null,
        getOpportunityByProductCodeError: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_BY_LEVANT_AND_COMMAND_REQUEST: {
      return {
        ...state,
        putDoActionByLevantAndCommandLoading: true,
      };
    }

    case constants.PUT_DO_ACTION_BY_LEVANT_AND_COMMAND_SUCCESS: {
      return {
        ...state,
        putDoActionByLevantAndCommandLoading: false,
        putDoActionByLevantAndCommandData: action.payload,
      };
    }

    case constants.PUT_DO_ACTION_BY_LEVANT_AND_COMMAND_FAILURE: {
      return {
        ...state,
        putDoActionByLevantAndCommandLoading: false,
        putDoActionByLevantAndCommandData: null,
        putDoActionByLevantAndCommandError: action.payload,
      };
    }

    case constants.GET_SEJAM_TRADING_CODE_REQUEST: {
      return {
        ...state,
        getSejamTradingCodeLoading: true,
      };
    }

    case constants.GET_SEJAM_TRADING_CODE_SUCCESS: {
      return {
        ...state,
        getSejamTradingCodeLoading: false,
        getSejamTradingCodeData: action.payload,
      };
    }

    case constants.GET_SEJAM_TRADING_CODE_FAILURE: {
      return {
        ...state,
        getSejamTradingCodeLoading: false,
        getSejamTradingCodeData: null,
        getSejamTradingCodeError: action.payload,
      };
    }

    case constants.POST_TRADING_INFO_REQUEST: {
      return {
        ...state,
        postTradingInfoLoading: true,
      };
    }

    case constants.POST_TRADING_INFO_SUCCESS: {
      return {
        ...state,
        postTradingInfoLoading: false,
        postTradingInfoData: action.payload,
      };
    }

    case constants.POST_TRADING_INFO_FAILURE: {
      return {
        ...state,
        postTradingInfoLoading: false,
        postTradingInfoData: null,
        postTradingInfoError: action.payload,
      };
    }

    case constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_REQUEST: {
      return {
        ...state,
        getSejamStatusByOpportunityIdLoading: true,
      };
    }

    case constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_SUCCESS: {
      return {
        ...state,
        getSejamStatusByOpportunityIdLoading: false,
        getSejamStatusData: action.payload,
      };
    }

    case constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_FAILURE: {
      return {
        ...state,
        getSejamStatusByOpportunityIdLoading: false,
        getSejamStatusData: null,
        getSejamStatusDataError: action.payload,
      };
    }

    case constants.PUT_SEJAM_OTP_REQUEST: {
      return {
        ...state,
        putSejamOtpLoading: true,
      };
    }

    case constants.PUT_SEJAM_OTP_SUCCESS: {
      return {
        ...state,
        putSejamOtpLoading: false,
        putSejamOtpData: action.payload,
      };
    }

    case constants.PUT_SEJAM_OTP_FAILURE: {
      return {
        ...state,
        putSejamOtpLoading: false,
        putSejamOtpData: null,
        putSejamOtpDataError: action.payload,
      };
    }

    case constants.GET_TRADING_CODE_REQUEST: {
      return {
        ...state,
        getTradingCodeLoading: true,
      };
    }

    case constants.GET_TRADING_CODE_SUCCESS: {
      return {
        ...state,
        getTradingCodeLoading: false,
        getTradingCodeData: action.payload,
      };
    }

    case constants.GET_TRADING_CODE_FAILURE: {
      return {
        ...state,
        getTradingCodeLoading: false,
        getTradingCodeData: null,
        getTradingCodeDataError: action.payload,
      };
    }

    case constants.SET_OPPORTUNITIES_SORTING: {
      return {
        ...state,
        sorting: action.payload,
      };
    }

    case constants.SET_OPPORTUNITIES_FILTERING: {
      return {
        ...state,
        filterBy: action.payload,
      };
    }

    case constants.GET_ADDRESS_FOR_SET_MEETING_REQUEST: {
      return {
        ...state,
        getSetMeetingAddressLoading: true,
      };
    }

    case constants.GET_ADDRESS_FOR_SET_MEETING_SUCCESS: {
      return {
        ...state,
        getSetMeetingAddressLoading: false,
        getSetMeetingAddressData: action.payload,
      };
    }

    case constants.GET_ADDRESS_FOR_SET_MEETING_FAILURE: {
      return {
        ...state,
        getSetMeetingAddressLoading: false,
        getSetMeetingAddressData: null,
        getSetMeetingAddressError: action.payload,
      };
    }

    case constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_REQUEST: {
      return {
        ...state,
        postModifyBankAccountNumberLoading: true,
      };
    }

    case constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_SUCCESS: {
      return {
        ...state,
        postModifyBankAccountNumberLoading: false,
        postModifyBankAccountNumberData: action.payload,
      };
    }

    case constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_FAILURE: {
      return {
        ...state,
        postModifyBankAccountNumberLoading: false,
        postModifyBankAccountNumberData: null,
        postModifyBankAccountNumberError: action.payload,
      };
    }
    case constants.SET_RETURN_IDENTIFICATION: {
      return {
        ...state,
        returnIdentification: {
          ...action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
}
