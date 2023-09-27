import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForGetTradingInfo.scss';
import CPModal from '../CP/CPModal';
import {
  anyModalClose,
  getOpportunitiesAction,
  postTradingInfoAction,
  putDoActionByLevantAndCommandAction,
  getSejamStatusByOpportunityId,
  putSejamOtp,
  getTradingCodeAction,
} from '../../store/opportunities/opportunities.actions';
import CPLabel from '../CP/CPLabel';
import CPInput from '../CP/CPInput';
import CPTooltip from '../CP/CPTooltip';
import CPCountDown from '../CP/CPCountDown';
import UnMaskMobileNumber from '../UnMaskMobileNumber';
import translateSejamStatus from './sejamStatusConstant';
import {persianNumToEnglishNum} from "../../utils";

const ModalForGetTradingInfo = props => {
  const { className, visible, product, currentUser } = props;
  const [sejamStatus, setSejamStatus] = useState('استعلام نشده');
  const [showTimer, setShowTimer] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [tradingCode, setTradingCode] = useState(null);
  const [otpCode, setOtpCode] = useState(null);
  const [sejamOtpLoading, setSejamOtpLoading] = useState(false);
  const [getSejamStatusLoading, setGetSejamStatusLoading] = useState(false);
  const [getTradingCodeLoading, setGetTradingCodeLoading] = useState(false);

  function closeModal() {
    setTradingCode(null);
    props.anyModalClose();
  }

  const renderField = (text, val) => (
    <CPLabel label={text}>
      <CPLabel label={val} />
    </CPLabel>
  );

  function generateResponseMessage(resMessage, type) {
    setResponseMessage({ text: resMessage, type });
    setTimeout(() => {
      setResponseMessage(false);
    }, 4000);
  }

  const renderMaskedMobileNumber = text => (
    <CPLabel label={text}>
      <UnMaskMobileNumber
        popConfirmTitle="آیا مایل به مشاهده کامل شماره همراه هستید؟"
        levantId={currentUser?.levantId}
        title={currentUser?.phoneNO}
        id={currentUser?.mobilePhoneDTO?.partyLocationId}
        openModal={false}
      />
    </CPLabel>
  );

  const getSejamStatusAction = async () => {
    setGetSejamStatusLoading(true);
    const response = await props.getSejamStatusByOpportunityId(currentUser?.id);
    if (response && !response.err) {
      const { status } = response;
      const sejamStatusTranslatedValue = translateSejamStatus(status);
      setSejamStatus(sejamStatusTranslatedValue);
    } else if (!response || (response && response.err)) {
      generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
    }
    setGetSejamStatusLoading(false);
  };

  const renderFieldWithButtons = (text, val, disabled = false) => (
    <CPLabel label={text}>
      <Col span={24}>
        <CPTooltip title={val}>
          <Col span={16}>
            <CPInput disabled={disabled} value={val || ''} />
          </Col>
        </CPTooltip>

        <Col span={8} className={s.buttonMargin}>
          <Button
            type="default"
            onClick={getSejamStatusAction}
            loading={getSejamStatusLoading}
          >
            استعلام سجام
          </Button>
        </Col>
      </Col>
    </CPLabel>
  );

  function handleTradeCodeMessage() {
    return (
      <>
        {responseMessage && responseMessage.type === 'success' && (
          <span className={cs(s.message, s.textSuccess)}>
            {responseMessage.text}
          </span>
        )}
        {responseMessage && responseMessage.type === 'error' && (
          <span className={cs(s.message, s.textError)}>
            {responseMessage.text}
          </span>
        )}
      </>
    );
  }

  function handleSejamCodeErrorMessage(code, message) {
    switch (code) {
      case 500:
        try {
          generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
        } catch {
          return false;
        }
        break;
      case 4031:
      case 403:
        try {
          setResponseMessage({
            text: message || 'رمز یکبار مصرف اشتباه است.',
            type: 'error',
          });
          setShowTimer(false);
          setTimeout(() => {
            setResponseMessage(false);
          }, 4000);
        } catch {
          return false;
        }
        break;
      case 400:
      case 4004:
        try {
          setResponseMessage({
            text: message || 'ثبت نام کاربر در سجام تکمیل نشده است',
            type: 'error',
          });
          setShowTimer(false);
          setTimeout(() => {
            setResponseMessage(false);
          }, 4000);
        } catch {
          return false;
        }
        break;
      case 4010:
      case 401:
        try {
          setResponseMessage({
            text: message || 'توکن سجام اشتباه یا منقضی میباشد.',
            type: 'error',
          });
          setShowTimer(false);
          setTimeout(() => {
            setResponseMessage(false);
          }, 4000);
        } catch {
          return false;
        }
        break;
      case 404:
      case 4041:
        try {
          setResponseMessage({
            text: message || ' این کاربر قبلا در سجام ثبت نام نکرده است.',
            type: 'error',
          });
          setShowTimer(false);
          setTimeout(() => {
            setResponseMessage(false);
          }, 4000);
        } catch {
          return false;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  function handleSejamAutError(response) {
    setShowTimer(false);
    if (response && response.message && response.message.error) {
      const { message } = response;
      const { errorCode, customMessage } = message.error;
      handleSejamCodeErrorMessage(errorCode, customMessage);
    }
  }

  function handleSejamAuthErrorResponse(response) {
    if (response && response.message && response.message.error) {
      handleSejamAutError(response);
    }
  }

  function handleResponse(response) {
    if (
      response &&
      (response.status === 500 ||
        response.status === 401 ||
        response.status === 403)
    ) {
      generateResponseMessage('لطفا کد سجام را وارد کنید.', 'error');
      setShowTimer(false);
    }
  }

  const sendSejamOtpCode = async () => {
    setShowTimer(true);
    setSejamOtpLoading(true);
    const response = await props.putSejamOtp(currentUser?.id);
    if (response) {
      handleSejamAuthErrorResponse(response);
    }
    if (response && response.status) {
      handleResponse(response);
    }
    if (!response) {
      generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
      setShowTimer(false);
    }
    setSejamOtpLoading(false);
  };

  const getTradingCode = async () => {
    if (otpCode) {
      setGetTradingCodeLoading(true);
      const body = {
        otp: otpCode,
        opportunityId: currentUser?.id,
      };
      const response = await props.getTradingCodeAction(body);
      setGetTradingCodeLoading(false);
      handleSejamAuthErrorResponse(response);
      if (!response) {
        setShowTimer(false);
        generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
        return;
      }
      if (response && response.status && response.status === 404) {
        handleSejamCodeErrorMessage(404, null);
        return;
      }
      if (response && response.status) {
        handleResponse(response);
      }
      if (response && response.code) {
        generateResponseMessage('  استعلام با موفقیت انجام شد', 'success');
        setTradingCode(response.code);
      }
    } else {
      generateResponseMessage('  لطفا کد تایید را وارد کنید.', 'error');
    }
  };

  const renderOtpSection = () => (
    <div className={s.OTPSection}>
      <div className={s.tradeCode}>
        <CPLabel label="کد بورسی " />
        <CPInput
          disabled={false}
          value={tradingCode}
          onChange={e => setTradingCode(e.target.value)}
        />
      </div>
      <div className={s.tradCodeStatus}>
        <Button
          type="default"
          onClick={sendSejamOtpCode}
          loading={sejamOtpLoading}
          disabled={showTimer}
        >
          استعلام کد بورسی
        </Button>
        <CPInput
          disabled={false}
          placeholder="لطفا کد را وارد کنید"
          value={otpCode}
          onChange={e => setOtpCode(e.target.value)}
        />
        {showTimer && (
          <div className={s.CountDownTimer}>
            <CPCountDown
              valuePerSec={120}
              onZeroTimer={() => setShowTimer(false)}
            />
          </div>
        )}
        <Button
          type="default"
          onClick={getTradingCode}
          loading={getTradingCodeLoading}
        >
          تایید
        </Button>
        {handleTradeCodeMessage()}
      </div>
    </div>
  );

  async function submitForm() {
    if (tradingCode) {
      const body = {
        opportunityId: currentUser?.id,
        tradingCode,
      };
      const response = await props.postTradingInfoAction(body);
      if (response?.err) {
        generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
      } else {
        closeModal();
        await props.putDoActionByLevantAndCommandAction({
          code: 'GENERATE_TRADING_CODE',
          opportunityId: currentUser?.id,
        });
        await props.getOpportunitiesAction({ product });
      }
    } else {
      generateResponseMessage('لطفا کد سجام را وارد کنید.', 'error');
    }
  }

  useEffect(() => {
    if (tradingCode) {
      setTradingCode(persianNumToEnglishNum(tradingCode))
    }
  }, [tradingCode])


  return (
    <div className={cs('ModalForGetTradingInfo', className)}>
      <CPModal
        title="استعلام و ثبت کد بورسی"
        visible={visible}
        okText="ثبت و ادامه"
        okButtonProps={{
          disabled: !tradingCode,
        }}
        onOk={submitForm}
        onCancel={closeModal}
      >
        <>
          <div className={s.root}>
            <div className={s.additionalInfo}>
              {renderField(
                'نام و نام خانوادگی',
                `${currentUser?.firstName}  ${currentUser?.lastName}`,
              )}
              {renderField('کد ملی', currentUser?.nationalCode)}
              {renderMaskedMobileNumber('موبایل')}
              {renderFieldWithButtons('وضعیت سجام', sejamStatus, true)}
              {renderOtpSection()}
            </div>
          </div>
        </>
      </CPModal>
    </div>
  );
};

ModalForGetTradingInfo.propTypes = {
  className: PropTypes.string,
  product: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  postTradingInfoAction: PropTypes.func.isRequired,
  putDoActionByLevantAndCommandAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  getSejamStatusByOpportunityId: PropTypes.func.isRequired,
  putSejamOtp: PropTypes.func.isRequired,
  getTradingCodeAction: PropTypes.func.isRequired,
};

ModalForGetTradingInfo.defaultProps = {
  className: '',
  currentUser: null,
  product: null,
};

const mapStateToProps = state => ({
  visible: state.opportunities.anyModalVisible === 'modalForGetTradingInfo',
  currentUser: state.opportunities.currentUser,
  product: state.getProducts.selected,
});

const mapDispatch = {
  postTradingInfoAction,
  anyModalClose,
  putDoActionByLevantAndCommandAction,
  getOpportunitiesAction,
  getSejamStatusByOpportunityId,
  putSejamOtp,
  getTradingCodeAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForGetTradingInfo));
export const ModalForGetTradingInfoTest = ModalForGetTradingInfo;
