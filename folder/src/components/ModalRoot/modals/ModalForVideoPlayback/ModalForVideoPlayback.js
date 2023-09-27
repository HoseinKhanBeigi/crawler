import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_VIDEO_PLAYBACK } from '../../repository';
import s from './ModalForVideoPlayback.scss';
import VideoPlayback from '../../../VideoPlayback';
import PreveiwHandGestures from '../../../KYCVideo/components/SelfiVideoSection/PreveiwHandGestures';

const ModalForVideoPlayback = props => {
  const { selfiPartyDocumentVideo, gestureExceptedResult } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title="مشاهده ویدیو"
      className={s.modalForVideoPlayBack}
      footer={false}
      width={592}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_VIDEO_PLAYBACK}
    >
      <>
        <div className={s.container}>
          <div className={s.gestureContainer}>
            <PreveiwHandGestures
              data={gestureExceptedResult}
              bordered={false}
            />
          </div>
          <div className={s.videoContainer}>
            <VideoPlayback
              src={selfiPartyDocumentVideo}
              className={s.playBackModal}
            />
          </div>
        </div>
      </>
    </CPModal>
  );
};

ModalForVideoPlayback.propTypes = {
  gestureExceptedResult: PropTypes.string,
  selfiPartyDocumentVideo: PropTypes.string,
};
ModalForVideoPlayback.defaultProps = {
  gestureExceptedResult: '',
  selfiPartyDocumentVideo: '',
};

export default withStyles(s)(ModalForVideoPlayback);
