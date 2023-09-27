import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

const operationManagementService = {
  getNonOperationalBranches: () =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/branch/list?operationType=NON_OPERATIONAL`,
    ).get({
      message: {
        error: 'خطای دریافت لیست شعب غیر عملیاتی',
      },
    }),
  getRelationOperationalBranches: id =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/operational-branch-relation?page=0&size=5&sortOn=id&sortDirection=DESC&example.sourceBranchId=${id}`,
    ).get({
      message: {
        error: 'خطای دریافت لیست شعب غیر عملیاتی مرتبط با یک شعبه عملیاتی',
      },
    }),
  addRelationOperationalBranches: (id, branchId) =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/operational-branch-relation`,
    ).post({
      sourceBranchId: id,
      targetBranchId: branchId,
    }),
  deleteRelationOperationalBranches: id =>
    request(
      `${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/operational-branch-relation/${id}`,
    ).delete({
      message: {
        error: 'خطای حذف شعب غیر عملیاتی مرتبط با یک شعبه عملیاتی',
      },
    }),
};

export default operationManagementService;
