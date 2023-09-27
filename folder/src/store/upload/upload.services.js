import {
  BASE_VARIABLE_KEYS,
  PostFileData,
  resolveVariable,
} from '../../serviceConfig';

export const uploadFileUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.GLUSTER_URL)}/file/upload`;

export function createPostUploadFileRequest(fetch, token) {
  return async function uploadFileRequest(body) {
    return PostFileData(fetch, uploadFileUrl(), body, token);
  };
}
