import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

// GET /api/v3/{context}/activity/activities-excel-report
const downloadActivitiesExcelReport = (applicationName, levantId, panel) => {
  const params = {
    applicationName,
    levantId,
  };

  if (panel) {
    params.panel = panel;
  }
  return request({
    url: 'activity/activities-excel-report',
    params,
  }).download({
    fileName: 'activities-report.xlsx',
    message: {
      error: 'خطای دریافت گزارش فعالیت‌ها',
    },
  });
};

// GET /api/v3/{context}/activity/actions
const getActivitiesActionTypes = () =>
  request({
    url: 'activity/actions',
  }).get({
    message: {
      error: 'خطا در دریافت لیست نوع فعالیت ها',
    },
  });

// GET /api/v3/{context}/activity/activity/timeLine/${levantId}
const getTimelineActivity = (levantId, page, size) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BASE_URL,
    )}/activity/timeLine/${levantId}?page=${parseInt(page, 10)}&size=${parseInt(
      size,
      10,
    )}`,
  ).get({
    message: {
      error: 'خطا در دریافت لیست تایم لاین!',
    },
  });

export default {
  downloadActivitiesExcelReport,
  getActivitiesActionTypes,
  getTimelineActivity,
};
