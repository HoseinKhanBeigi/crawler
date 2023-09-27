import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import * as constants from './opportunities.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import {
  OPPORTUNITIES_PIPELINE_TABLE,
  OPPORTUNITIES_TABLE,
} from '../settings/settings.constants';

export function opportunityCardLoadingStart(data) {
  return {
    type: constants.OPPORTUNITY_CARD_LOADING_START,
    payload: data,
  };
}

export function opportunityCardLoadingStop(data) {
  return {
    type: constants.OPPORTUNITY_CARD_LOADING_STOP,
    payload: data,
  };
}

// keep current user data object. current user is who you click on it's action in opportunity page
export function setCurrentUser(data) {
  return {
    type: constants.SET_CURRENT_USER_OPPORTUNITY,
    payload: data,
  };
}

export function pipelineOpportunitiesRequest(params) {
  return {
    type: constants.PIPELINE_OPPORTUNITIES_REQUEST,
    payload: params,
  };
}

export function pipelineOpportunitiesSuccess(data) {
  return {
    type: constants.PIPELINE_OPPORTUNITIES_SUCCESS,
    payload: data,
  };
}

export function pipelineOpportunitiesFailure(error) {
  return {
    type: constants.PIPELINE_OPPORTUNITIES_FAILURE,
    payload: error,
  };
}

export function unsetPipelineOpportunitiesTableParams() {
  return dispatch => {
    dispatch({
      type: constants.PIPELINE_OPPORTUNITIES_TABLE_UNSET_PARAMS,
    });
  };
}

export function getPipelineOpportunitiesAction(params) {
  return (dispatch, getState, { getPipelineOpportunitiesRequest }) => {
    dispatch(pipelineOpportunitiesRequest(params));
    return getPipelineOpportunitiesRequest(params).then(data => {
      if (data.err) {
        dispatch(pipelineOpportunitiesFailure(data));
        return false;
      }
      dispatch(pipelineOpportunitiesSuccess(data.resp));
      return data.resp;
    });
  };
}

export function opportunitiesRequest() {
  return {
    type: constants.OPPORTUNITIES_REQUEST,
  };
}

export function opportunitiesSuccess(data) {
  return {
    type: constants.OPPORTUNITIES_SUCCESS,
    payload: data,
  };
}

export function opportunitiesFailuer(error) {
  return {
    type: constants.OPPORTUNITIES_FAILURE,
    payload: error,
  };
}

export function getOpportunitiesAction() {
  return (dispatch, getState, { getOpportunitiesRequest }) => {
    const state = getState();
    const productCode = state?.getProducts?.selected;
    const userId = state?.neshanAuth?.jwt?.uuid;
    const { sorting, filterBy } = state.opportunities;

    // Refresh opportunities table in pipeline view
    kianTableApi(OPPORTUNITIES_PIPELINE_TABLE).refreshTable();
    kianTableApi(OPPORTUNITIES_TABLE).refreshTable();

    dispatch(opportunitiesRequest());
    return getOpportunitiesRequest({
      productCode,
      sorting,
      filterBy,
      userId,
    }).then(data => {
      if (data.err) {
        dispatch(opportunitiesFailuer(data));
        return false;
      }
      dispatch(opportunitiesSuccess(data.resp));
      return data.resp;
    });
  };
}

export function cancelOpportunityRequest() {
  return {
    type: constants.CANCEL_OPPORTUNITY_REQUEST,
  };
}

export function cancelOpportunitySuccess(data) {
  return {
    type: constants.CANCEL_OPPORTUNITY_SUCCESS,
    payload: data,
  };
}

export function cancelOpportunityFailure(error) {
  return {
    type: constants.CANCEL_OPPORTUNITY_FAILURE,
    payload: error,
  };
}

export function putCancelOpportunityAction(body, params) {
  return (dispatch, getState, { putCancelOpportunityRequest }) => {
    dispatch(cancelOpportunityRequest());
    return putCancelOpportunityRequest(body, params).then(data => {
      if (data.err) {
        dispatch(cancelOpportunityFailure(data));
        return false;
      }
      dispatch(cancelOpportunitySuccess(data.resp));
      return data.resp;
    });
  };
}

export function additionalInfoRequest() {
  return {
    type: constants.ADDITIONAL_INFO_REQUEST,
  };
}

export function additionalInfoSuccess(data) {
  return {
    type: constants.ADDITIONAL_INFO_SUCCESS,
    payload: data,
  };
}

export function additionalInfoFailure(error) {
  return {
    type: constants.ADDITIONAL_INFO_FAILURE,
    payload: error,
  };
}

export function putAdditionalInfoAction(params, id, type) {
  return (dispatch, getState, { putAdditionalInfoRequest }) => {
    dispatch(additionalInfoRequest());

    const isBusiness = getState().opportunities
      .identificationWithDocsIsBusiness;

    return putAdditionalInfoRequest(params, isBusiness, id, type).then(data => {
      if (data.err) {
        dispatch(additionalInfoFailure(data));
        return false;
      }
      dispatch(additionalInfoSuccess(data.resp));
      return data.resp;
    });
  };
}

export function putAdditionalBusinessPersonalInfoAction(params, opportunityId) {
  return (dispatch, getState, { putAdditionalBusinessPersonalInfoRequest }) =>
    putAdditionalBusinessPersonalInfoRequest(params, opportunityId);
}

export function putAdditionalBusinessInfoAction(params, opportunityId) {
  return (dispatch, getState, { putAdditionalBusinessInfoRequest }) =>
    putAdditionalBusinessInfoRequest(params, opportunityId);
}

export function approveMeetingRequest() {
  return {
    type: constants.APPROVE_MEETING_REQUEST,
  };
}

export function approveMeetingSuccess(data) {
  return {
    type: constants.APPROVE_MEETING_SUCCESS,
    payload: data,
  };
}

export function approveMeetingFailure(error) {
  return {
    type: constants.APPROVE_MEETING_FAILURE,
    payload: error,
  };
}

export function putApproveMeetingAction(body, params) {
  return (dispatch, getState, { putApproveMeetingRequest }) => {
    dispatch(approveMeetingRequest());
    return putApproveMeetingRequest(body, params).then(data => {
      if (data.err) {
        dispatch(approveMeetingFailure(data));
        return false;
      }
      dispatch(approveMeetingSuccess(data.resp));
      return data.resp;
    });
  };
}

export function kycDoneRequest() {
  return {
    type: constants.KYC_DONE_REQUEST,
  };
}

export function kycDoneSuccess(data) {
  return {
    type: constants.KYC_DONE_SUCCESS,
    payload: data,
  };
}

export function kycDoneFailure(error) {
  return {
    type: constants.KYC_DONE_FAILURE,
    payload: error,
  };
}

export function putKycDoneAction(body, params) {
  return (dispatch, getState, { putKycDoneRequest }) => {
    dispatch(kycDoneRequest());
    return putKycDoneRequest(body, params).then(data => {
      if (data.err) {
        dispatch(kycDoneFailure(data));
        return false;
      }
      dispatch(kycDoneSuccess(data.resp));
      return data.resp;
    });
  };
}

export function cancelMeetingRequest() {
  return {
    type: constants.CANCEL_MEETING_REQUEST,
  };
}

export function cancelMeetingSuccess(data) {
  return {
    type: constants.CANCEL_MEETING_SUCCESS,
    payload: data,
  };
}

export function cancelMeetingFailure(error) {
  return {
    type: constants.CANCEL_MEETING_FAILURE,
    payload: error,
  };
}

export function putCancelMeetingAction(body, params) {
  return (dispatch, getState, { putCancelMeetingRequest }) => {
    dispatch(cancelMeetingRequest());
    return putCancelMeetingRequest(body, params).then(data => {
      if (data.err) {
        dispatch(cancelMeetingFailure(data));
        return false;
      }
      dispatch(cancelMeetingSuccess(data.resp));
      return data.resp;
    });
  };
}

/**
 * generally, set any modal open or close.
 * @param data (string) modal's name.
 */
export function anyModalOpen(data) {
  return {
    type: constants.ANY_MODAL_OPEN,
    payload: data,
  };
}

export function anyModalClose() {
  return {
    type: constants.ANY_MODAL_CLOSE,
  };
}

export function checkAppointmentsRequest() {
  return {
    type: constants.CHECK_APPOINTMENTS_REQUEST,
  };
}

export function checkAppointmentsSuccess(data) {
  return {
    type: constants.CHECK_APPOINTMENTS_SUCCESS,
    payload: data,
  };
}

export function checkAppointmentsFailure(error) {
  return {
    type: constants.CHECK_APPOINTMENTS_FAILURE,
    payload: error,
  };
}

export function checkAppointmentsCloseModal() {
  return dispatch => {
    dispatch({
      type: constants.CHECK_APPOINTMENTS_MODAL_CLOSE,
    });
  };
}

export function getCheckAppointmentsAction(params) {
  return (dispatch, getState, { getCheckAppointmentsRequest }) => {
    dispatch(checkAppointmentsRequest());
    return getCheckAppointmentsRequest(params).then(data => {
      if (data.err) {
        dispatch(checkAppointmentsFailure(data));
        return false;
      }
      dispatch(checkAppointmentsSuccess(data.resp));
      return data.resp;
    });
  };
}

export function saveIdentificationRequest() {
  return {
    type: constants.SAVE_IDENTIFICATION_REQUEST,
  };
}

export function saveIdentificationSuccess(data) {
  return {
    type: constants.SAVE_IDENTIFICATION_SUCCESS,
    payload: data,
  };
}

export function saveIdentificationFailure(error) {
  return {
    type: constants.SAVE_IDENTIFICATION_FAILURE,
    payload: error,
  };
}

export function putSaveIdentificationAction(body, params) {
  return (dispatch, getState, { putSaveIdentificationRequest }) => {
    const isBusiness =
      resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'KIAN_BUSINESS';
    dispatch(saveIdentificationRequest());
    return putSaveIdentificationRequest(body, params, isBusiness).then(data => {
      if (data.err) {
        dispatch(saveIdentificationFailure(data));
        return false;
      }
      dispatch(saveIdentificationSuccess(data.resp));
      return data.resp;
    });
  };
}

export function identificationRequest() {
  return {
    type: constants.IDENTIFICATION_REQUEST,
  };
}

export function identificationSuccess(data) {
  return {
    type: constants.IDENTIFICATION_SUCCESS,
    payload: data,
  };
}

export function identificationFailure(error) {
  return {
    type: constants.IDENTIFICATION_FAILURE,
    payload: error,
  };
}

export function getIdentificationAction(params) {
  return (dispatch, getState, { getIdentificationRequest }) => {
    dispatch(identificationRequest());
    return getIdentificationRequest(params).then(data => {
      if (data.err) {
        dispatch(identificationFailure(data));
        return false;
      }
      dispatch(identificationSuccess(data.resp));
      return data.resp;
    });
  };
}

export function identificationWithDocsRequest() {
  return {
    type: constants.IDENTIFICATION_WITH_DOCS_REQUEST,
  };
}

export function identificationWithDocsSuccess(data, opportunityId) {
  return {
    type: constants.IDENTIFICATION_WITH_DOCS_SUCCESS,
    payload: { data, opportunityId },
  };
}

export function identificationWithDocsFailure(error) {
  return {
    type: constants.IDENTIFICATION_WITH_DOCS_FAILURE,
    payload: error,
  };
}

export function identificationWithDocsCloseModal() {
  return dispatch => {
    dispatch({
      type: constants.IDENTIFICATION_WITH_DOCS_MODAL_CLOSE,
    });
  };
}

export function setVerifyModalType(isVerifyModal, isBusiness) {
  return {
    type: constants.SET_VERIFY_MODAL_TYPE,
    payload: { isVerifyModal, isBusiness },
  };
}

export function getIdentificationWithDocsAction(opportunityId) {
  return (dispatch, getState, { getIdentificationWithDocsRequest }) => {
    dispatch(identificationWithDocsRequest());
    return getIdentificationWithDocsRequest(opportunityId).then(data => {
      if (data.err) {
        dispatch(identificationWithDocsFailure(data));
        return false;
      }
      dispatch(identificationWithDocsSuccess(data.resp, opportunityId));
      return data.resp;
    });
  };
}

export function postPrintPasswordAction(body, opportunityId) {
  return (dispatch, getState, { postPrintPasswordRequest }) =>
    postPrintPasswordRequest(body, opportunityId).then(data => {
      if (data.err) {
        return false;
      }
      return data.resp;
    });
}

export function getPrintFormsAction(params) {
  return (dispatch, getState, { getPrintFormsRequest }) =>
    getPrintFormsRequest(params).then(data => {
      if (data.err) {
        return false;
      }
      return data;
    });
}

export function availableTimeRequest() {
  return {
    type: constants.AVAILABLE_TIME_REQUEST,
  };
}

export function availableTimeSuccess(data) {
  return {
    type: constants.AVAILABLE_TIME_SUCCESS,
    payload: data,
  };
}

export function availableTimeFailure(error) {
  return {
    type: constants.AVAILABLE_TIME_FAILURE,
    payload: error,
  };
}

export function getAvailableTimeAction() {
  return (dispatch, getState, { getAvailableTimeRequest }) => {
    dispatch(availableTimeRequest());
    return getAvailableTimeRequest().then(data => {
      if (data.err) {
        dispatch(availableTimeFailure(data));
        return false;
      }
      dispatch(availableTimeSuccess(data.resp));
      return data.resp;
    });
  };
}

export function applicationRequest() {
  return {
    type: constants.APPLICATION_REQUEST,
  };
}

export function applicationSuccess(data) {
  return {
    type: constants.APPLICATION_SUCCESS,
    payload: data,
  };
}

export function applicationFailure(error) {
  return {
    type: constants.APPLICATION_FAILURE,
    payload: error,
  };
}

export function getApplicationAction(params) {
  return (dispatch, getState, { getApplicationRequest }) => {
    dispatch(applicationRequest());
    return getApplicationRequest(params).then(data => {
      if (data.err) {
        dispatch(applicationFailure(data));
        return false;
      }
      dispatch(applicationSuccess(data.resp));
      return data.resp;
    });
  };
}

export function meetingLocationRequest() {
  return {
    type: constants.MEETING_LOCATION_REQUEST,
  };
}

export function meetingLocationSuccess(data) {
  return {
    type: constants.MEETING_LOCATION_SUCCESS,
    payload: data,
  };
}

export function meetingLocationFailure(error) {
  return {
    type: constants.MEETING_LOCATION_FAILURE,
    payload: error,
  };
}

export function postSetMeetingLocationAction(params) {
  return (dispatch, getState, { postMeetingLocationRequest }) => {
    dispatch(meetingLocationRequest());
    return postMeetingLocationRequest(params).then(data => {
      if (data.err) {
        dispatch(meetingLocationFailure(data));
        return false;
      }
      dispatch(meetingLocationSuccess(data.resp));
      return data.resp;
    });
  };
}

export function accountLocationRequest() {
  return {
    type: constants.ACCOUNT_LOCATION_REQUEST,
  };
}

export function accountLocationSuccess(data) {
  return {
    type: constants.ACCOUNT_LOCATION_SUCCESS,
    payload: data,
  };
}

export function accountLocationFailure(error) {
  return {
    type: constants.ACCOUNT_LOCATION_FAILURE,
    payload: error,
  };
}

export function putAccountLocationAction(body) {
  return (dispatch, getState, { putAccountLocationRequest }) => {
    dispatch(accountLocationRequest());
    return putAccountLocationRequest(body).then(data => {
      if (data.err) {
        dispatch(accountLocationFailure(data));
        return false;
      }
      dispatch(accountLocationSuccess(data.resp));
      return data.resp;
    });
  };
}

export function setMeetingTimeRequest() {
  return {
    type: constants.SET_MEETING_TIME_REQUEST,
  };
}

export function setMeetingTimeSuccess(data) {
  return {
    type: constants.SET_MEETING_TIME_SUCCESS,
    payload: data,
  };
}

export function setMeetingTimeFailure(error) {
  return {
    type: constants.SET_MEETING_TIME_FAILURE,
    payload: error,
  };
}

export function postSetMeetingTimeAction(params) {
  return (dispatch, getState, { postSetMeetingTimeRequest }) => {
    dispatch(setMeetingTimeRequest());
    return postSetMeetingTimeRequest(params).then(data => {
      if (data.err) {
        dispatch(setMeetingTimeFailure(data));
        return false;
      }
      dispatch(setMeetingTimeSuccess(data.resp));
      return data.resp;
    });
  };
}

export function bankInfoRequest() {
  return {
    type: constants.BANK_INFO_REQUEST,
  };
}

export function bankInfoSuccess(data) {
  return {
    type: constants.BANK_INFO_SUCCESS,
    payload: data,
  };
}

export function bankInfoFailure(error) {
  return {
    type: constants.BANK_INFO_FAILURE,
    payload: error,
  };
}

export function getBankInfoAction(params) {
  return (dispatch, getState, { getBankInfoRequest }) => {
    dispatch(bankInfoRequest());
    return getBankInfoRequest(params).then(data => {
      if (data.err) {
        dispatch(bankInfoFailure(data));
        return false;
      }
      dispatch(bankInfoSuccess(data.resp));
      return data.resp;
    });
  };
}

export function setBankInfoRequest() {
  return {
    type: constants.SET_BANK_INFO_REQUEST,
  };
}

export function setBankInfoSuccess(data) {
  return {
    type: constants.SET_BANK_INFO_SUCCESS,
    payload: data,
  };
}

export function setBankInfoFailure(error) {
  return {
    type: constants.SET_BANK_INFO_FAILURE,
    payload: error,
  };
}

export function postSetBankInfoAction(params) {
  return (dispatch, getState, { postSetBankInfoRequest }) => {
    dispatch(setBankInfoRequest());
    return postSetBankInfoRequest(params).then(data => {
      if (data.err) {
        dispatch(setBankInfoFailure(data));
        return false;
      }
      dispatch(setBankInfoSuccess(data.resp));
      return data.resp;
    });
  };
}

export function isBankInVerificationModeAction(isBankInVerificationMode) {
  return {
    type: constants.IS_BANK_VERIFICATION_MODE,
    payload: isBankInVerificationMode,
  };
}

export function getIbanInfoAction(params) {
  return (dispatch, getState, { getIbanInfoRequest }) => {
    dispatch({ type: constants.GET_IBAN_INFO_REQUEST });
    return getIbanInfoRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: constants.GET_IBAN_INFO_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: constants.GET_IBAN_INFO_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function validateIBANAction(params) {
  return (dispatch, getState, { postValidateIBANRequest }) =>
    postValidateIBANRequest(params).then(data => {
      if (data.err) {
        return data;
      }
      return data.resp;
    });
}

export function getIdentificationByLevantIdAction(levantId) {
  return (dispatch, getState, { getIdentificationByLevantIdRequest }) => {
    dispatch({ type: constants.GET_IDENTIFICATION_BY_LEVANT_ID_REQUEST });
    return getIdentificationByLevantIdRequest(levantId).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_IDENTIFICATION_BY_LEVANT_ID_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_IDENTIFICATION_BY_LEVANT_ID_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postConfirmByQcAction(opportunityId, body) {
  return (dispatch, getState, { postConfirmByQcRequest }) => {
    dispatch({ type: constants.POST_CONFIRM_BY_QC_REQUEST });
    return postConfirmByQcRequest(opportunityId, body).then(data => {
      if (data.err) {
        dispatch({ type: constants.POST_CONFIRM_BY_QC_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: constants.POST_CONFIRM_BY_QC_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postConfirmBusinessByQcAction(opportunityId, body) {
  return (dispatch, getState, { postConfirmBusinessByQcRequest }) => {
    dispatch({ type: constants.POST_CONFIRM_BY_QC_REQUEST });
    return postConfirmBusinessByQcRequest(opportunityId, body).then(data => {
      if (data.err) {
        dispatch({ type: constants.POST_CONFIRM_BY_QC_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: constants.POST_CONFIRM_BY_QC_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postRejectByQcAction(opportunityId, rejectAll) {
  return (dispatch, getState, { postRejectByQcRequest }) => {
    dispatch({ type: constants.POST_REJECT_BY_QC_REQUEST });
    return postRejectByQcRequest(opportunityId, rejectAll).then(data => {
      if (data.err) {
        dispatch({ type: constants.POST_REJECT_BY_QC_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: constants.POST_REJECT_BY_QC_SUCCESS,
        payload: data.resp,
      });
      return data;
    });
  };
}

export function getAddressStringByPostCodeAction(params) {
  return (dispatch, getState, { getAddressStringByPostCodeRequest }) => {
    dispatch({ type: constants.GET_ADDRESS_STRING_BY_POST_CODE_REQUEST });
    return getAddressStringByPostCodeRequest(params).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_ADDRESS_STRING_BY_POST_CODE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_ADDRESS_STRING_BY_POST_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postConfirmBrokerageAction(opportunityId, body) {
  return (dispatch, getState, { postConfirmBrokerageRequest }) => {
    dispatch({ type: constants.POST_CONFIRM_BROKERAGE_REQUEST });
    return postConfirmBrokerageRequest(opportunityId, body).then(data => {
      if (data.err) {
        dispatch({
          type: constants.POST_CONFIRM_BROKERAGE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.POST_CONFIRM_BROKERAGE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getPipelinesAction(params) {
  return (dispatch, getState, { getPipelinesRequest }) => {
    dispatch({ type: constants.GET_PIPELINES_REQUEST });
    return getPipelinesRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: constants.GET_PIPELINES_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: constants.GET_PIPELINES_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function getPrintFormsByFormIdAction(params) {
  return (dispatch, getState, { getPrintFormsByFormIdRequest }) =>
    getPrintFormsByFormIdRequest(params).then(data => {
      if (data.err) {
        return false;
      }
      return data;
    });
}

export function putDoActionAction(body) {
  return (dispatch, getState, { putDoActionRequest }) =>
    putDoActionRequest(body).then(data => {
      if (data.err) {
        return false;
      }
      return data;
    });
}

export function putNeedSejamAction(body) {
  return (dispatch, getState, { putNeedSejamRequest }) => {
    dispatch({ type: constants.PUT_NEED_SEJAM_REQUEST });
    return putNeedSejamRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: constants.PUT_NEED_SEJAM_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: constants.PUT_NEED_SEJAM_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}

export function putVerifySejamCodeAction(body) {
  return (dispatch, getState, { putVerifySejamCodeRequest }) => {
    dispatch({ type: constants.PUT_VERIFY_SEJAM_CODE_REQUEST });
    return putVerifySejamCodeRequest(body).then(data => {
      if (data.err) {
        dispatch({
          type: constants.PUT_VERIFY_SEJAM_CODE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.PUT_VERIFY_SEJAM_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function putRejectSejamCodeAction(body) {
  return (dispatch, getState, { putRejectSejamCodeRequest }) => {
    dispatch({ type: constants.PUT_REJECT_SEJAM_CODE_REQUEST });
    return putRejectSejamCodeRequest(body).then(data => {
      if (data.err) {
        dispatch({
          type: constants.PUT_REJECT_SEJAM_CODE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.PUT_REJECT_SEJAM_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getSejamByOpportunityIdAction(params) {
  return (dispatch, getState, { getSejamByOpportunityIdRequest }) => {
    dispatch({ type: constants.GET_SEJAM_BY_OPPORTUNITY_ID_REQUEST });
    return getSejamByOpportunityIdRequest(params).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_SEJAM_BY_OPPORTUNITY_ID_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_SEJAM_BY_OPPORTUNITY_ID_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function putDoActionForDonyaFundAction(body) {
  return (dispatch, getState, { putDoActionForDonyaFundRequest }) => {
    dispatch({ type: constants.PUT_DO_ACTION_FOR_DONYA_FUND_REQUEST });
    return putDoActionForDonyaFundRequest(body).then(data => {
      if (data.err) {
        dispatch({
          type: constants.PUT_DO_ACTION_FOR_DONYA_FUND_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.PUT_DO_ACTION_FOR_DONYA_FUND_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function postConfirmBusinessInfoAction(body) {
  return (dispatch, getState, { postConfirmBusinessInfoRequest }) => {
    const {
      opportunities: { currentUser },
    } = getState();
    dispatch({ type: constants.POST_CONFIRM_BUSINESS_INFO_REQUEST });
    return postConfirmBusinessInfoRequest(currentUser.id, body).then(data => {
      if (data.err) {
        dispatch({
          type: constants.POST_CONFIRM_BUSINESS_INFO_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.POST_CONFIRM_BUSINESS_INFO_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getOpportunityByProductCodeAction(params) {
  return (dispatch, getState, { getOpportunityByProductCodeRequest }) => {
    dispatch({ type: constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_REQUEST });
    return getOpportunityByProductCodeRequest(params).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_OPPORTUNITY_BY_PRODUCT_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function putDoActionByLevantAndCommandAction(body) {
  return (dispatch, getState, { putDoActionByLevantAndCommandRequest }) =>
    putDoActionByLevantAndCommandRequest(body).then(data => {
      if (data.err) {
        return false;
      }
      return data;
    });
}

export function getSejamTradingCodeAction(params) {
  return (dispatch, getState, { getSejamTradingCodeRequest }) => {
    dispatch({ type: constants.GET_SEJAM_TRADING_CODE_REQUEST });
    return getSejamTradingCodeRequest(params).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_SEJAM_TRADING_CODE_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_SEJAM_TRADING_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function updateSejamTracingCodeAction(params) {
  return (dispatch, getState, { updateSejamTracingCodeRequest }) =>
    updateSejamTracingCodeRequest(params);
}

export function postTradingInfoAction(body) {
  return (dispatch, getState, { postTradingInfoRequest }) => {
    dispatch({ type: constants.POST_TRADING_INFO_REQUEST });
    return postTradingInfoRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: constants.POST_TRADING_INFO_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: constants.POST_TRADING_INFO_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getSejamStatusByOpportunityId(opportunityId) {
  return (dispatch, getState, { getSejamStatusByOpportunityIdRequest }) => {
    dispatch({ type: constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_REQUEST });
    return getSejamStatusByOpportunityIdRequest(opportunityId).then(data => {
      if (data.err) {
        dispatch({
          type: constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.GET_SEJAM_STATUS_BY_OPPORTUNITIES_ID_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function putSejamOtp(opportunityId) {
  return (dispatch, getState, { putSejamOtpRequest }) => {
    dispatch({ type: constants.PUT_SEJAM_OTP_REQUEST });
    return putSejamOtpRequest(opportunityId).then(data => {
      if (data.err) {
        dispatch({
          type: constants.PUT_SEJAM_OTP_FAILURE,
          payload: data,
        });
        return data;
      }
      dispatch({
        type: constants.PUT_SEJAM_OTP_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function getTradingCodeAction(body) {
  return (dispatch, getState, { getTradingCodeRequest }) => {
    dispatch({ type: constants.GET_TRADING_CODE_REQUEST });
    return getTradingCodeRequest(body).then(data => {
      if (data.err) {
        dispatch({ type: constants.GET_TRADING_CODE_FAILURE, payload: data });
        return data;
      }
      dispatch({
        type: constants.GET_TRADING_CODE_SUCCESS,
        payload: data.resp,
      });
      return data.resp;
    });
  };
}

export function toggleShowEmptyPipelines() {
  return (dispatch, getState) => {
    dispatch({
      type: constants.TOGGLE_SHOW_EMPTY_PIPELINES,
      payload: !getState().opportunities.visibleEmptyPipelines,
    });
  };
}

export function setOpportunitiesSorting(sorting) {
  return dispatch => {
    dispatch({
      type: constants.SET_OPPORTUNITIES_SORTING,
      payload: sorting,
    });
    dispatch(getOpportunitiesAction());
  };
}

export function setOpportunitiesFiltering(filterBy) {
  return dispatch => {
    dispatch({
      type: constants.SET_OPPORTUNITIES_FILTERING,
      payload: filterBy || 'all',
    });
  };
}

export function getAddressesForSetMeeting(applicationId) {
  return (dispatch, getState, { getAddressesForSetMeetingRequest }) => {
    dispatch({ type: constants.GET_ADDRESS_FOR_SET_MEETING_REQUEST });
    return getAddressesForSetMeetingRequest(applicationId).then(data => {
      if (data.err) {
        dispatch({ type: constants.GET_ADDRESS_FOR_SET_MEETING_FAILURE });
        return false;
      }
      dispatch({ type: constants.GET_ADDRESS_FOR_SET_MEETING_SUCCESS });
      return data.resp;
    });
  };
}

export function postModifyBankAccountNumberAction(opportunityId, bankId) {
  return (dispatch, getState, { postModifyBankAccountNumberRequest }) => {
    dispatch({ type: constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_REQUEST });
    return postModifyBankAccountNumberRequest(opportunityId, bankId).then(
      data => {
        if (data.err) {
          dispatch({ type: constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_FAILURE });
          return false;
        }
        dispatch({ type: constants.POST_MODIFY_BANK_ACCOUNT_NUMBER_SUCCESS });
        return data;
      },
    );
  };
}

export function saveReturnIdentificationData(
  opportunityId,
  status,
  videoKYCID,
) {
  return {
    type: constants.SET_RETURN_IDENTIFICATION,
    payload: { id: opportunityId, status, videoKYCID },
  };
}
