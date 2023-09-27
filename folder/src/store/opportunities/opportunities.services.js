import {
  BASE_VARIABLE_KEYS,
  basicDownload,
  FetchData,
  mockService,
  PostData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';
import mockData from '../../../restApiDesign/empty.json';

const pipelinesMockData = mockService
  ? require('../../../restApiDesign/opportunities/pipelines')
  : {};
const printFormsMockData = mockService
  ? require('../../../restApiDesign/opportunities/printForms')
  : {};
const printPasswordMockData = mockService
  ? require('../../../restApiDesign/opportunities/generateAndPrintPassword')
  : {};
const identificationWithDocsMockData = mockService
  ? require('../../../restApiDesign/opportunities/with-idenification')
  : {};
const opportunityIdentityMockData = mockService
  ? require('../../../restApiDesign/opportunities/get_identification')
  : {};
const saveIdentificationMockData = mockService
  ? require('../../../restApiDesign/opportunities/get_identification')
  : {};
const checkAppointmentsMockData = mockService
  ? require('../../../restApiDesign/opportunities/getMeetings')
  : {};
const cancelMeetingMockData = mockService
  ? require('../../../restApiDesign/opportunities/cancelMeeting')
  : {};
const doneMeetingMockData = mockService
  ? require('../../../restApiDesign/opportunities/doneMeeting')
  : {};
const approveMeetingMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const additionalInfoMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const cancelOpportunityMockData = mockService
  ? require('../../../restApiDesign/opportunities/getOpportunityByProductCode-2')
  : {};
const pipelineOpportunitiesMockData = mockService
  ? require('../../../restApiDesign/opportunities/getPipelinePersons')
  : {};
const opportunitiesMockData = mockService
  ? require('../../../restApiDesign/opportunities/getOpportunityByProductCode-2')
  : {};
const availableTimeMockData = mockService
  ? require('../../../restApiDesign/opportunities/getOpportunityByProductCode-2')
  : {};
const applicationMockData = mockService
  ? require('../../../restApiDesign/opportunities/getApplication')
  : {};
const accountLocationMockData = mockService
  ? require('../../../restApiDesign/opportunities/getApplication')
  : {};
const meetingLocationMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const setMeetingTimeMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const bankInfoMockData = mockService
  ? require('../../../restApiDesign/opportunities/getBankInfo.json')
  : {};
const setBankInfoMockData = mockService
  ? require('../../../restApiDesign/opportunities/setBankInfo.json')
  : {};
const GetIdentificationByLevantIdMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const PostConfirmByQcUrlMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const PostRejectByQcUrlMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const GetAddressStringByPostCodeMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};
const PostConfirmBrokerageMockData = mockService
  ? require('../../../restApiDesign/opportunities/emptyJson')
  : {};

export const opportunityByProductCodeUrl = productCode =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/products/${productCode}/pipelines`;
export const opportunitiesUrl = (productCode, sorting, filterBy, userId) =>
  sorting.sortField
    ? filterBy === 'myissuse'
      ? `${resolveVariable(
          BASE_VARIABLE_KEYS.OPPORTUNITY_URL,
        )}/products/${productCode}?sortField=${
          sorting.sortField
        }&sortDirection=${sorting.sortDirection}&ownerUserId=${userId}`
      : `${resolveVariable(
          BASE_VARIABLE_KEYS.OPPORTUNITY_URL,
        )}/products/${productCode}?sortField=${
          sorting.sortField
        }&sortDirection=${sorting.sortDirection}`
    : filterBy === 'myissuse'
    ? `${resolveVariable(
        BASE_VARIABLE_KEYS.OPPORTUNITY_URL,
      )}/products/${productCode}&ownerUserId=${userId}`
    : `${resolveVariable(
        BASE_VARIABLE_KEYS.OPPORTUNITY_URL,
      )}/products/${productCode}`;
export const confirmBusinessInfoUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/identification/${opportunityId}/business`;
export const doActionForDonyaFundUrl = (levantId, product) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/do-action/CREATE_DONYA_FUND_USER/${levantId}?productCode=${product}`;
export const sejamByOpportunityIdUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/party/sejam/${opportunityId}`;
export const rejectSejamCodeUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/reject-sejam`;
export const verifySejaCodeUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/verify-sejam`;
export const needSejamUrl = (opportunityId, mandatory) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/need-sejam/${mandatory}`;
export const doActionUrl = (levantId, command, productCode) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/do-action/${command}/${levantId}?productCode=${productCode}`;
export const printFormsByFormIdUrl = (formId, levantId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/forms/${formId}/${levantId}/pdf`;
export const pipelinesUrl = product =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/pipelines/thin/${product}`;
export const confirmBrokerageUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/confirm-brokerage`;
export const addressStringByPostCodeUrl = postCode =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/post/addresses/string/${postCode}`;
export const rejectByQcUrl = (opportunityId, rejectAll) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/reject${
    rejectAll ? '-all' : ''
  }-by-qc`;
export const confirmByQcUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/confirm-by-qc`;
export const confirmBusinessByQcUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/confirm-business-by-qc`;
export const identificationByLevantIdUrl = levantId =>
  `${resolveVariable(BASE_VARIABLE_KEYS.PARTY_URL)}/identification/${levantId}`;
export const ibanInfoUrl = params =>
  `https://mock.kian.digital/crm/api/v1/bankInfo?${params}`;
export const validateIBANURL = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/accounts/inquiry-iban`;

export const setMeetingTimeUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.MANAGEMENT_URL)}/appointments`;
export const accountLocationUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.MANAGEMENT_URL)}/users/location`;
export const meetingLocationUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.MANAGEMENT_URL)}/appointments/location`;
export const applicationUrl = applicationId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.MANAGEMENT_URL,
  )}/users/applications/${applicationId}`;
export const printFormsUrl = (opportunityId, actionDone) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/printForms/${actionDone}`;
export const printPassword = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/${opportunityId}/generateAndPrintPassword`;
export const identificationWithDocsUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/with-identification/${opportunityId}`;
export const opportunityIdentityUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/identification/${opportunityId}`;
export const saveIdentificationUrl = (opportunityId, businessSuffix) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/identification/${opportunityId}/${businessSuffix}`;
export const checkAppointmentsUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/resource-management/meetings/opp/${opportunityId}`;
export const cancelMeetingUrl = id =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.RESOURCE_MANAGEMENT_URL,
  )}/meetings/admin/${id}/cancel`;
export const doneMeetingUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/admin/kyc/${id}`;
export const approveMeetingUrl = id =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/resource-management/meetings/${id}/approve`;
export const additionalInfoUrlLevant = (isBusiness, id) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/party/additional-info/levant/${isBusiness ? 'business/' : ''}${id}`;
export const businessAdditionalInfo = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/party/additional-info/business/${opportunityId}`;
export const businessENPersonAdditionalInfo = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/party/additional-info/en-personal/${opportunityId}`;
export const additionalInfoUrl = (isBusiness, id) =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/party/additional-info/${
    isBusiness ? 'business/' : ''
  }${id}`;
export const cancelOpportunityUrl = (opportunityId, description, cancelType) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/${opportunityId}/cancel?cancelType=${cancelType}&description=${description}`;
export const pipelineOpportunitiesUrl = (product, query) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/pipelines/${product}/persons${query}`;
export const availableTimeUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/resource-management/available?productType=COMMON`;
export const bankInfoUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/crm/api/v1/party/banck-account-info/${levantId}`;
export const setBankInfoUrl = levantId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/crm/api/v1/banck-account-info/${levantId}`;
export const doActionByLevantAndCommandUrl = (code, opportunityId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/action/opportunity/command/${code}/${opportunityId}`;
export const sejamTradingCodeUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/trade/sejam-code/${opportunityId}`;
export const tradingCodeUrl = (opportunityId, otp) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/trade/sejam-profile/${opportunityId}?sejam-otp=${otp}`;
export const setMeetingAddressUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/opportunity/contacts/${opportunityId}`;
export const sejamTracingCodeUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.HOST)}/crm/api/v1/sejam/ext/sejam`;
export const tradingInfoUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/trade/trading-info`;
export const sejamStatusByOpportunityId = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/trade/sejam-status/${opportunityId}`;
export const sejamOtpUrl = opportunityId =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/trade/sejam-otp/${opportunityId}`;
export const modifyBankAccountNumber = (opportunityId, bankId) =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/accounts/modify/bank/${opportunityId}/${bankId}`;
export function createGetOpportunitiesRequest(fetch, token) {
  return async function opportunitiesRequest({
    productCode,
    sorting,
    filterBy,
    userId,
  }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: opportunitiesMockData,
      };
    }
    return FetchData(
      fetch,
      opportunitiesUrl(productCode, sorting, filterBy, userId),
      token,
    );
  };
}

export function createGetPipelineOpportunitiesRequest(fetch, token) {
  return async function pipelineOpportunitiesRequest(params) {
    const { IDs, pagination, search, product } = params;
    let pipelines = '';
    if (Array.isArray(IDs)) {
      // eslint-disable-next-line no-restricted-syntax,no-unused-vars
      for (const i of IDs) {
        pipelines += `?page=${pagination.page}&size=${pagination.size}&pipelineId=${i}`;
      }
    }

    const query = `${pipelines}${search && search !== '' ? `&${search}` : ''}`;
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: pipelineOpportunitiesMockData,
      };
    }
    return FetchData(fetch, pipelineOpportunitiesUrl(product, query), token);
  };
}

export function createPutCancelOpportunityRequest(fetch, token) {
  return async function cancelOpportunityRequest(body, params) {
    const { opportunityId, description, cancelType } = params;
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: cancelOpportunityMockData,
      };
    }
    return PutData(
      fetch,
      cancelOpportunityUrl(opportunityId, description, cancelType),
      body,
      token,
    );
  };
}

/**
 * For Add more info of user. this action add additional info in opportunity page and in profile page
 * @param fetch
 * @param token
 * @returns {additionalInfoRequest}
 */
export function createPutAdditionalInfoRequest(fetch, token) {
  return async function additionalInfoRequest(params, isBusiness, id, type) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: saveIdentificationMockData,
      };
    }

    let url;
    // If user info update from profile call this url,
    if (type === 'levant') {
      url = additionalInfoUrlLevant(isBusiness, id);
    } else {
      url = additionalInfoUrl(isBusiness, id);
    }

    // If user info update from opportunity page call this url,
    return PutData(fetch, url, params, token);
  };
}

export function createPutAdditionalBusinessPersonalInfoAction(fetch, token) {
  return async function additionalBusinessPersonalInfoRequest(
    params,
    opportunityId,
  ) {
    // If user info update from opportunity page call this url,
    return PutData(
      fetch,
      businessENPersonAdditionalInfo(opportunityId),
      params,
      token,
    );
  };
}

export function createPutAdditionalBusinessInfoAction(fetch, token) {
  return async function additionalBusinessInfoRequest(params, opportunityId) {
    // If user info update from opportunity page call this url,
    return PutData(fetch, businessAdditionalInfo(opportunityId), params, token);
  };
}

export function createPutApproveMeetingRequest(fetch, token) {
  return async function approveMeetingRequest(body, params) {
    const { levantId } = params;
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: approveMeetingMockData,
      };
    }
    return PutData(fetch, approveMeetingUrl(levantId), body, token);
  };
}

export function createPutKycDoneRequest(fetch, token) {
  return async function kycDoneRequest(body, levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: doneMeetingMockData,
      };
    }
    return PutData(fetch, doneMeetingUrl(levantId), body, token);
  };
}

export function createPutCancelMeetingRequest(fetch, token) {
  return async function cancelMeetingRequest(body, levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: cancelMeetingMockData,
      };
    }
    return PutData(fetch, cancelMeetingUrl(levantId), body, token);
  };
}

export function createGetCheckAppointmentsRequest(fetch, token) {
  return async function checkAppointmentsRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: checkAppointmentsMockData,
      };
    }
    return FetchData(fetch, checkAppointmentsUrl(opportunityId), token);
  };
}

export function createPutSaveIdentificationRequest(fetch, token) {
  return async function saveIdentificationRequest(
    body,
    opportunityId,
    isBusiness,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: additionalInfoMockData,
      };
    }
    const businessSuffix = isBusiness ? 'business' : '';
    return PutData(
      fetch,
      saveIdentificationUrl(opportunityId, businessSuffix),
      body,
      token,
    );
  };
}

export function createGetIdentificationRequest(fetch, token) {
  return async function identificationRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: opportunityIdentityMockData,
      };
    }
    return FetchData(fetch, opportunityIdentityUrl(opportunityId), token);
  };
}

export function createGetIdentificationWithDocsRequest(fetch, token) {
  return async function identificationWithDocsRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: identificationWithDocsMockData,
      };
    }
    return FetchData(fetch, identificationWithDocsUrl(opportunityId), token);
  };
}

export function createPostPrintPasswordRequest(fetch, token) {
  return async function printPasswordRequest(body, opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: printPasswordMockData,
      };
    }
    return PostData(fetch, printPassword(opportunityId), body, token);
  };
}

export function createGetPrintFormsRequest(fetch, token) {
  return async function printFormsRequest({ opportunityId, actionDone }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: printFormsMockData,
      };
    }
    return basicDownload(
      fetch,
      printFormsUrl(opportunityId, actionDone),
      token,
    );
  };
}

export function createGetAvailableTimeRequest(fetch, token) {
  return async function availableTimeRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: availableTimeMockData,
      };
    }
    return FetchData(fetch, availableTimeUrl(), token);
  };
}

export function createGetApplicationRequest(fetch, token) {
  return async function applicationRequest(applicationId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: applicationMockData,
      };
    }
    return FetchData(fetch, applicationUrl(applicationId), token);
  };
}

export function createPostMeetingLocationRequest(fetch, token) {
  return async function meetingLocationRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: meetingLocationMockData,
      };
    }
    return PostData(fetch, meetingLocationUrl(), body, token);
  };
}

export function createPutAccountLocationRequest(fetch, token) {
  return async function accountLocationRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: accountLocationMockData,
      };
    }
    return PutData(fetch, accountLocationUrl(), body, token);
  };
}

export function createPostSetMeetingTimeRequest(fetch, token) {
  return async function setMeetingTimeRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: setMeetingTimeMockData,
      };
    }
    return PostData(fetch, setMeetingTimeUrl(), body, token);
  };
}

export function createGetBankInfoRequest(fetch, token) {
  return async function bankInfoRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: bankInfoMockData,
      };
    }
    return FetchData(fetch, bankInfoUrl(levantId), token);
  };
}

export function createSetBankInfoRequest(fetch, token) {
  return async function setBankInfoRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: setBankInfoMockData,
      };
    }
    return FetchData(fetch, setBankInfoUrl(levantId), token);
  };
}

export function createGetIbanInfoRequest(fetch, token) {
  return async function getIbanInfoRequest(params = '') {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, ibanInfoUrl(params), token);
  };
}

export function createValidateIBANRequest(fetch, token) {
  return async function postValidateIBANRequest(params) {
    return PostData(fetch, validateIBANURL(), params, token);
  };
}

export function createGetIdentificationByLevantIdRequest(fetch, token) {
  return async function getIdentificationByLevantIdRequest(levantId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetIdentificationByLevantIdMockData,
      };
    }

    return FetchData(fetch, identificationByLevantIdUrl(levantId), token);
  };
}

export function createPostConfirmByQcRequest(fetch, token) {
  return async function postConfirmByQcRequest(opportunityId, body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: PostConfirmByQcUrlMockData,
      };
    }
    return PostData(fetch, confirmByQcUrl(opportunityId), body, token);
  };
}

export function createPostConfirmBusinessByQcRequest(fetch, token) {
  return async function postConfirmByQcRequest(opportunityId, body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: PostConfirmByQcUrlMockData,
      };
    }
    return PostData(fetch, confirmBusinessByQcUrl(opportunityId), body, token);
  };
}

export function createPostRejectByQcRequest(fetch, token) {
  return async function postRejectByQcRequest(opportunityId, rejectAll) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: PostRejectByQcUrlMockData,
      };
    }
    return PostData(
      fetch,
      rejectByQcUrl(opportunityId, rejectAll),
      null,
      token,
    );
  };
}

export function createGetAddressStringByPostCodeRequest(fetch, token) {
  return async function getAddressStringByPostCodeRequest(postCode) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetAddressStringByPostCodeMockData,
      };
    }

    return FetchData(fetch, addressStringByPostCodeUrl(postCode), token);
  };
}

export function createPostConfirmBrokerageRequest(fetch, token) {
  return async function postConfirmBrokerageRequest(opportunityId, body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: PostConfirmBrokerageMockData,
      };
    }
    return PostData(fetch, confirmBrokerageUrl(opportunityId), body, token);
  };
}

export function createGetPipelinesRequest(fetch, token) {
  return async function getPipelinesRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: pipelinesMockData,
      };
    }

    return FetchData(fetch, pipelinesUrl(params), token);
  };
}

export function createGetPrintFormsByFormIdRequest(fetch, token) {
  return async function getPrintFormsByFormIdRequest({ formId, levantId }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return basicDownload(fetch, printFormsByFormIdUrl(formId, levantId), token);
  };
}

export function createPutDoActionRequest(fetch, token) {
  return async function putDoActionRequest(
    { levantId, command, productCode },
    body,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(
      fetch,
      doActionUrl(levantId, command, productCode),
      body,
      token,
    );
  };
}

export function createPutNeedSejamRequest(fetch, token) {
  return async function putNeedSejamRequest(
    { opportunityId, mandatory },
    body,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(fetch, needSejamUrl(opportunityId, mandatory), body, token);
  };
}

export function createPutVerifySejamCodeRequest(fetch, token) {
  return async function putVerifySejamCodeRequest({ opportunityId, body }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(fetch, verifySejaCodeUrl(opportunityId), body, token);
  };
}

export function createPutRejectSejamCodeRequest(fetch, token) {
  return async function putRejectSejamCodeRequest({ opportunityId, body }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(fetch, rejectSejamCodeUrl(opportunityId), body, token);
  };
}

export function createGetSejamByOpportunityIdRequest(fetch, token) {
  return async function getSejamByOpportunityIdRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, sejamByOpportunityIdUrl(opportunityId), token);
  };
}

export function createPutDoActionForDonyaFundRequest(fetch, token) {
  return async function putDoActionForDonyaFundRequest({
    levantId,
    product,
    body,
  }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(
      fetch,
      doActionForDonyaFundUrl(levantId, product),
      body,
      token,
    );
  };
}

export function createPostConfirmBusinessInfoRequest(fetch, token) {
  return async function postConfirmBusinessInfoRequest(opportunityId, body) {
    return PutData(fetch, confirmBusinessInfoUrl(opportunityId), body, token);
  };
}

export function createGetOpportunityByProductCodeRequest(fetch, token) {
  return async function getOpportunityByProductCodeRequest({ productCode }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, opportunityByProductCodeUrl(productCode), token);
  };
}

export function createPutDoActionByLevantAndCommandRequest(fetch, token) {
  return async function putDoActionByLevantAndCommandRequest(
    { code, opportunityId },
    body,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(
      fetch,
      doActionByLevantAndCommandUrl(code, opportunityId),
      body,
      token,
    );
  };
}

export function createGetSejamTradingCodeRequest(fetch, token) {
  return async function getSejamTradingCodeRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, sejamTradingCodeUrl(opportunityId), token);
  };
}

export function createUpdateSejamTracingCodeRequest(fetch, token) {
  return async function updateSejamTracingCodeRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return PutData(fetch, sejamTracingCodeUrl(), body, token);
  };
}

export function creatSejamStatusByOpportunityIdRequest(fetch, token) {
  return async function getSejamStatusByOpportunityIdRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }

    return FetchData(fetch, sejamStatusByOpportunityId(opportunityId), token);
  };
}

export function creatPutSejamOtpRequest(fetch, token) {
  return async function PutSejamOtpRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PutData(fetch, sejamOtpUrl(opportunityId), token);
  };
}

export function creatGetTradingCodeRequest(fetch, token) {
  return async function getTradingCodeRequest({ opportunityId, otp }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return FetchData(fetch, tradingCodeUrl(opportunityId, otp), token);
  };
}

export function creatGetAddressesForSetMeetingRequest(fetch, token) {
  return async function getAddressesForSetMeetingRequest(opportunityId) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return FetchData(fetch, setMeetingAddressUrl(opportunityId), token);
  };
}

export function createPostTradingInfoRequest(fetch, token) {
  return async function postTradingInfoRequest(body) {
    return PostData(fetch, tradingInfoUrl(), body, token);
  };
}

export function createPostModifyBankAccountNumber(fetch, token) {
  return async function postModifyBankAccountNumberRequest(
    opportunityId,
    bankId,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: mockData,
      };
    }
    return PostData(
      fetch,
      modifyBankAccountNumber(opportunityId, bankId),
      null,
      token,
    );
  };
}
