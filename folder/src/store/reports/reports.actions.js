/* eslint-disable import/prefer-default-export */

export function downloadTableExcelAction(from, to, endpoint, query = '') {
  return (dispatch, getState, { downloadTableExcelRequest }) =>
    downloadTableExcelRequest(from, to, endpoint, query);
}
