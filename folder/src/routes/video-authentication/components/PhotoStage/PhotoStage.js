import React, { useState, useRef, useCallback } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
// eslint-disable-next-line css-modules/no-unused-class
import s from './PhotoStage.scss';
import StageGuid from '../StageGuid/StageGuid';
import CPButton from '../../../../components/CP/CPButton';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import { dataURLtoFile } from '../../../../utils/convertBase64ToFile';

const PhotoStage = props => {
  const { data, onSuccessUpload } = props;
  const [guidVisiblity, setGuidVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [maskVisiblity, setMaskVisiblity] = useState(false);

  const videoConstraints = {
    facingMode: 'user',
    width: 1256,
    height: 699,
  };

  const convertToFile = (base64, id) => dataURLtoFile(base64, id);

  const capture = useCallback(() => {
    const src = webcamRef.current.getScreenshot();
    setImgSrc(src);
  }, [webcamRef, setImgSrc]);

  const uploadPhoto = () => {
    setLoading(true);
    const { id } = data;
    const filename = `${id}.jpeg`;
    videoAuthenticationService
      .postUploadKycPhoto(id, convertToFile(imgSrc, filename))
      .then(
        () => {
          onSuccessUpload();
          setLoading(false);
        },
        () => setLoading(false),
      );
  };

  const retake = () => setImgSrc(null);

  const visibleGuid = () => setGuidVisiblity(!guidVisiblity);

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
          <Icon type="check" className={s.icon_approv} onClick={uploadPhoto} />
        )}
        {loading && <Spin indicator={antIcon} />}
        <div className={s.shot_btn_caption}>تایید تصویر</div>
      </div>
    );
  }

  function renderRetryBtn() {
    return (
      <div className={s.btn_retake}>
        <Icon type="reload" className={s.icon_retake} onClick={retake} />
        <div className={s.shot_btn_caption}>دوباره عکس بگیر</div>
      </div>
    );
  }

  const visibleMask = () => setMaskVisiblity(true);

  return (
    <>
      <div style={{ height: '100%' }}>
        <div className={s.photo_container}>
          {!imgSrc && (
            <>
              {maskVisiblity && <div className={s.mask} />}
              <Webcam
                onUserMedia={visibleMask}
                audio={false}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                screenshotFormat="image/jpeg"
              />
            </>
          )}
          {imgSrc && <img src={imgSrc} alt={imgSrc} />}
          <StageGuid
            onChangeVisibilty={visibleGuid}
            visiblity={guidVisiblity}
            title="راهنمای تصویری"
            desc=" تصویر شما باید از روبرو باشد و صورت شما در تصویر کاملا واضح
                باشد. دقت کنید در تصویر کلاه نداشته باشید و همچنین تصویر تار
                نشده باشد. در صورتی که تصویر تار شده بود، دوباره عکس بگیرید"
          />
        </div>
        <div className={s.footer}>
          <Row gutter={24} style={{ height: '100px' }}>
            <div className={s.footer__btn_shot}>
              {!imgSrc ? (
                <div className={s.shot_btn_container}>
                  <Icon
                    onClick={capture}
                    type="camera"
                    theme="filled"
                    className={s.icon_camera}
                  />
                  <div className={s.shot_btn_caption}>عکس بگیر</div>
                </div>
              ) : (
                <>
                  {renderApprovBtn()}
                  {renderRetryBtn()}
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

PhotoStage.propTypes = {
  data: PropTypes.object,
  onSuccessUpload: PropTypes.func,
};
PhotoStage.defaultProps = {
  data: {},
  onSuccessUpload: () => {},
};

export default withStyles(s)(PhotoStage);
