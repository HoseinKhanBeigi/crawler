import {
  DOC_DOWNLOAD_FAILURE,
  DOC_DOWNLOAD_REQUEST,
  DOC_DOWNLOAD_SUCCESS,
} from './docDownload.constants';

export function docDownloadRequest() {
  return {
    type: DOC_DOWNLOAD_REQUEST,
  };
}

export function docDownloadSuccess(data) {
  return {
    type: DOC_DOWNLOAD_SUCCESS,
    payload: data,
  };
}

export function docDownloadFailure(error) {
  return {
    type: DOC_DOWNLOAD_FAILURE,
    payload: error,
  };
}

export function getDocAction(params) {
  return (dispatch, getState, { getDocDownloadRequest }) =>
    getDocDownloadRequest(params).then(data => data);
}

export function getFileTokenAction(body) {
  return (dispatch, getState, { getFileTokenRequest }) =>
    getFileTokenRequest(body);
}

export function getDocDownloadAction(params) {
  return (dispatch, getState, { getDocDownloadRequest }) => {
    dispatch(docDownloadRequest());
    return getDocDownloadRequest(params).then(data => {
      if (data.err) {
        dispatch(docDownloadFailure(data));
        return false;
      }
      dispatch(docDownloadSuccess(data));
      return data;
    });
  };
}
