import { useEffect, useState } from 'react';
import { sessionServices } from '../../../service/sessionService';

const useSessionComment = (showComment, sessionId, creatorLevantId) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  useEffect(() => {
    if (sessionId && showComment) {
      setLoading(true);
      sessionServices.getCommentsBySessionId(sessionId).then(response => {
        setLoading(false);
        setComments(Array.isArray(response.result) ? response.result : []);
      });
    }
  }, [sessionId, showComment]);
  const postNewComment = description => {
    const body = {
      creatorLevantId,
      description,
      sessionId,
    };
    sessionServices.postNewComment(body).then(res => {
      const { additionalInfo, ...data } = res;
      setComments(prevComments => [data, ...prevComments]);
    });
  };
  return { loading, comments, postNewComment };
};
export default useSessionComment;
