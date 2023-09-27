import request from '../utils/request';

// GET /api/v3/{context}/opportunity/opportunity-excel-report
const downloadOpportunityExcelReport = (
  productCode,
  pipelineId = '',
  title = '',
) => {
  const params = { productCode };
  if (pipelineId) params.pipelineId = pipelineId;
  return request({
    url: 'opportunity/opportunity-excel-report',
    params,
  }).download({
    fileName: `${productCode}-${pipelineId}-${title}-report.xlsx`,
    message: {
      error: 'خطای دانلود گزارش فرصت‌ها',
    },
  });
};

// GET /api/v3/{context}/opportunity/identification/{opportunityId}
const getIdentification = id =>
  request(`opportunity/identification/${id}`).get({
    message: {
      error: 'خطای دریافت اطلاعات فرصت',
    },
  });

// POST /api/v3/{context}/party/qrs/{opportunityId}/generate
const generateQRCode = opportunityId =>
  request(`party/qrs/${opportunityId}/generate`).post(null, {
    message: {
      success: 'کد QR با موفقیت ایجاد گردید',
      error: 'خطای ایجاد کد QR',
    },
  });

// GET /api/v3/{context}/party/qrs/{opportunityId}/print
const printQRCode = opportunityId =>
  request(`party/qrs/${opportunityId}/print`).download({
    fileName: `${opportunityId}-QR-Code.pdf`,
    message: {
      success: 'کد QR با موفقیت چاپ گردید',
      error: 'خطای چاپ کد QR',
    },
  });

// GET /api/v3/{context}/party/terminal-info/excel
const downloadSepDataAsExcel = levantId => {
  const params = levantId ? { justLevantIds: levantId } : {};
  return request({
    url: `party/terminal-info/excel`,
    params,
  }).download({
    fileName: `SEP-Kian-Business.xlsx`,
    message: {
      error: 'خطای دانلود اطلاعات SEP',
    },
  });
};

// PUT /api/v3/{context}/action/opportunity/do-action/{command}/{levantId}
const afterDownloadSepData = levantId =>
  request({
    url: `action/opportunity/do-action/DOWNLOAD_SEP_DATA/${levantId}`,
    params: {
      productCode: 'KIAN_BUSINESS',
    },
  }).put(null, {
    message: {
      error: 'خطای انجام اکشن بعد از دانلود اطلاعات Sep',
    },
  });

// POST /api/v3/{context}/party/terminal-info/excel
const uploadSepData = file =>
  request(`party/terminal-info/excel?fileName=${file?.name}`).upload(file, {
    message: {
      success: 'اطلاعات SEP با موفقیت بارگزاری شد.',
      error: 'خطای بارگزاری اطلاعات SEP',
    },
  });

// PUT /api/v3/{context}/party/additional-info/en-personal/{opportunityId}
const addBusinessPersonalAdditionalInfo = (id, body) =>
  request(`party/additional-info/en-personal/${id}`).put(body, {
    message: {
      success: 'اطلاعات ثبت گردید',
      error: 'خطای تکمیل اطلاعات شخصی',
    },
  });

// PUT /api/v3/{context}/party/additional-info/business/{opportunityId}
const addBusinessAdditionalInfo = (id, body) =>
  request(`party/additional-info/business/${id}`).put(body, {
    message: {
      success: 'اطلاعات کسب‌و‌کار با موفقیت تکمیل گردید',
      error: 'خطای تکمیل اطلاعات کسب و کار',
    },
  });

// PUT /api/v3/{context}/party/additional-info/terminal
const setTerminalAdditionalInfo = ({ ...body }) =>
  request('party/additional-info/terminal').put([body]);

// POST /api/v3/{context}/action/opportunity/do-action/{command}
const forwardAllSepPipeline = () =>
  request({
    url: `action/opportunity/do-action/DOWNLOAD_SEP_DATA`,
    params: {
      productCode: 'KIAN_BUSINESS',
      pipelineCode: 'sep',
    },
  }).post(null, {
    message: {
      error: 'خطای فرمان پیش‌برد مرحله sep',
      success:
        'کسب‌و‌کارهای مرحله sep با موفقیت به مرحله تکمیل اطلاعات رانده شدند',
    },
  });

// DELETE /api/v3/{context}/opportunity/{opportunityId}
const deleteOpportunity = (opportunity, reason = '') =>
  request(`opportunity/${opportunity.id}`).delete(
    {
      message: {
        success: `${opportunity.firstName} ${opportunity.lastName} حذف گردید.`,
        error: `خطایی در حذف ${opportunity.firstName} ${opportunity.lastName} رخ داده است!`,
      },
    },
    reason,
  );

// GET /api/v3/{context}/products/{productCode}/pipelines
const getPipelines = productCode =>
  request(`products/${productCode}/pipelines`).get({
    message: {
      error: 'خطای دریافت پایپ‌لاین‌ها',
    },
  });

// POST /api/v3/{context}/opportunity/sendSms/{pipelineId}/{productCode}
const sendSmsToPipeline = (pipelineId, productCode, body) =>
  request(`opportunity/sendSms/${pipelineId}/${productCode}`).post(body, {
    message: {
      success: 'پیامک‌ها با موفقیت به فرصت‌های پایپلاین انتخابی ارسال گردید',
      error: 'خطای ارسال پیامک',
    },
  });

// GET /api/v3/{context}/credit/contract-type
const sayaContractTypes = () =>
  request('credit/contract-type').get({
    message: {
      error: 'خطای دریافت لیست انتخابی نوع قرارداد',
    },
  });

// PUT /api/v3/{context}/credit/opportunity/{opportunityId}/complete-data-credit
const completeSayaCreditData = (id, body) =>
  request(`credit/opportunity/${id}/complete-data-credit`).put(body, {
    message: {
      error: 'خطای تکمیل اطلاعات سایا',
      success: 'اطلاعات تکمیلی سایا با موفقیت ثبت گردید',
    },
  });

// PUT /api/v3/{context}/action/opportunity/{opportunityId}/create-credit
const createSayaCredit = id =>
  request(`action/opportunity/${id}/create-credit`).put(null, {
    message: {
      error: 'خطای اختصاص دادن اعتبار',
      info: 'وضعیت تخصیص اعتبار مشخص گردید',
    },
  });

// PUT /api/v3/{context}/action/opportunity/{opportunityId}/active-credit
const activeSayaCredit = id =>
  request(`action/opportunity/${id}/active-credit`).put(null, {
    message: {
      error: 'خطای فعال‌سازی',
      success: 'فعال‌سازی با موفقیت انجام شد',
    },
  });
// patch /api/v3/{context}/opportunity/modify/{levantId}/{opportunityId}
const editIdentificationInfo = (levantId, opportunityId, body) => {
  request(`/opportunity/modify/${levantId}/${opportunityId}`).patch(body, {
    message: {
      error: 'خطای در انجام ویرایش!',
      success: 'ویرایش با موفقیت انجام شد',
    },
  });
};

const inquiryBusinessInfo = companyId =>
  request('rasmio/company/companyDetail').post({ companyId });

const inquiryStakeholdersInfo = companyId =>
  request('rasmio/company/signatureHolders').post({ companyId });

export default {
  addBusinessPersonalAdditionalInfo,
  downloadOpportunityExcelReport,
  setTerminalAdditionalInfo,
  addBusinessAdditionalInfo,
  downloadSepDataAsExcel,
  completeSayaCreditData,
  forwardAllSepPipeline,
  afterDownloadSepData,
  sendSmsToPipeline,
  deleteOpportunity,
  sayaContractTypes,
  getIdentification,
  createSayaCredit,
  activeSayaCredit,
  generateQRCode,
  uploadSepData,
  getPipelines,
  printQRCode,
  editIdentificationInfo,
  inquiryBusinessInfo,
  inquiryStakeholdersInfo,
};
