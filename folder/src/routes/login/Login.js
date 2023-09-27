import React from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import withModal from '../../components/HOC/withModal';
import s from './Login.scss';
import CPButton from '../../components/CP/CPButton';
import CPLoading from '../../components/CP/CPLoading';
import { postNeshanTokenDataAction } from '../../store/neshanAuth/neshan.actions';
import useLoginPage from './hooks/useLoginPage';
import ChooseDefaultUnit from './components/ChooseDefaultUnit/ChooseDefaultUnit';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

const Login = props => {
  const { query } = props;
  const {
    visible,
    openNeshanPopup,
    chooseDefaultUnitHandler,
    showDefaultUnitSelection,
    accessibleUnits,
  } = useLoginPage({
    query,
    postNeshanTokenAction: props.postNeshanTokenDataAction,
  });

  const tenantTitle = resolveVariable(BASE_VARIABLE_KEYS.TITLE);

  const renderWaitingModal = () => (
    <Modal
      width={420}
      closable={false}
      centered
      visible={visible}
      footer={false}
    >
      <div className={s.modalForWaiting}>
        <div className={s.loading}>
          <CPLoading spinning size="large" />
        </div>
        <div className={s.main}>
          <div className={s.title}>در حال انتقال به داشبورد</div>
          <div className={s.wait}> لطفا منتظر بمانید</div>
        </div>
      </div>
    </Modal>
  );
  return showDefaultUnitSelection ? (
    <ChooseDefaultUnit
      onFinish={chooseDefaultUnitHandler}
      units={accessibleUnits}
    />
  ) : (
    <>
      <div className={s.container}>
        <Row gutter={24} style={{ marginLeft: '0px', marginRight: '0px' }}>
          <Col
            xs={24}
            sm={24}
            lg={11}
            xl={12}
            xxl={12}
            style={{ height: '95vh' }}
          >
            <div className={s.logo_min} />
            <h1 className={s.slogan}>SIVACRM</h1>
            <h2 className={s.text_welcome}>
              به سیستم یکپارچه مدیریت ارتباط با مشتریان
              {` ${tenantTitle} `}
              خوش‌آمدید
            </h2>
            <CPButton
              type="primary"
              className={s.btn}
              onClick={openNeshanPopup}
            >
              <i className={s.icon} />
              ورود از طریق نشان
            </CPButton>
          </Col>
          <Col span={13} className={s.pic_holder} xl={12} xxl={12}>
            <div className={s.left_pic} />
          </Col>
        </Row>
        <p className={s.paragraphLeggal}>
          تمامی حقوق مادی و معنوی این وبسایت متعلق به مجموعه لوانت است. حق کپی
          رایت محفوظ است. فروردین ۱۴۰۰
        </p>
      </div>
      {renderWaitingModal()}
    </>
  );
};
Login.propTypes = {
  postNeshanTokenDataAction: PropTypes.func.isRequired,
  query: PropTypes.object,
};

Login.defaultProps = {
  query: {},
};

const mapState = state => ({
  loading: state.user.loading,
  data: state.user.data,
  error: state.user.error,
});

const mapDispatch = {
  postNeshanTokenDataAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(withModal(Login)));
