import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import s from './SelfiVideoSection.scss';
import withModal from '../../../HOC/withModal';
import VideoCard from '../VideoCard/VideoCard';
import PreveiwHandGestures from './PreveiwHandGestures';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import { MODAL_FOR_VIDEO_PLAYBACK } from '../../../ModalRoot/repository';
import BadgeStatus from '../BadgeStatus';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import CPAlert from '../../../CP/CPAlert';

const hasInquiryImage = [
  'SIGNATURE',
  'SUBMITTED',
  'APPROVED',
  'REJECTED',
  'VIDEO',
];

const SelfiVideoSection = props => {
  const {
    id,
    gestureExceptedResult,
    videoSelfiKycResult,
    status,
    handleChange,
    withApproveButton,
    stateData,
    rejectedByQC,
    primary,
  } = props;
  const [selfiPartyDocumentVideo, setSelfiPartyDocumentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { kycVideoCaptchaStatus } = stateData;
  const shouldShowBadgeStatus =
    (status === 'VIDEO' ||
      status === 'SIGNATURE' ||
      status === 'REJECTED' ||
      status === 'SUBMITTED') &&
    videoSelfiKycResult?.resultType;

  useEffect(() => {
    const getVideo = () => {
      setLoading(true);
      videoAuthenticationService.getKycVideoDownloadFile(id, 'VIDEO').then(
        response => {
          const src = window.URL.createObjectURL(response?.result);
          setSelfiPartyDocumentVideo(src);
          setLoading(false);
        },
        () => setLoading(false),
      );
    };
    if (hasInquiryImage.includes(status) && videoSelfiKycResult?.resultType)
      getVideo();
  }, [status]);

  const openPlayBackModal = () => {
    props.showModalAction({
      type: MODAL_FOR_VIDEO_PLAYBACK,
      props: {
        gestureExceptedResult,
        selfiPartyDocumentVideo,
      },
    });
  };

  const renderGestureAlert = () =>
    gestureExceptedResult?.resultType &&
    !gestureExceptedResult?.verified && (
      <CPAlert
        type="error"
        message="عدم مطابقت حرکات انجام شده با حرکات درخواست شده"
        showIcon
      />
    );

  const renderVideoAlert = () =>
    videoSelfiKycResult?.resultType &&
    !videoSelfiKycResult?.verified && (
      <CPAlert type="error" message="عدم مطابقت تصویر شناسایی شده" showIcon />
    );
  return (
    <>
      <Row
        gutter={24}
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginTop: '16px' }}
      >
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          style={{
            marginTop: 16,
            padding: !withApproveButton ? '0 15px' : '0',
            width: !withApproveButton ? '100%' : 'auto',
          }}
        >
          <div className={s.row}>
            <span
              className={s.selfi_pic_title}
              style={{ paddingLeft: withApproveButton ? '12px' : '0' }}
            >
              ویدئو سلفی
            </span>
            {shouldShowBadgeStatus && (
              <BadgeStatus
                isVerify={
                  videoSelfiKycResult?.verified &&
                  gestureExceptedResult?.verified
                }
              />
            )}
          </div>
        </Row>
        {withApproveButton && (
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={kycVideoCaptchaStatus}
            item="kycVideoCaptchaStatus"
            rejectedByQC={rejectedByQC}
          />
        )}
      </Row>
      <div style={{ margin: '12px 0 6px 0' }}>{renderVideoAlert()}</div>
      {renderGestureAlert()}
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginTop: 16 }}
      >
        <VideoCard
          title="فیلم بارگذاری شده"
          src={selfiPartyDocumentVideo}
          loading={loading}
          onPlay={openPlayBackModal}
        />
        <PreveiwHandGestures data={gestureExceptedResult} />
      </Row>
    </>
  );
};

SelfiVideoSection.propTypes = {
  id: PropTypes.string,
  videoSelfiKycResult: PropTypes.object,
  status: PropTypes.string,
  gestureExceptedResult: PropTypes.object,
  showModalAction: PropTypes.func.isRequired,
  withApproveButton: PropTypes.bool,
  stateData: PropTypes.object,
  handleChange: PropTypes.func,
  rejectedByQC: PropTypes.bool,
  primary: PropTypes.string,
};
SelfiVideoSection.defaultProps = {
  id: '',
  gestureExceptedResult: {},
  videoSelfiKycResult: {},
  status: '',
  handleChange: () => {},
  withApproveButton: false,
  rejectedByQC: false,
  stateData: {},
  primary: '',
};
export default withModal(withStyles(s)(SelfiVideoSection));
