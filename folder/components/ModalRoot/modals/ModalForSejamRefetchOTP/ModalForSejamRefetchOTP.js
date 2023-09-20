import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton/CPButton';
import CPInput from '../../../CP/CPInput/CPInput';
import CPMessage from '../../../CP/CPMessage/CPMessage';
import CPDivider from '../../../CP/CPDivider';
import s from './ModalForSejamRefetchOTP.scss';
import { MODAL_FOR_SEJAM_REFETCH_OTP } from '../../repository';
import { postSejamRefetchOtpCode } from '../../../../service/toolsService';

const ModalForSejamRefetchOTP = props => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const { data, onSuccess } = props;
  const { phoneNumber, nationalCode } = data;

  const closeModal = () => {
    setVisible(false);
  };

  const sendOtpCodeAndGetSejamInfo = () => {
    if (otp) {
      setLoading(true);
      const body = {
        mobileNo: phoneNumber,
        nationalCode,
        needReview: true,
        otpCode: otp,
      };
      postSejamRefetchOtpCode(body).then(
        response => {
          setLoading(false);
          onSuccess(response);
          closeModal();
        },
        () => {
          setLoading(false);
        },
      );
    } else {
      CPMessage('لطفا کد ۵ رقمی را وارد کنید', 'warning');
    }
  };

  return (
    <CPModal
      modalType={MODAL_FOR_SEJAM_REFETCH_OTP}
      visible={visible}
      title="ورود رمز یکبار مصرف سجام"
      footer={false}
      onCancel={closeModal}
    >
      <div className={s.wrapper}>
        <h4>لطفا کد ارسال شده به تلفن کاربر {phoneNumber} را وارد کنید.</h4>
      </div>
      <Row>
        <Col span={12}>
          <div className={s.fieldTitle}>کد ۵ رقمی ارسال شده</div>
          <CPInput
            value={otp}
            max={5}
            type="number"
            onChange={e => setOtp(e.target.value)}
            placeholder="کد یکبارمصرف را وارد کنید"
          />
        </Col>
      </Row>
      <CPDivider className={s.divider} />
      <div className={s.footer}>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={sendOtpCodeAndGetSejamInfo}
            type="primary"
          >
            تایید
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForSejamRefetchOTP.propTypes = {
  data: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};
ModalForSejamRefetchOTP.defaultProps = {
  onSuccess: () => {},
};

export default withStyles(s)(ModalForSejamRefetchOTP);
