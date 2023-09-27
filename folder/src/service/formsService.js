import request from '../utils/request';

// GET /api/v3/{context}/forms/{formId}/{levantId}/pdf
const downloadForm = (formId, levantId, fileName) =>
  request(`forms/${formId}/${levantId}/pdf`).download({
    fileName,
    message: {
      error: 'خطایی در چاپ فرم رخ داده است',
    },
  });

export default {
  downloadForm,
};
