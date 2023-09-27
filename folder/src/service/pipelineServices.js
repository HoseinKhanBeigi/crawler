import request from '../utils/request';

const getPipelineProductActions = (productCode, pipelineId) =>
  request(
    `action/pipeline-actions/${productCode}?pipelineId=${pipelineId}`,
  ).get({
    message: {
      error: 'خطا در دریافت تنظیمات محصول!',
    },
  });

const getPipelines = productCode =>
  request(`pipelines/thin/${productCode}`).get({
    message: {
      error: 'خطا در دریافت تنظیمات محصول!',
    },
  });

export default {
  getPipelineProductActions,
  getPipelines,
};
