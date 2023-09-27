import { useEffect, useState } from 'react';
import { sessionServices } from '../../../service/sessionService';

const useSessionGetFilesUrl = sessionData => {
  const [filesUrl, setFilesUrl] = useState(null);

  const getAttachmentFiles = async ({ sessionAttachments }) => {
    const filesUrlHashMap = {};
    await Promise.all(
      sessionAttachments.map(async file => {
        const { id } = file;
        const { result } = await sessionServices.downloadSessionFile(id);
        filesUrlHashMap[id] = URL.createObjectURL(result);
      }),
    );
    return filesUrlHashMap;
  };

  useEffect(() => {
    if (sessionData && sessionData.sessionAttachments?.length) {
      getAttachmentFiles(sessionData).then(filesUrlHashMap =>
        setFilesUrl(filesUrlHashMap),
      );
    }
  }, [sessionData]);

  return {
    filesUrl,
  };
};

export default useSessionGetFilesUrl;
