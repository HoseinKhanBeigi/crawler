import request from '../utils/request';

const getTemplates = () =>
  request('template/systemic/template/ONBOARDING/SMS').get({
    message: {
      error: 'خطا در ثبت قالب!',
    },
    params: {
      page: 0,
      size: 1000,
    },
  });

const createNewProductSetting = body =>
  request('actionNotification').post(body, {
    message: {
      success: 'تنظیمات شما با موفقیت ثبت شد.',
      error: 'خطا در ثبت قالب!',
    },
  });

const editProductSetting = body =>
  request('actionNotification').put(body, {
    message: {
      success: 'تنظیمات شما با موفقیت ویرایش شد.',
      error: 'خطا در ویرایش قالب!',
    },
  });

const doActionOnProductSetting = body =>
  request(`actionNotification/activate/${body.id}?active=${body.action}`).put(
    {},
  );

const deleteProductSetting = id =>
  request(`actionNotification/${id}`).delete({});

export default {
  createNewProductSetting,
  editProductSetting,
  doActionOnProductSetting,
  getTemplates,
  deleteProductSetting,
};
