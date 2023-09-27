import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

const adminBaseUrlService = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/admin/kycVideo`;
const usermgmtBaseUrlService = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.HOST)}/usermgmt/api/v2/kycVideo/`;
// const kycUrl = `${host}/kyc/admin`;

// GET /usermgmt/api/v2/kycVideo/start
const getStratVideoKyc = () =>
  request(`${usermgmtBaseUrlService()}start`).get({
    message: { error: 'خطا در شروع عملیات احراز هویت ویدویی!' },
  });

// GET /usermgmt/api/v2/kycVideo/{id}
const getVideoKycById = id =>
  request(`${usermgmtBaseUrlService()}/${id}`).get({
    message: { error: 'خطا در دریافت اطلاعات احراز هویت!' },
  });

// POST /usermgmt/api/v2/kycVideo/image/upload
const postUploadKycPhoto = (id, file) =>
  request(`${usermgmtBaseUrlService()}image/upload?id=${id}`).post(file, {
    message: {
      error: 'خطا در ارسال عکس شما!',
    },
    shouldUpload: true,
  });

// POST /usermgmt/api/v2/kycVideo/image/upload
const postUploadKycVideo = (id, file) =>
  request(`${usermgmtBaseUrlService()}video/upload?id=${id}`).post(file, {
    message: {
      error: 'خطا در ارسال فیلم شما!',
    },
    shouldUpload: true,
  });

// POST ${host}/crm/api/v3/${Context}/admin/kycVideo/reject/${id}`
const postRejectVideoKyc = (id, body) =>
  request(`${adminBaseUrlService()}/reject/${id}`).post(body, {
    message: {
      error: 'خطا در رد این مورد!',
      success: 'مورد موردنظر با موفقیت رد شد.',
    },
  });

// POST ${host}/crm/api/v3/${Context}/admin/kycVideo/reject/${id}`
const postApproveVideoKyc = id =>
  request(`${adminBaseUrlService()}/approve/${id}`).post(null, {
    message: {
      error: 'خطا در تایید این مورد!',
      success: 'مورد موردنظر با موفقیت تایید شد.',
    },
  });

// POST ${host}/crm/api/v3/${Context}/admin/kycVideo/download
const getKycVideoDownloadFile = (id, type) =>
  request(
    `${adminBaseUrlService()}/download?id=${id}&documentKind=${type}`,
  ).get({
    message: {
      error: 'خطا در دریافت فایل!',
    },
    shouldBlob: true,
  });
// GET /api/v3/{context}/admin/kycVideo/rejectionCauses
const getRejectionCausesList = () =>
  request(`${adminBaseUrlService()}/rejectionCauses`).get({
    message: { error: 'خطا در شروع عملیات احراز هویت ویدویی!' },
  });

// GET /api/v3/{context}/admin/kycVideo/report/aggregate/status?kycId=${kycId}
const getKYCReportStatuses = kycId =>
  request(`${adminBaseUrlService()}/kyc/extra-data/${kycId}`).get({
    message: { error: 'خطا در شروع عملیات احراز هویت ویدویی!' },
  });
export default {
  getStratVideoKyc,
  postUploadKycPhoto,
  postUploadKycVideo,
  postRejectVideoKyc,
  postApproveVideoKyc,
  getKycVideoDownloadFile,
  getRejectionCausesList,
  getVideoKycById,
  getKYCReportStatuses,
};
