import request from '../utils/request';

// GET crm/api/v3/KIAN_DIGITAL/samat/legal?id={}id&nationalCode={nationalCode}
export const getSamatIdentificationInfo = param =>
  request(
    `samat/legal${param?.id ? `?id=${param?.id}` : ''}${
      param?.nationalCode ? `?nationalCode=${param?.nationalCode}` : ''
    }`,
  ).get({
    message: { error: 'خطا در دریافت اطلاعات اعتبارسنجی سمات!' },
  });

// GET crm/api/v3/KIAN_DIGITAL/samat/person?id={id}&nationalCode={nationalCode}
export const getSamatIlegalIdentificationInfo = param =>
  request(
    `samat/person${param?.id ? `?id=${param?.id}` : ''}${
      param?.nationalCode ? `?nationalCode=${param?.nationalCode}` : ''
    }`,
  ).get({
    message: { error: 'خطا در دریافت اطلاعات اعتبارسنجی سمات!' },
  });

// PUT crm/api/v3/KIAN_DIGITAL/credit-scoring
export const putSamatCreditScore = async param =>
  request(
    `credit-scoring/save/calculate${param?.id ? `?id=${param?.id}` : ''}${
      param?.nationalCode ? `?nationalCode=${param?.nationalCode}` : ''
    }`,
  ).put(null, {
    message: {
      error: 'خطا در دریافت اطلاعات اعتبارسنجی سمات!',
    },
  });

// PUT crm/api/v3/KIAN_DIGITAL/credit-scoring/save/calculate
export const putAddLegalValidation = async file =>
  request(`credit-scoring/save/calculate`).put(file, {
    message: {
      success: 'افرودن اعتبار سنجی حقوقی با موفقیت انجام شد.',
      error: 'خطا در افزودن اعتبارسنجی حقوقی!',
    },
  });

// PUT crm/api/v3/KIAN_DIGITAL/samat/person/list
export const postSamatPersonNationalCodesList = async (
  nationalCodes,
  opportunityId,
) =>
  request(`samat/person/list/${opportunityId}`).post(
    { nationalCodes: [...nationalCodes] },
    {
      message: {
        error: 'خطا در دریافت اطلاعات سمات حقیقی!',
      },
    },
  );
export default {
  getSamatIdentificationInfo,
  putSamatCreditScore,
  putAddLegalValidation,
  getSamatIlegalIdentificationInfo,
};
