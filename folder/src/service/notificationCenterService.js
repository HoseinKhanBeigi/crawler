import request from '../utils/request';

export const notifCenterServices = {
  getAllOrganizationSections: () =>
    request('section/all').get({
      message: {
        error: 'خطای دریافت اطلاعات',
      },
    }),
  addNewOrganizationSection: values =>
    request('section').post(values, {
      message: {
        error: 'خطای ارسال اطلاعات',
        success: 'اطلاعات با موفقیت ارسال شد',
      },
    }),
  getOrganizationSectionById: id =>
    request(`section/${id}`).get({
      message: {
        error: 'خطای دریافت اطلاعات',
      },
    }),
  editOrganizationSection: body =>
    request(`section`).put(body, {
      message: {
        success: 'اطلاعات ثبت گردید',
        error: 'خطای تکمیل اطلاعات',
      },
    }),
  deleteOrganizationSection: id =>
    request(`section/${id}`).delete({
      message: {
        success: 'اطلاعات با موفقیت پاک شد',
        error: 'خطای حذف اطلاعات',
      },
    }),
};
