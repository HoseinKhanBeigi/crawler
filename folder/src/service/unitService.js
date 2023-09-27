import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';
import { unitTypeNames } from '../components/Unit/utils/unitHelpers';

const endpoint = {
  BRANCH: () =>
    `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/branch`,
  REPRESENTATIVE: () =>
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/representative`,
  AGENT: () =>
    `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/agent`,
};
export const unitServices = {
  registerUnitRequest: (body, unitType) =>
    request(`${endpoint[unitType]()}/register`).post(body, {
      message: {
        success: `مشخصات ${unitTypeNames[unitType]} با موفقیت ثبت شد.`,
        error: `خطا در ثبت مشخصات ${unitTypeNames[unitType]} !`,
      },
    }),
  updateUnitRequest: (body, unitType) =>
    request(endpoint[unitType]()).put(body, {
      message: {
        success: `تغییرات ${unitTypeNames[unitType]} با موفقیت ثبت شد.`,
        error: `خطا در ثبت تغییرات ${unitTypeNames[unitType]} !`,
      },
    }),
  updateUnitStatusRequest: (id, status, unitType) =>
    request(`${endpoint[unitType]()}/status?id=${id}&unitStatus=${status}`).put(
      {},
      {
        message: {
          success: `وضعیت ${unitTypeNames[unitType]} با موفقیت تغییر کرد`,
          error: `خطا در تغییر وضعیت ${unitTypeNames[unitType]}!`,
        },
      },
    ),
  deleteUnitRequest: (unitCode, unitType) =>
    request(`${endpoint[unitType]()}/${unitCode}`).delete(
      {
        message: {
          success: ` ${unitTypeNames[unitType]} با موفقیت حذف شد`,
          error: `خطا در حذف ${unitTypeNames[unitType]}!`,
        },
      },
      {},
    ),
};
