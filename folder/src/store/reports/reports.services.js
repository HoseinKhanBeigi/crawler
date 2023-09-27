import {
  BASE_VARIABLE_KEYS,
  basicDownload,
  resolveVariable,
} from '../../serviceConfig';
import { mockService } from '../../webConfig';
import CallsMockData from '../../../restApiDesign/reports/calls.json';

export const downloadExcelUrl = endpoint =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/${endpoint}`;

export function createDownloadTableExcelRequest(fetch, token) {
  return async function downloadTableExcelRequest(from, to, endpoint, query) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: CallsMockData,
      };
    }

    return basicDownload(
      fetch,
      `${downloadExcelUrl(endpoint)}?from=${from}&to=${to}${query}`,
      token,
    );
  };
}
