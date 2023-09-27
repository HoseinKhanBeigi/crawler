import React, { useState, useEffect } from 'react';
import { Col, Row, Icon, Result, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoAuthenticaion.scss';
import { stages } from './stages';
import PhotoStage from './components/PhotoStage/PhotoStage';
import VideoStage from './components/VideoStage/VideoStage';
import FinishStage from './components/FinishStage/FinishStage';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import Link from '../../components/Link';
import CPButton from '../../components/CP/CPButton';
import CPCountDown from '../../components/CP/CPCountDown';
import videoAuthenticationService from '../../service/videoAuthenticationService';
import { levantIds } from '../../utils/operatorLevantIds';
import RenderTimeLimitationModal from './RenderTimeLimitationModal';

const VideoAuthentication = props => {
  const { levantId } = props;
  const [currentStage, setCurrentStage] = useState(1);
  const [videKycData, setvideoKycData] = useState(null);

  const getStratVideoKyc = () =>
    videoAuthenticationService.getStratVideoKyc().then(response => {
      setvideoKycData(response);
    });

  const warningModal = () =>
    Modal.warning({
      title: 'محدودیت زمانی',
      className: s.modal_time_limitaion,
      content: <RenderTimeLimitationModal />,
      okText: 'متوجه شدم',
      width: 520,
      centered: true,
      onOk: getStratVideoKyc,
    });

  const restartStages = () => {
    setvideoKycData(null);
    setCurrentStage(1);
    getStratVideoKyc();
  };

  const finishModal = () =>
    Modal.error({
      title: 'اتمام زمان',
      className: s.modal_time_limitaion,
      content: <RenderTimeLimitationModal type="error" />,
      okText: 'شروع دوباره',
      width: 520,
      centered: true,
      onOk: restartStages,
    });

  useEffect(() => {
    warningModal();
  }, []);

  const renderStages = stage => {
    const { status, title, description } = stage;
    return (
      <div
        className={status === currentStage ? s.stage_active : s.stage}
        key={title}
      >
        <div className={s.title}>{title}</div>
        <div className={s.description}>{description}</div>
      </div>
    );
  };

  const renderTimeLimitation = () => (
    <>
      <Col span={24} align="center">
        <div className={s.countDownTime}>
          <span>زمان باقیمانده:</span>
          {!videKycData && <span>09:59</span>}
          {videKycData && (
            <CPCountDown valuePerSec={600} onZeroTimer={finishModal} />
          )}
        </div>
      </Col>
    </>
  );

  const nextStage = () => {
    const next = currentStage + 1;
    setCurrentStage(next);
  };

  const env = resolveVariable(BASE_VARIABLE_KEYS.ENV_MODE);
  return (
    <>
      {(env === 'production' && levantIds.includes(levantId)) ||
      env !== 'production' ? (
        <Row gutter={24} style={{ marginTop: '30px' }}>
          <Col span={24}>
            <Col span={6}>
              <h3 className={s.headerTitle}>
                <Icon type="arrow-right" className={s.arrow} />
                احراز هویت الکترونیکی
              </h3>
              <div className={s.stage_container}>
                {stages.map(item => renderStages(item))}
              </div>
            </Col>
            <Col span={14}>
              <div style={{ height: '799px' }}>
                {currentStage === 1 && (
                  <PhotoStage data={videKycData} onSuccessUpload={nextStage} />
                )}
                {currentStage === 2 && (
                  <VideoStage data={videKycData} onSuccessUpload={nextStage} />
                )}
                {currentStage === 3 && <FinishStage />}
              </div>
              {renderTimeLimitation()}
            </Col>
          </Col>
        </Row>
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="متاسفیم.شما مجوز دسترسی به این قسمت را ندارید."
          extra={
            <Link to="/">
              <CPButton type="primary">رفتن به داشبورد</CPButton>
            </Link>
          }
        />
      )}
    </>
  );
};

VideoAuthentication.propTypes = {
  levantId: PropTypes.number,
};
VideoAuthentication.defaultProps = {
  levantId: null,
};
const mapState = state => ({
  levantId: state?.neshanAuth?.jwt?.levantId,
});

export default connect(mapState, null)(withStyles(s)(VideoAuthentication));
