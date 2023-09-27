/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useCallback } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Icon, Row, Spin } from 'antd';
import Webcam from 'react-webcam';
// eslint-disable-next-line css-modules/no-unused-class
import s from './VideoStage.scss';
import CircleCounter from '../../../../components/CircleCounter/CircleCounter';
import VideoDownTimer from '../VideoStage/VideoDownTimer';
import CPButton from '../../../../components/CP/CPButton';
import StageGuid from '../StageGuid/StageGuid';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import { dataURLtoFile } from '../../../../utils/convertBase64ToFile';
import { getBase64 } from '../../../../utils/convertToBase64';
import VideoPlayback from '../../../../components/VideoPlayback';

const VideoStage = props => {
  const { data: kycData, onSuccessUpload } = props;
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [playBackUrl, setPlayBackUrl] = useState(null);
  const [guidVisiblity, setGuidVisiblity] = useState(true);
  const [videTimerCounter, setVideTimerCounter] = useState(false);
  const [finishCapture, setFinishCapture] = useState(false);
  const [loading, setLoading] = useState(false);
  const readyVideoToPlay = data => {
    const url = URL.createObjectURL(data);
    setPlayBackUrl(url);
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        readyVideoToPlay(data);
        setRecordedChunks(prev => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setFinishCapture(true);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setVideTimerCounter(false);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const visibleGuid = () => {
    setGuidVisiblity(false);
    setGuidVisiblity(!guidVisiblity);
  };

  const visibleVideTimerCounter = () => {
    setGuidVisiblity(false);
    setVideTimerCounter(true);
  };

  const retry = () => setFinishCapture(false);

  const convertToFile = (base64, id) => dataURLtoFile(base64, id, false);

  const postUpload = async () => {
    const { id } = kycData;
    setLoading(true);
    const filename = `${id}.webm`;
    const base64 = await getBase64(recordedChunks[0]);
    const file = convertToFile(base64, filename);
    videoAuthenticationService.postUploadKycVideo(id, file).then(
      () => {
        onSuccessUpload();
        setLoading(false);
      },
      () => setLoading(false),
    );
  };

  function renderRecordBtn() {
    return (
      <div className={s.shot_btn_container}>
        <Icon
          style={{
            backgroundColor: '#1c92ff',
          }}
          type="video-camera"
          theme="filled"
          onClick={visibleVideTimerCounter}
          className={s.icon_camera}
        />
        <div className={s.shot_btn_caption}>ویدئو بگیر</div>
      </div>
    );
  }

  function renderApprovBtn() {
    const antIcon = (
      <Icon
        type="loading"
        className={s.icon_approv}
        style={{ fontSize: 24, padding: '9px 9px' }}
        spin
      />
    );
    return (
      <div className={s.btn_approvment}>
        {!loading && (
          <Icon type="check" className={s.icon_approv} onClick={postUpload} />
        )}
        {loading && <Spin indicator={antIcon} />}
        <div className={s.shot_btn_caption}>تایید ویدئو</div>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: '100%' }}>
        <div className={s.photo_container}>
          <div className={s.cameraContainer}>
            {!finishCapture && (
              <Webcam
                audio
                ref={webcamRef}
                width={1256}
                height={699}
                videoConstraints={{ width: 1256, height: 699 }}
              />
            )}
            {finishCapture && <VideoPlayback src={playBackUrl} />}
          </div>
          <StageGuid
            onChangeVisibilty={visibleGuid}
            visiblity={guidVisiblity}
            title="راهنمای تصویری"
            desc="در این 10 ثانیه لطفا جمله ای که به شما نمایش داده میشود را بگویید"
          />
          {videTimerCounter && (
            <VideoDownTimer
              visiblity={videTimerCounter}
              onZero={handleStartCaptureClick}
            />
          )}
        </div>
        <div className={s.footer}>
          <Row gutter={24} style={{ height: '100px' }}>
            {!finishCapture && (
              <div className={s.footer__section__toDo}>
                <div className={s.footer__section__toDo_title}>
                  لطفا این جمله را در ویدئو بگویید
                </div>
                <div className={s.footer__section__toDo_main}>
                  {kycData?.question}
                </div>
              </div>
            )}
            <div className={s.footer__btn_shot}>
              {!capturing && !finishCapture ? (
                renderRecordBtn()
              ) : !finishCapture && capturing ? (
                <div className={s.shot_btn_container}>
                  <Icon
                    style={{
                      backgroundColor: '#ff4d4f',
                    }}
                    type="video-camera"
                    theme="filled"
                    className={s.icon_camera}
                  />
                  <CircleCounter
                    visiblity={capturing}
                    onZero={handleStopCaptureClick}
                  />
                </div>
              ) : (
                ''
              )}
              {finishCapture && (
                <>
                  {renderApprovBtn()}
                  <div className={s.btn_retake}>
                    <Icon
                      type="reload"
                      className={s.icon_retake}
                      onClick={retry}
                    />
                    <div className={s.shot_btn_caption}>دوباره ویدئو بگیر</div>
                  </div>
                </>
              )}
              <div className={s.info_container}>
                <Icon
                  type="info-circle"
                  className={s.info_icon}
                  onClick={visibleGuid}
                />
                <CPButton
                  type="link"
                  onClick={visibleGuid}
                  className={s.info_caption}
                >
                  راهنمای تصویری
                </CPButton>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

VideoStage.propTypes = {
  data: PropTypes.object,
  onSuccessUpload: PropTypes.func,
};
VideoStage.defaultProps = {
  data: {},
  onSuccessUpload: () => {},
};

export default withStyles(s)(VideoStage);
