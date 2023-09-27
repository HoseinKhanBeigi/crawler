import request from '../utils/request';

export const saleProductServices = {
  endPoint: 'saleProduct',
  getAllSaleProduct(page = 0, size = 15) {
    return request(
      `${this.endPoint}?${new URLSearchParams({
        page,
        size,
      }).toString()}`,
    ).get({
      message: {
        error: 'خطای دریافت اطلاعات محصولات',
      },
    });
  },
  addNewSaleProduct(body) {
    return request(`${this.endPoint}`).post(body, {
      message: {
        error: 'خطای ثبت اطلاعات محصول',
        success: 'محصول با موفقیت ثبت شد',
      },
    });
  },
  editSaleProduct(body) {
    return request(`${this.endPoint}`).put(body, {
      message: {
        error: 'خطای ویرایش اطلاعات محصول',
        success: 'محصول با موفقیت ویرایش شد',
      },
    });
  },
};
