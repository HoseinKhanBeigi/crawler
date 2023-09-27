import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

// GET /api/v1/file/download
const downloadFile = (path, objectToken) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.GLUSTER_URL,
    )}/file/download?filename=${path}`,
  ).download({
    message: {
      error: 'خطای دانلود فایل',
    },
    objectToken,
  });

// GET /glusterproxy/api/v1/file/download?filename=${path}
const getGlusterFile = (path, objectToken) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.GLUSTER_URL,
    )}/file/download?filename=${path}`,
  ).get({
    message: {
      error: 'خطای دریافت فایل',
    },
    objectToken,
    shouldBlob: true,
  });

export default {
  downloadFile,
  getGlusterFile,
};
