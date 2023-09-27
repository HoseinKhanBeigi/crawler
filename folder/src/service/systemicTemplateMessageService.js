import request from '../utils/request';

const createNewSystemicMessage = body =>
  request('template/systemic').post(body, {
    message: {
      success: 'قالب شما با موفقیت ثبت شد.',
      error: 'خطا در ثبت قالب!',
    },
  });

const editSystemicMessage = body =>
  request('template/systemic').put(body, {
    message: {
      success: 'قالب شما با موفقیت ویرایش شد.',
      error: 'خطا در ویرایش قالب!',
    },
  });

const doActionOnSystemicMessage = body =>
  request('/template/systemic/action').post(body, {
    message: {
      success: 'قالب شما با موفقیت ویرایش شد.',
      error: 'خطا در ویرایش قالب!',
    },
  });

const getSectionTokens = section =>
  request(`/actionNotification/token-key/${section}`).get();

export default {
  createNewSystemicMessage,
  editSystemicMessage,
  doActionOnSystemicMessage,
  getSectionTokens,
};
