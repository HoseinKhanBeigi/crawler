import request from '../utils/request';

export const saleOpportunityServices = {
  getAllSaleOpportunities: () =>
    request(`saleOpportunity`).get({
      message: {
        error: 'خطای دریافت اطلاعات فرصت های فروش',
      },
    }),
  getSaleOpportunityById: id =>
    request(`saleOpportunity/${id}`).get({
      message: {
        error: 'خطای دریافت اطلاعات فرصت فروش',
      },
    }),
  postNewSaleOpportunity: body =>
    request('saleOpportunity').post(body, {
      message: {
        error: 'خطای ارسال اطلاعات',
        success: 'فرصت فروش با موفقیت ثبت شد',
      },
    }),
  editSaleOpportunity: body =>
    request('saleOpportunity').put(body, {
      message: {
        error: 'خطای ویرایش اطلاعات',
      },
    }),
  getAllSaleOpportunityStates: () =>
    request('saleOpportunity/state/all').get({
      message: {
        error: 'خطای دریافت اطلاعات',
      },
    }),
};
