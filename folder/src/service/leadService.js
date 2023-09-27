import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

const getCrmUserLead = (...aclCodes) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/acl-unit-employee-group/list?${new URLSearchParams({
      ...(aclCodes &&
        aclCodes.length && {
          aclGroupCodes: aclCodes.join(','),
        }),
    }).toString()}`,
  ).get({
    message: { error: 'خطای دریافت لیست کاربران' },
  });

const getCrmUserLeadsByUnitId = unitId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/acl-unit-employee-group/list?${new URLSearchParams({
      ...(unitId && {
        unitId,
      }),
    }).toString()}`,
  ).get({
    message: { error: 'خطای دریافت لیست کاربران' },
  });

const downloadLegalLeadSampleExcel = leadType => {
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BASE_URL,
    )}/columns/leads/export/excel/${leadType}`,
  ).download({
    fileName: `legal-lead-sample.xlsx`,
    message: {
      error: 'خطای دانلود اکسل سرنخ ها',
    },
  });
};

export default {
  getCrmUserLead,
  getCrmUserLeadsByUnitId,
  downloadLegalLeadSampleExcel,
};
