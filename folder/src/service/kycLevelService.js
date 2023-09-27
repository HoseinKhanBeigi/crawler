import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

export default {
  getAllElements: () =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL,
      )}/get-all-elements`,
    ).get({
      message: {
        error: 'خطای دریافت لیست المان های احراز هویت',
      },
    }),
  addKycLevel: ({ name, kycElements, description }) =>
    request(resolveVariable(BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL)).post(
      {
        name,
        description,
        kycElements,
      },
      { message: { success: 'سطح جدید با موفقیت ثبت شد' } },
    ),
  editKycLevel: (id, { name, kycElements, description }) =>
    request(resolveVariable(BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL)).put(
      {
        id,
        name,
        description,
        kycElements,
      },
      { message: { success: 'سطح با موفقیت ویرایش شد' } },
    ),
  // eslint-disable-next-line no-unused-vars
  deleteKycLevel: name =>
    request(
      `${resolveVariable(BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL)}/${name}`,
    ).delete({
      message: {
        success: 'سطح با موفقیت حذف شد',
      },
    }),
  getLeadKycLevel: levantId =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL,
      )}/${levantId}`,
    ).get({
      message: {
        error: 'خطا در دریافت سطح احراز هویت!',
      },
    }),
};
