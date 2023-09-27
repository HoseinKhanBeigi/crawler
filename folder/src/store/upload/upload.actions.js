/* eslint-disable import/prefer-default-export */

import {
  POST_UPLOAD_FILE_FAILURE,
  POST_UPLOAD_FILE_REQUEST,
  POST_UPLOAD_FILE_SUCCESS,
} from './upload.constants';

export function postUploadFileAction(params) {
  return (dispatch, getState, { postUploadFileRequest }) => {
    dispatch({ type: POST_UPLOAD_FILE_REQUEST });
    return postUploadFileRequest(params).then(data => {
      if (data.err) {
        dispatch({ type: POST_UPLOAD_FILE_FAILURE, payload: data });
        return data;
      }
      dispatch({ type: POST_UPLOAD_FILE_SUCCESS, payload: data.resp });
      return data.resp;
    });
  };
}
