import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

export const inquiryIbanWithCardNumber = async (cardNumber = '') =>
  request('faraboom/card/card-to-iban').post({ pan: cardNumber });

export const inquiryNeshanStatus = async (mobileNumber = '') =>
  request(
    `neshan/users/inquiry?${new URLSearchParams({ mobileNumber }).toString()}`,
  ).get();

// POST crm/api/v3/{Context}/ocr/national-card
export const postUploadNationlCardOcr = async file =>
  request(
    `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/ocr/national-card`,
  ).post(file, {
    message: {
      success: 'کارت ملی موردنظر با موفقیت آپلود شد.',
      error: 'خطا در آپلود کارت ملی!',
    },
    shouldUpload: true,
  });

// POST crm/api/v3/{Context}/cheque/qr
export const postChequQrOcr = async file =>
  request(`${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/cheque/qr`).post(
    file,
    {
      message: {
        success: 'چک بانکی موردنظر با موفقیت آپلود شد.',
        error: 'خطا در آپلود چک بانکی!',
      },
      shouldUpload: true,
    },
  );

export const postBankCreditCardOcr = async file =>
  request(
    `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/ocr/credit-card`,
  ).post(file, {
    message: {
      success: 'کارت بانکی موردنظر با موفقیت آپلود شد.',
      error: 'خطا در آپلود کارت بانکی!',
    },
    shouldUpload: true,
  });

export const changeNeshanUserStatus = async (mobileNumber = '', status = '') =>
  request(
    `neshan/users/change-status?${new URLSearchParams({
      mobileNumber,
      status,
    }).toString()}`,
  ).put({});

// POST crm/api/v3/{Context}/sejam-refetch/request-otp/{nationalCode}'
export const postSejaRefetchRequestOTP = async nationalCode =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BASE_URL,
    )}/sejam-refetch/request-otp/${nationalCode}`,
  ).post(null, {
    message: {
      success: 'ارسال درخواست OTP با موفقیت انجام شد.',
      error: 'خطا در ارسال درخواست OTP',
    },
    mock: 'false',
  });
// POST crm/api/v3/{Context}/sejam-refetch/fetchData'
export const postSejamRefetchOtpCode = async body =>
  request(
    `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/sejam-refetch/fetchData`,
  ).post(body, {
    message: {
      success: 'ارسال درخواست OTP با موفقیت انجام شد.',
      error: 'خطا در ارسال درخواست OTP',
    },
    agent: 'webapp',
    mock: 'false',
  });
