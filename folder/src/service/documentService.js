import request from '../utils/request';

// POST /api/v3/{context}/document/print/activity
const insertPrintActivity = (title, documentType, targetLevantId) =>
  request('document/print/activity').post({
    title,
    documentType,
    targetLevantId,
  });

export default {
  insertPrintActivity,
};
