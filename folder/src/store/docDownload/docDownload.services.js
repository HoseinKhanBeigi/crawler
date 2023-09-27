import {
  BASE_VARIABLE_KEYS,
  FetchDownload,
  mockService,
  PostData,
  resolveVariable,
} from '../../serviceConfig';

const docDownloadMockData = mockService
  ? require('../../../restApiDesign/docDownload')
  : {};

export const docDownloadUrl = path =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.GLUSTER_URL,
  )}/file/download?filename=${path}`;

const getFileTokenUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.GLUSTER_URL)}/file/token`;

export function createGetDocDownloadRequest(fetch, token) {
  return async function docDownloadRequest({ path, objectToken }) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        res: docDownloadMockData,
      };
    }
    return FetchDownload(fetch, docDownloadUrl(path), token, objectToken);
  };
}

export function createGetFileTokenRequest(fetch, token) {
  return async function getFileToken(body) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        res: docDownloadMockData,
      };
    }
    return PostData(fetch, getFileTokenUrl(), body, token);
  };
}
