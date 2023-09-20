import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForCompleteTradingInfo.scss';
import CPModal from '../../../CP/CPModal';
import {
  getOpportunitiesAction,
  postTradingInfoAction,
  putDoActionByLevantAndCommandAction,
  getSejamStatusByOpportunityId,
  putSejamOtp,
  getTradingCodeAction,
} from '../../../../store/opportunities/opportunities.actions';
import SejamCodeErrorHandling from '../../../../utils/sejamCodeErrorHandling';
import { MODAL_FOR_COMPLETE_TRADING_INFO } from '../../repository';
import CPLabel from '../../../CP/CPLabel';
import CPInput from '../../../CP/CPInput';
import CPTooltip from '../../../CP/CPTooltip';
import CPCountDown from '../../../CP/CPCountDown';
import UnMaskMobileNumber from '../../../UnMaskMobileNumber';
import translateSejamStatus from './sejamStatusConstant';
import {persianNumToEnglishNum} from "../../../../utils";

const ModalForCompleteTradingInfo = props => {
  const {
    className,
    productCode: product,
    opportunityData: currentUser,
    onConfirm,
  } = props;
  const [sejamStatus, setSejamStatus] = useState('استعلام نشده');
  const [showTimer, setShowTimer] = useState(false);
  const [visible, setVisible] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const [tradingCode, setTradingCode] = useState(null);
  const [otpCode, setOtpCode] = useState(null);
  const [sejamOtpLoading, setSejamOtpLoading] = useState(false);
  const [getSejamStatusLoading, setGetSejamStatusLoading] = useState(false);
  const [getTradingCodeLoading, setGetTradingCodeLoading] = useState(false);

  function closeModal() {
    setVisible(false);
    onConfirm();
    props.getOpportunitiesAction();
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
      if (response.status === 500) {
        generateResponseMessage('خطای سرور اتفاق افتاده!', 'error');
      } else if (response.status === 429) {
        generateResponseMessage(
          'تعداد استعلام بیش از حد مجاز، لطفا دقایقی دیگر تلاش کنید',
          'error',
        );
      }
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

  function handleErrorMessage(status) {
    const errorHandlerResp = new SejamCodeErrorHandling(status).resp();
    setResponseMessage({
      text: errorHandlerResp.message.defaultMessage,
      type: 'error',
    });
    setTimeout(() => {
      setResponseMessage(false);
    }, 4000);
  }
  const sendSejamOtpCode = async () => {
      setShowTimer(true);
      setSejamOtpLoading(true);
      const response = await props.putSejamOtp(currentUser?.id);
      setSejamOtpLoading(false);
      if (response && response.err) {
        setShowTimer(false);
        handleErrorMessage(response.status);
      }
      if (!response) {
        setShowTimer(false);
      }
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
      if (response && response.err) {
        setShowTimer(false);
        handleErrorMessage(response.status);
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
        {isNaN(otpCode) ? <div>کد باید فقط شامل عدد باشد.</div> : ''}
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

  useEffect(() => {
    if(tradingCode) {
      setTradingCode(persianNumToEnglishNum(tradingCode))
    }
  }, [tradingCode])

  useEffect(() => {
    if (otpCode) {
      setOtpCode(persianNumToEnglishNum(otpCode))
    }
  }, [otpCode])


  const onConfirmAndCloseModal = async () => {
    await props.putDoActionByLevantAndCommandAction({
      code: 'GENERATE_TRADING_CODE',
      opportunityId: currentUser?.id,
    });
    await props.getOpportunitiesAction({ product });
    closeModal();
  };

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
        await onConfirmAndCloseModal();
      }
    } else {
      generateResponseMessage('لطفا کد سجام را وارد کنید.', 'error');
    }
  }

  return (
    <div className={cs('ModalForGetTradingInfo', className)}>
      <CPModal
        title="استعلام و ثبت کد بورسی"
        visible={visible}
        modalType={MODAL_FOR_COMPLETE_TRADING_INFO}
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

ModalForCompleteTradingInfo.propTypes = {
  className: PropTypes.string,
  productCode: PropTypes.string,
  postTradingInfoAction: PropTypes.func.isRequired,
  putDoActionByLevantAndCommandAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  opportunityData: PropTypes.object,
  getSejamStatusByOpportunityId: PropTypes.func.isRequired,
  putSejamOtp: PropTypes.func.isRequired,
  getTradingCodeAction: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

ModalForCompleteTradingInfo.defaultProps = {
  className: '',
  opportunityData: null,
  productCode: null,
  onConfirm: () => {},
};

const mapDispatch = {
  postTradingInfoAction,
  putDoActionByLevantAndCommandAction,
  getOpportunitiesAction,
  getSejamStatusByOpportunityId,
  putSejamOtp,
  getTradingCodeAction,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(ModalForCompleteTradingInfo));
export const ModalForCompleteTradingInfoTest = ModalForCompleteTradingInfo;
