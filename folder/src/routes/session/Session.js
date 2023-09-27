import React, { useEffect, useState } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { sessionServices } from '../../service/sessionService';
import s from './Session.scss';
import CPLoading from '../../components/CP/CPLoading';
import RenderDetailRow from '../sessions/components/SessionDrawer/components/RenderDetailRow/RenderDetailRow';
import RenderUploadPreview from '../sessions/components/SessionDrawer/components/RenderUploadPreview/RenderUploadPreview';
import { itemsList } from '../sessions/components/SessionDrawer/constant/itemsList';
import CPButton from '../../components/CP/CPButton';
import CommentsDrawer from '../sessions/components/CommentsDrawer/CommentsDrawer';
import useSessionGetFilesUrl from '../sessions/hooks/useSessionGetFilesUrl';

const Session = ({ sessionId }) => {
  const [sessionData, setSessionData] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [error, setError] = useState(false);
  const { filesUrl } = useSessionGetFilesUrl(sessionData);
  useEffect(() => {
    sessionServices.getSessionDetailById(sessionId).then(res => {
      if (res.additionalInfo?.ok) {
        const { additionalInfo, ...data } = res;
        if (data) {
          setSessionData(data);
        }
      } else {
        setError(true);
      }
    });
  }, []);
  useEffect(() => {});

  const [, ...items] = itemsList(sessionData);

  return (
    <div className={s.wrapper}>
      {!error ? (
        sessionData ? (
          <div className={s.container}>
            <div className={s.header}>
              <p>{sessionData.name}</p>
              <div className={s.header__buttons}>
                <CPButton onClick={() => setShowComment(true)}>نظرات</CPButton>
              </div>
            </div>
            <div className={s.main}>
              <div>
                {items.map(item => (
                  <RenderDetailRow data={item.data} title={item.title} />
                ))}
              </div>
              <div className={s.uploads}>
                <RenderUploadPreview
                  fileList={sessionData.sessionAttachments}
                  filesUrl={filesUrl}
                  proceeding
                />
                <RenderUploadPreview
                  fileList={sessionData.sessionAttachments}
                  filesUrl={filesUrl}
                />
              </div>
            </div>
            <CommentsDrawer
              onClose={() => setShowComment(false)}
              showComment={showComment}
              sessionId={sessionId}
            />
          </div>
        ) : (
          <CPLoading spinning size="large" />
        )
      ) : (
        <p>جلسه مورد نظر یافت نشد</p>
      )}
    </div>
  );
};

Session.propTypes = {
  sessionId: PropTypes.number.isRequired,
};
export default withStyle(s)(Session);
