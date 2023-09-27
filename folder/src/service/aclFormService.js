import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';
import request from '../utils/request';

const aclFormService = {
  aclActionEndPoint: () =>
    `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/acl-action`,
  aclGroupEndPoint: () =>
    `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/acl-group`,
  getAllActions() {
    return request(`${this.aclActionEndPoint()}/all`).get({
      message: {
        error: 'خطای دریافت لیست دسترسی ها',
      },
    });
  },
  getAllAclActions() {
    return request(`${this.aclGroupEndPoint()}/list`).get({
      message: {
        error: 'خطای دریافت لیست دسترسی ها',
      },
    });
  },
  getAclGroupById(id) {
    return request(`${this.aclGroupEndPoint()}/${id}`).get({
      message: {
        error: 'خطای دریافت لیست دسترسی',
      },
    });
  },
  postNewAclGroup(body) {
    return request(this.aclGroupEndPoint()).post(body, {
      message: {
        success: 'دسترسی با موفقیت اضافه شد',
        error: 'خطای ثبت دسترسی',
      },
    });
  },
  updateAclGroup(body) {
    return request(this.aclGroupEndPoint()).put(body, {
      message: {
        success: 'تغییرات دسترسی با موفقیت اعمال شد',
        error: 'خطای تغییر دسترسی',
      },
    });
  },
  deleteAclGroupById(id) {
    return request(`${this.aclGroupEndPoint()}/${id}`).delete({
      message: {
        success: 'دسترسی با موفقیت حذف شد',
        error: 'خطای حذف دسترسی',
      },
    });
  },
};
export default aclFormService;
