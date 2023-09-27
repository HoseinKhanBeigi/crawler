import {
  createGetUsageRequest,
  createGetTagsRequest,
  createDeleteTagsRequest,
  createPostTagsRequest,
  createPutTagsRequest,
  createPostTaggingRequest,
  createPostUnTaggingRequest,
  createGetTagListRequest,
  createGetTaskTagsListRequest,
} from '../tag/tag.services';
import { createDownloadTableExcelRequest } from '../reports/reports.services';
import {
  createPutFieldsOrderRequest,
  createDeleteFieldRequest,
  createPostFieldRequest,
  createPutFieldRequest,
} from '../formSetting/formSetting.services';
import { createPostUploadFileRequest } from '../upload/upload.services';
import { createGetProductFormsRequest } from '../product/product.services';
import {
  createGetSearchByIdRequest,
  createDeleteFilterPresetRequest,
  createGetSearchListRequest,
  createPostSaveSearchRequest,
} from '../search/search.services';
import {
  createGetActionTypesRequest,
  createGetCrmActivitiesRequest,
  createGetNewActivitiesRequest,
  createPostContactRequest,
} from '../newActivities/newActivities.services';
import {
  createGetPartyPhoneNumberByLevantIdRequest,
  createGetContactsByLevantIdRequest,
  createGetLeadFormFieldsRequest,
  createGetLeadRequest,
  createPostAddLeadRequest,
  createPutLeadRequest,
  createGetLeadRelationsRequest,
  createGetLeadColumnsAndValuesRequest,
} from '../lead/lead.services';
import {
  createPostKycCapacityManagementRequest,
  createPutKycCapacityEditRequest,
  createGetMeetingsManagementRequest,
  createGetMeetingScheduleExcelRequest,
} from '../kycCapacityManagement/kycCapacityManagement.services';
import {
  createDeleteOpportunityRequest,
  createGetOpportunityRequest,
} from '../opportunity/opportunity';
import { createGetFullSearchRequest } from '../fullSearch/fullSearch.services';
import {
  createGetDocumentTokenByLevantIdRequest,
  createGetDocumentTypesRequest,
  createGetDocumentFilesRequest,
  createGetDocumentTokenRequest,
  createPostCreateDocumentsByLevantIdRequest,
  createPostUploadSignDocumentRequest,
  createPostPrintActivityRequest,
} from '../documentToken/documentToken.services';
import {
  createPatchUserStatusRequest,
  createGetSetPasswordRequest,
  createGetUsersRequest,
  createGetRePrintPasswordRequest,
} from '../users/users.services';
import {
  createPostSendEmailRequest,
  createGetEmailPatternsRequest,
  createCheckExistEmailRequest,
} from '../sendEmail/sendEmail.services';
import {
  createGetSmsPatternsRequest,
  createPostSendWhatsAppRequest,
  createPostSendSmsRequest,
} from '../sendSMS/sendSMS.services';
import {
  createGetGetProductsRequest,
  createGetProductGroupsRequest,
} from '../getProducts/getProducts.services';
import {
  createGetTaskListRequest,
  createGetDeleteTaskRequest,
  createGetAddTaskRequest,
} from '../task/task.services';
import {
  createPostNeshanTokenDataRequest,
  createPostNeshanLogoutRequest,
} from '../neshanAuth/neshan.services';
import { createGetUserEmployeeProfileRequest } from '../user/user.services';
import {
  createGetAddPersonRequest,
  createGetPersonInfoRequest,
  createGetPersonByMobileRequest,
  createGetPersonRequest,
  createPostPartyPersonRequest,
} from '../person/person.services';

import {
  createGetTemplatesRequest,
  createGetPhoneCallsPatternsRequest,
  createGetPhoneCallsRequest,
  createPostAddCallDetailRequest,
  createPostClickToCallRequest,
  createPutCallDetailRequest,
  createGetCallDetailByIdRequest,
} from '../phoneCalls/phoneCalls.services';
import {
  createGetLeadImportProgressRequest,
  createGetLeadsAssignOperatorsRequest,
  createGetLeadsExcelTemplateRequest,
  createGetLeadsRequest,
  createGetLeadsUsersRequest,
  createPostDoActionForLeadRequest,
  createPostImportLeadsRequest,
  createPostSearchLeadRequest,
  createGetLeadCompanyRequest,
  createPostAPersonRelation,
  createDeleteAPersonCompanyRelation,
  createPutAPersonCompanyRelation,
  createGetBusinessRelations,
  createPostBusinessRelations,
  createGetBusinessesRelationProfile,
  createGetPersonsCompanyProfile,
} from '../leads/leads.services';
import {
  createGetActivitiesRequest,
  createGetActivityListRequest,
  createGetActivityRequest,
  createGetCreateActivityRequest,
  createGetDeleteActivityRequest,
  createGetPutActivityRequest,
  createPostCreateCallActivityRequest,
  createPostLogActivityRequest,
} from '../activities/activities.services';
import { createGetApplicationsRequest } from '../applications/application.services';
import {
  createPostAssignsRequest,
  createPostCheckUnAssignRequest,
  createPostUnAssignsRequest,
} from '../assign/assign.services';
import {
  createGetAddressStringByPostCodeRequest,
  createGetApplicationRequest,
  createGetAvailableTimeRequest,
  createGetBankInfoRequest,
  createGetCheckAppointmentsRequest,
  createGetIbanInfoRequest,
  createGetIdentificationByLevantIdRequest,
  createGetIdentificationRequest,
  createGetIdentificationWithDocsRequest,
  createGetOpportunitiesRequest,
  createGetOpportunityByProductCodeRequest,
  createGetPipelineOpportunitiesRequest,
  createGetPipelinesRequest,
  createGetPrintFormsByFormIdRequest,
  createGetPrintFormsRequest,
  createGetSejamByOpportunityIdRequest,
  createGetSejamTradingCodeRequest,
  createUpdateSejamTracingCodeRequest,
  createPostConfirmBrokerageRequest,
  createPostConfirmBusinessInfoRequest,
  createPostConfirmByQcRequest,
  createPostMeetingLocationRequest,
  createPostPrintPasswordRequest,
  createPostRejectByQcRequest,
  createPostSetMeetingTimeRequest,
  createPostTradingInfoRequest,
  createPutAccountLocationRequest,
  createPutAdditionalInfoRequest,
  createPutApproveMeetingRequest,
  createPutCancelMeetingRequest,
  createPutCancelOpportunityRequest,
  createPutDoActionByLevantAndCommandRequest,
  createPutDoActionForDonyaFundRequest,
  createPutDoActionRequest,
  createPutKycDoneRequest,
  createPutNeedSejamRequest,
  createPutRejectSejamCodeRequest,
  createPutSaveIdentificationRequest,
  createPutVerifySejamCodeRequest,
  createSetBankInfoRequest,
  createValidateIBANRequest,
  creatSejamStatusByOpportunityIdRequest,
  creatPutSejamOtpRequest,
  creatGetTradingCodeRequest,
  createPutAdditionalBusinessPersonalInfoAction,
  createPutAdditionalBusinessInfoAction,
  createPostConfirmBusinessByQcRequest,
  creatGetAddressesForSetMeetingRequest,
  createPostModifyBankAccountNumber,
} from '../opportunities/opportunities.services';
import {
  createGetDocDownloadRequest,
  createGetFileTokenRequest,
} from '../docDownload/docDownload.services';
import {
  createCreateNewMessageTemplate,
  createDoActionOnMessageTemplates,
  createEditMessageTemplate,
} from '../messageTemplate/messageTemplate.services';
import {
  createGetUISettings,
  createPostUISettings,
} from '../settings/settings.services';

import { createPostAddCaseRequest } from '../case/case.services';

import { createPostRegisterEmployeeRequest } from '../employeeManagement/employeeManagement.services';
import {
  createCheckSEJAMRequest,
  createInquiryImageAndInfoRequest,
  createInquiryInfoRequest,
  createCheckShahCarRequest,
} from '../tools/tools.services';
import {
  createGetAclMenuListRequest,
  createGetAclAuthoritiesListRequest,
} from '../acl/acl.services';

import {
  createGetAllFundsRequest,
  createGetFundByDsCodeRequest,
  createGetNetAssetChartDataRequest,
  createGetPortfolioReasonsRequest,
  createPostPortfolioReasonRequest,
} from '../portfolio/portfolio.services';
import {
  createGetPipeRequest,
  createGetPipesRequest,
} from '../pipelineManagement/pipelineManagement';
import {
  createGetPipelineFormDataRequest,
  createUpdatePipelineCardPhaseDataRequest,
} from '../pipelineFormData/pipelineFormData';
import { createGetPipelineFormRequest } from '../pipelineForm/pipelineForm';
import {
  createCreatePipelineCardRequest,
  createMovePipelineCardRequest,
  createUpdatePipelineCardRequest,
} from '../pipelineCard/pipelineCard';
import { createCreatePipelinePhaseRequest } from '../pipelinePhase/pipelinePhase';
import { createGetPipelineFieldTypesRequest } from '../pipelineFieldType/pipelineFieldType';
import {
  createGetPipelineParametersRequest,
  createUpdatePipelineParametersRequest,
} from '../pipelineParameters/pipelineParameters';
import { createGetPipelineCardRequest } from '../PipelineCardData/pipelineCardData';
import {
  createGetPipelineCardDataRequest,
  createGetPipelineCardHistoryRequest,
} from '../pipelineCardHistory/pipelineCardHistory';
import { creatGetPipelinePhaseFieldsDataRequest } from '../pipelinePhaseForm/pipelinePhaseForm';
import { createGetCardFieldDataRequest } from '../PipelineCardFieldData/pipelineCardFieldData';
import { createPostRegisterNewEmployeeRequest } from '../Employee/employee.services';
import { createGetPipelineCardTasksRequest } from '../pipelineCardTasks/pipelineCardTasks';

export default function createHelpers({ token, fetch, history }) {
  return {
    history,
    fetch,
    postNeshanTokenDataRequest: createPostNeshanTokenDataRequest(fetch),
    postNeshanLogoutRequest: createPostNeshanLogoutRequest(fetch),
    postDoActionForLeadRequest: createPostDoActionForLeadRequest(fetch, token),
    getOpportunityByProductCodeRequest: createGetOpportunityByProductCodeRequest(
      fetch,
      token,
    ),
    postSearchLeadRequest: createPostSearchLeadRequest(fetch, token),
    postUnAssignsRequest: createPostUnAssignsRequest(fetch, token),
    getUsageRequest: createGetUsageRequest(fetch, token),
    getTagsListRequest: createGetTagListRequest(fetch, token),
    getTaskTagsListRequest: createGetTaskTagsListRequest(fetch, token),
    deleteTagsRequest: createDeleteTagsRequest(fetch, token),
    putTagsRequest: createPutTagsRequest(fetch, token),
    postTagsRequest: createPostTagsRequest(fetch, token),
    postTaggingRequest: createPostTaggingRequest(fetch, token),
    postUnTaggingRequest: createPostUnTaggingRequest(fetch, token),
    getTagsRequest: createGetTagsRequest(fetch, token),
    postCheckUnAssignRequest: createPostCheckUnAssignRequest(fetch, token),
    postContactRequest: createPostContactRequest(fetch, token),
    getPipelineCardRequest: createGetPipelineCardRequest(fetch, token),
    getLeadImportProgressRequest: createGetLeadImportProgressRequest(
      fetch,
      token,
    ),
    getLeadsExcelTemplateRequest: createGetLeadsExcelTemplateRequest(
      fetch,
      token,
    ),
    putFieldRequest: createPutFieldRequest(fetch, token),
    putFieldsOrderRequest: createPutFieldsOrderRequest(fetch, token),
    deleteFieldRequest: createDeleteFieldRequest(fetch, token),
    postFieldRequest: createPostFieldRequest(fetch, token),
    getLeadFormFieldsRequest: createGetLeadFormFieldsRequest(fetch, token),
    postConfirmBusinessInfoRequest: createPostConfirmBusinessInfoRequest(
      fetch,
      token,
    ),
    postAssignsRequest: createPostAssignsRequest(fetch, token),
    getLeadsUsersRequest: createGetLeadsUsersRequest(fetch, token),
    getLeadCompanyRequest: createGetLeadCompanyRequest(fetch, token),
    deleteAPersonRelationCompanyRequest: createDeleteAPersonCompanyRelation(
      fetch,
      token,
    ),
    putAPersonRelationOfCompanyRequest: createPutAPersonCompanyRelation(
      fetch,
      token,
    ),
    getPersonsCompanyProfileRequest: createGetPersonsCompanyProfile(
      fetch,
      token,
    ),
    getBusinessesRelationProfileRequest: createGetBusinessesRelationProfile(
      fetch,
      token,
    ),
    getBusinessRelationsRequest: createGetBusinessRelations(fetch, token),
    postBusinessRelationRequest: createPostBusinessRelations(fetch, token),
    postNewRelationForAPersonRequest: createPostAPersonRelation(fetch, token),
    postPrintActivityRequest: createPostPrintActivityRequest(fetch, token),
    getContactsByLevantIdRequest: createGetContactsByLevantIdRequest(
      fetch,
      token,
    ),
    putDoActionForDonyaFundRequest: createPutDoActionForDonyaFundRequest(
      fetch,
      token,
    ),
    getMeetingScheduleExcelRequest: createGetMeetingScheduleExcelRequest(
      fetch,
      token,
    ),
    postUploadFileRequest: createPostUploadFileRequest(fetch, token),
    getSejamByOpportunityIdRequest: createGetSejamByOpportunityIdRequest(
      fetch,
      token,
    ),
    putRejectSejamCodeRequest: createPutRejectSejamCodeRequest(fetch, token),
    putVerifySejamCodeRequest: createPutVerifySejamCodeRequest(fetch, token),
    putNeedSejamRequest: createPutNeedSejamRequest(fetch, token),
    postUploadSignDocumentRequest: createPostUploadSignDocumentRequest(
      fetch,
      token,
    ),
    deleteOpportunityRequest: createDeleteOpportunityRequest(fetch, token),
    getDocumentFilesRequest: createGetDocumentFilesRequest(fetch, token),
    getDocumentTypesRequest: createGetDocumentTypesRequest(fetch, token),
    getSearchByIdRequest: createGetSearchByIdRequest(fetch, token),
    deleteFilterPresetRequest: createDeleteFilterPresetRequest(fetch, token),
    getSearchListRequest: createGetSearchListRequest(fetch, token),
    putDoActionRequest: createPutDoActionRequest(fetch, token),
    putDoActionByLevantAndCommandRequest: createPutDoActionByLevantAndCommandRequest(
      fetch,
      token,
    ),
    getSejamTradingCodeRequest: createGetSejamTradingCodeRequest(fetch, token),
    updateSejamTracingCodeRequest: createUpdateSejamTracingCodeRequest(
      fetch,
      token,
    ),
    postTradingInfoRequest: createPostTradingInfoRequest(fetch, token),
    getSejamStatusByOpportunityIdRequest: creatSejamStatusByOpportunityIdRequest(
      fetch,
      token,
    ),
    putSejamOtpRequest: creatPutSejamOtpRequest(fetch, token),
    getTradingCodeRequest: creatGetTradingCodeRequest(fetch, token),
    getPrintFormsByFormIdRequest: createGetPrintFormsByFormIdRequest(
      fetch,
      token,
    ),
    getProductFormsRequest: createGetProductFormsRequest(fetch, token),
    postAddLeadRequest: createPostAddLeadRequest(fetch, token),
    putLeadRequest: createPutLeadRequest(fetch, token),
    postSaveSearchRequest: createPostSaveSearchRequest(fetch, token),
    getPipelinesRequest: createGetPipelinesRequest(fetch, token),
    postConfirmBrokerageRequest: createPostConfirmBrokerageRequest(
      fetch,
      token,
    ),
    postSendWhatsAppRequest: createPostSendWhatsAppRequest(fetch, token),
    getCrmActivitiesRequest: createGetCrmActivitiesRequest(fetch, token),
    postCreateCallActivityRequest: createPostCreateCallActivityRequest(
      fetch,
      token,
    ),
    postLogActivityRequest: createPostLogActivityRequest(fetch, token),
    getPartyPhoneNumberByLevantIdRequest: createGetPartyPhoneNumberByLevantIdRequest(
      fetch,
      token,
    ),
    postImportLeadsRequest: createPostImportLeadsRequest(fetch, token),
    getAddressStringByPostCodeRequest: createGetAddressStringByPostCodeRequest(
      fetch,
      token,
    ),
    postRejectByQcRequest: createPostRejectByQcRequest(fetch, token),
    postConfirmByQcRequest: createPostConfirmByQcRequest(fetch, token),
    postConfirmBusinessByQcRequest: createPostConfirmBusinessByQcRequest(
      fetch,
      token,
    ),
    getIdentificationByLevantIdRequest: createGetIdentificationByLevantIdRequest(
      fetch,
      token,
    ),
    downloadTableExcelRequest: createDownloadTableExcelRequest(fetch, token),
    getActionTypesRequest: createGetActionTypesRequest(fetch, token),
    getActivitiesRequest: createGetActivitiesRequest(fetch, token),
    getNewActivitiesRequest: createGetNewActivitiesRequest(fetch, token),
    getSmsPatternsRequest: createGetSmsPatternsRequest(fetch, token),
    getEmailPatternsRequest: createGetEmailPatternsRequest(fetch, token),
    checkExistEmailRequest: createCheckExistEmailRequest(fetch, token),
    getIbanInfoRequest: createGetIbanInfoRequest(fetch, token),
    postValidateIBANRequest: createValidateIBANRequest(fetch, token),
    getCheckSEJAMRequest: createCheckSEJAMRequest(fetch, token),
    postInquiryImageAndInfoRequest: createInquiryImageAndInfoRequest(
      fetch,
      token,
    ),
    postInquiryInfoRequest: createInquiryInfoRequest(fetch, token),
    postCheckShahCarRequest: createCheckShahCarRequest(fetch, token),
    postCreateDocumentsByLevantIdRequest: createPostCreateDocumentsByLevantIdRequest(
      fetch,
      token,
    ),
    getApplicationsRequest: createGetApplicationsRequest(fetch, token),
    getUserEmployeeProfileRequest: createGetUserEmployeeProfileRequest(
      fetch,
      token,
    ),
    getDocumentTokenByLevantIdRequest: createGetDocumentTokenByLevantIdRequest(
      fetch,
      token,
    ),
    putKycCapacityEditRequest: createPutKycCapacityEditRequest(fetch, token),
    postSetMeetingTimeRequest: createPostSetMeetingTimeRequest(fetch, token),
    putAccountLocationRequest: createPutAccountLocationRequest(fetch, token),
    postMeetingLocationRequest: createPostMeetingLocationRequest(fetch, token),
    getApplicationRequest: createGetApplicationRequest(fetch, token),
    getAvailableTimeRequest: createGetAvailableTimeRequest(fetch, token),
    getCheckAppointmentsRequest: createGetCheckAppointmentsRequest(
      fetch,
      token,
    ),
    putCancelMeetingRequest: createPutCancelMeetingRequest(fetch, token),
    putKycDoneRequest: createPutKycDoneRequest(fetch, token),
    getLeadRequest: createGetLeadRequest(fetch, token),
    getLeadColumnsAndValuesRequest: createGetLeadColumnsAndValuesRequest(
      fetch,
      token,
    ),
    getLeadRelationsRequest: createGetLeadRelationsRequest(fetch, token),
    postKycCapacityManagementRequest: createPostKycCapacityManagementRequest(
      fetch,
      token,
    ),
    putApproveMeetingRequest: createPutApproveMeetingRequest(fetch, token),
    putAdditionalInfoRequest: createPutAdditionalInfoRequest(fetch, token),
    putAdditionalBusinessInfoRequest: createPutAdditionalBusinessInfoAction(
      fetch,
      token,
    ),
    putAdditionalBusinessPersonalInfoRequest: createPutAdditionalBusinessPersonalInfoAction(
      fetch,
      token,
    ),
    getOpportunityRequest: createGetOpportunityRequest(fetch, token),
    putCancelOpportunityRequest: createPutCancelOpportunityRequest(
      fetch,
      token,
    ),
    getFullSearchRequest: createGetFullSearchRequest(fetch, token),
    getMeetingsManagementRequest: createGetMeetingsManagementRequest(
      fetch,
      token,
    ),
    getLeadsAssignOperatorsRequest: createGetLeadsAssignOperatorsRequest(
      fetch,
      token,
    ),
    getDocDownloadRequest: createGetDocDownloadRequest(fetch, token),
    getFileTokenRequest: createGetFileTokenRequest(fetch, token),
    getDocumentTokenRequest: createGetDocumentTokenRequest(fetch, token),
    getIdentificationWithDocsRequest: createGetIdentificationWithDocsRequest(
      fetch,
      token,
    ),
    getPersonInfoRequest: createGetPersonInfoRequest(fetch, token),
    getPrintFormsRequest: createGetPrintFormsRequest(fetch, token),
    getPipelineOpportunitiesRequest: createGetPipelineOpportunitiesRequest(
      fetch,
      token,
    ),
    postCreatePartyPersonRequest: createPostPartyPersonRequest(fetch, token),
    getPersonByMobileRequest: createGetPersonByMobileRequest(fetch, token),
    getSetPasswordRequest: createGetSetPasswordRequest(fetch, token),
    postPrintPasswordRequest: createPostPrintPasswordRequest(fetch, token),
    patchUserStatusRequest: createPatchUserStatusRequest(fetch, token),
    getUsersRequest: createGetUsersRequest(fetch, token),
    getAddTaskRequest: createGetAddTaskRequest(fetch, token),
    postSendEmailRequest: createPostSendEmailRequest(fetch, token),
    postSendSmsRequest: createPostSendSmsRequest(fetch, token),
    getActivityRequest: createGetActivityRequest(fetch, token),
    getPutActivityRequest: createGetPutActivityRequest(fetch, token),
    getCreateActivityRequest: createGetCreateActivityRequest(fetch, token),
    getDeleteActivityRequest: createGetDeleteActivityRequest(fetch, token),
    putSaveIdentificationRequest: createPutSaveIdentificationRequest(
      fetch,
      token,
    ),
    getIdentificationRequest: createGetIdentificationRequest(fetch, token),
    getGetProductsRequest: createGetGetProductsRequest(fetch, token),
    getProductGroupsRequest: createGetProductGroupsRequest(fetch, token),
    getDeleteTaskRequest: createGetDeleteTaskRequest(fetch, token),
    getTaskListRequest: createGetTaskListRequest(fetch, token),
    getAddPersonRequest: createGetAddPersonRequest(fetch, token),
    getPersonRequest: createGetPersonRequest(fetch, token),
    getOpportunitiesRequest: createGetOpportunitiesRequest(fetch, token),
    getActivityListRequest: createGetActivityListRequest(fetch, token),
    getLeadsRequest: createGetLeadsRequest(fetch, token),
    getRePrintPasswordRequest: createGetRePrintPasswordRequest(fetch, token),
    getBankInfoRequest: createGetBankInfoRequest(fetch, token),
    postSetBankInfoRequest: createSetBankInfoRequest(fetch, token),
    doActionOnMessageTemplates: createDoActionOnMessageTemplates(fetch, token),
    createNewMessageTemplate: createCreateNewMessageTemplate(fetch, token),
    editMessageTemplate: createEditMessageTemplate(fetch, token),
    getUISettingsRequest: createGetUISettings(fetch, token),
    postUISettingsRequest: createPostUISettings(fetch, token),
    getAddressesForSetMeetingRequest: creatGetAddressesForSetMeetingRequest(
      fetch,
      token,
    ),
    postModifyBankAccountNumberRequest: createPostModifyBankAccountNumber(
      fetch,
      token,
    ),
    postAddCallDetailRequest: createPostAddCallDetailRequest(fetch, token),
    getPhoneCallsRequest: createGetPhoneCallsRequest(fetch, token),
    putCallDetailRequest: createPutCallDetailRequest(fetch, token),
    getPhoneCallsPatternsRequest: createGetPhoneCallsPatternsRequest(
      fetch,
      token,
    ),
    getCallDetailByIdRequest: createGetCallDetailByIdRequest(fetch, token),
    getTemplatesRequest: createGetTemplatesRequest(fetch, token),
    postClickToCallRequest: createPostClickToCallRequest(fetch, token),

    postAddCaseRequest: createPostAddCaseRequest(fetch, token),

    postRegisterEmployeeRequest: createPostRegisterEmployeeRequest(
      fetch,
      token,
    ),
    postRegisterNewEmployeeRequest: createPostRegisterNewEmployeeRequest(
      fetch,
      token,
    ),
    getAclMenuListRequest: createGetAclMenuListRequest(fetch, token),
    getAclAuthoritiesListRequest: createGetAclAuthoritiesListRequest(
      fetch,
      token,
    ),
    getAllFundsRequest: createGetAllFundsRequest(fetch, token),
    getFundByDsCodeRequest: createGetFundByDsCodeRequest(fetch, token),
    getNetAssetChartDataRequest: createGetNetAssetChartDataRequest(
      fetch,
      token,
    ),
    getPortfolioReasonsRequest: createGetPortfolioReasonsRequest(fetch, token),
    postPortfolioReasonRequest: createPostPortfolioReasonRequest(fetch, token),
    getPipesRequest: createGetPipesRequest(fetch, token),
    getPipeRequest: createGetPipeRequest(fetch, token),
    getPipelineFormDataRequest: createGetPipelineFormDataRequest(fetch, token),
    updatePipelineCardPhaseDataRequest: createUpdatePipelineCardPhaseDataRequest(
      fetch,
      token,
    ),
    getPipelineFormRequest: createGetPipelineFormRequest(fetch, token),
    movePipelineCardRequest: createMovePipelineCardRequest(fetch, token),
    createPipelineCardRequest: createCreatePipelineCardRequest(fetch, token),
    updatePipelineCardRequest: createUpdatePipelineCardRequest(fetch, token),
    createPipelinePhaseRequest: createCreatePipelinePhaseRequest(fetch, token),
    getPipelineFieldTypesRequest: createGetPipelineFieldTypesRequest(
      fetch,
      token,
    ),
    updatePipelineParametersRequest: createUpdatePipelineParametersRequest(
      fetch,
      token,
    ),
    getPipelineParametersRequest: createGetPipelineParametersRequest(
      fetch,
      token,
    ),
    getPipelineCardDataRequest: createGetPipelineCardDataRequest(fetch, token),
    getPipelineCardTasksRequest: createGetPipelineCardTasksRequest(
      fetch,
      token,
    ),
    getPipelineCardHistoryRequest: createGetPipelineCardHistoryRequest(
      fetch,
      token,
    ),
    getPipelinePhaseFieldsDataRequest: creatGetPipelinePhaseFieldsDataRequest(
      fetch,
      token,
    ),
    getCardFieldDataRequest: createGetCardFieldDataRequest(fetch, token),
  };
}
