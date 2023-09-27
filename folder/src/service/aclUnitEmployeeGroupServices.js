import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';
import request from '../utils/request';

const aclUnitEmployeeGroupServices = {
  endpoint: `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/acl-unit-employee-group`,
  updateEmployeeRole(unitEmployeeId, aclGroupId) {
    return request(
      `${this.endpoint}/assign/${unitEmployeeId}/${aclGroupId}`,
    ).put(
      {},
      {
        message: {
          error: 'خطای تغییر نقش کاربر',
          success: 'نقش کاربر مورد نظر با موفقیت تغییر کرد',
        },
      },
    );
  },
};
export default aclUnitEmployeeGroupServices;
