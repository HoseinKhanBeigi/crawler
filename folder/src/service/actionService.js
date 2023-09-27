import request from '../utils/request';

// PUT /api/v3/{context}/action/opportunity/command/{code}/{levantId}
const doAction = (action, levantId, productCode, actionTitle = '') =>
  request({
    url: `action/opportunity/do-action/${action}/${levantId}`,
    params: {
      productCode,
    },
  }).put(null, {
    message: {
      success: `عملیات ${actionTitle} با موفقیت انجام شد`,
      error: `عملیات ${actionTitle} ناموفق بود`,
    },
  });

export default {
  doAction,
};
