import GetMeetingScheduleExcelMockData from '../../../restApiDesign/empty.json';
import {
  BASE_VARIABLE_KEYS,
  basicDownload,
  FetchData,
  mockService,
  PostData,
  PutData,
  resolveVariable,
} from '../../serviceConfig';

/** ******************************  Mock data  ****************************************** */
const meetingMockData = mockService
  ? require('../../../restApiDesign/kyc/meetings')
  : {};
const addKycCapacityMockData = mockService
  ? require('../../../restApiDesign/kyc/addKycCapacity')
  : {};
const editKycCapacityMockData = mockService
  ? require('../../../restApiDesign/kyc/editKycCapacity')
  : {};

/** ******************************  URL Address    ****************************************** */
export const meetingScheduleExcelUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/resource-management/meetings/shipments/export/excel`;

export const kycCapacityEditUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/resource-management`;
export const kycCapacityManagementUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/resource-management`;
export const meetingsManagementUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/resource-management/meetings/init`;

/** ******************************Service Function******************************************* */
export function createGetMeetingsManagementRequest(fetch, token) {
  return async function meetingsManagementRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: meetingMockData,
      };
    }
    return FetchData(fetch, meetingsManagementUrl(), token);
  };
}

export function createPostKycCapacityManagementRequest(fetch, token) {
  return async function kycCapacityManagementRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: addKycCapacityMockData,
      };
    }
    return PostData(fetch, kycCapacityManagementUrl(), body, token);
  };
}

export function createPutKycCapacityEditRequest(fetch, token) {
  return async function kycCapacityEditRequest(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: editKycCapacityMockData,
      };
    }
    return PutData(fetch, kycCapacityEditUrl(), body, token);
  };
}

export function createGetMeetingScheduleExcelRequest(fetch, token) {
  return async function getMeetingScheduleExcelRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: GetMeetingScheduleExcelMockData,
      };
    }

    return basicDownload(fetch, meetingScheduleExcelUrl(), token);
  };
}
