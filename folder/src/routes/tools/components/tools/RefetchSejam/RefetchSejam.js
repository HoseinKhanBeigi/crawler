import React, {useEffect, useState} from 'react';
import { Col, Row, Descriptions } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import s from './RefetchSejam.scss';
import {
  MODAL_FOR_SEJAM_REFETCH_OTP,
  MODAL_FOR_CONFIRM_SEJAM_REFETCH_INFORMATION,
} from '../../../../../components/ModalRoot/repository';
import withModal from '../../../../../components/HOC/withModal';
import { postSejaRefetchRequestOTP } from '../../../../../service/toolsService';
import CPInput from '../../../../../components/CP/CPInput';
import CPButton from '../../../../../components/CP/CPButton';
import CPDivider from '../../../../../components/CP/CPDivider';
import CPMessage from '../../../../../components/CP/CPMessage';
import { CheckShahCar } from '../../../../../store/tools/tools.actions';
import ToolContainer from '../../ToolContainer/ToolContainer';
import {persianNumToEnglishNum} from "../../../../../utils";

export const gender = {
  Male: 'مرد',
  Female: 'زن',
};

const { Item } = Descriptions;

function RefetchSejam(props) {
  const { showModalAction } = props;
  const [nationalCode, setNationalCode] = useState(null);
  const [phoneNumber, SetPhoneNumber] = useState(null);
  const [sejamDetail, setSejamDetail] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const showModal = type => modalProps => () => {
    showModalAction({
      type,
      props: modalProps,
    });
  };

  const cancelFetchSejam = () => {
    setSejamDetail(null);
  };

  const sendOTPCode = () => {
    if (nationalCode && phoneNumber) {
      setOtpLoading(true);
      postSejaRefetchRequestOTP(nationalCode).then(
        () => {
          showModal(MODAL_FOR_SEJAM_REFETCH_OTP)({
            data: {
              phoneNumber,
              nationalCode,
            },
            onSuccess: setSejamDetail,
          })();
          setOtpLoading(false);
        },
        () => {
          setOtpLoading(false);
        },
      );
    } else {
      CPMessage('وارد کردن شماره تلفن و کدملی الزامیست!', 'warning');
    }
  };

  const openConfirmationModal = () => {
    showModal(MODAL_FOR_CONFIRM_SEJAM_REFETCH_INFORMATION)({
      data: {
        phoneNumber,
        nationalCode,
      },
      onSuccess: cancelFetchSejam,
    })();
  };

  useEffect(() => {
    if (nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }
  }, [nationalCode])

  useEffect(() => {
    if (phoneNumber) {
      SetPhoneNumber(persianNumToEnglishNum(phoneNumber))
    }
  }, [phoneNumber])

  return (
    <ToolContainer
      title="به روزرسانی اطلاعات کاربر از طریق سجام"
      showResult={sejamDetail}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={12}>
              <div className={s.fieldTitle}>کدملی</div>
              <CPInput
                value={nationalCode}
                min={0}
                className={s.inputField}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="کدملی را وارد نمایید"
                maxLength={10}
              />
            </Col>
            <Col span={12}>
              <div className={s.fieldTitle}>شماره موبایل</div>
              <CPInput
                value={phoneNumber}
                min={0}
                onChange={e => SetPhoneNumber(e.target.value)}
                placeholder="شماره موبایل را وارد نمایید"
                maxLength={11}
              />
            </Col>
          </Row>
          <CPButton
            loading={otpLoading}
            onClick={sendOTPCode}
            type="primary"
            block
          >
            درخواست ارسال رمز یکبار مصرف
          </CPButton>
        </>
      }
      ResultRender={
        <div className={s.card} style={{ width: '60%' }}>
          <div className={s.title}>پیش نمایش اطلاعات دریافت شده از سجام</div>
          <CPDivider className={s.divider} />
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>اطلاعات اولیه</div>
            </div>
            <Descriptions layout="vertical" column={2}>
              <Item label="نام و نام خانوادگی">
                {`${sejamDetail?.privatePerson?.firstName} ${sejamDetail?.privatePerson?.lastName}` ||
                  '---'}
              </Item>
              <Item label="کد ملی">
                {sejamDetail?.uniqueIdentifier || '---'}
              </Item>
              <Item label="شماره موبایل">{sejamDetail?.mobile || '---'}</Item>
              <Item label="نام پدر">
                {sejamDetail?.privatePerson?.fatherName || '---'}
              </Item>
              <Item label="جنسیت">
                {gender[sejamDetail?.privatePerson?.gender] || '---'}
              </Item>
              <Item label="تاریخ تولد">
                {momentJalaali(sejamDetail?.privatePerson?.birthDate).format(
                  'dddd jD jMMMM jYYYY',
                )}
              </Item>
              <Item label="نشانی">
                {`${sejamDetail?.addresses?.[0]?.city?.name},
                ${sejamDetail?.addresses?.[0]?.alley},
                ${sejamDetail?.addresses?.[0]?.remnantAddress},
                ${sejamDetail?.addresses?.[0]?.plaque}`}
              </Item>
            </Descriptions>
          </div>
          <CPDivider className={s.divider} />
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>حساب بانکی</div>
            </div>
            <Descriptions layout="vertical" column={2}>
              <Item label="نام بانک">
                {sejamDetail?.accounts[0]?.bank?.name || '---'}
              </Item>
              <Item label="نوع حساب">
                {sejamDetail?.accounts[0]?.typeTitle || '---'}
              </Item>
              <Item label="شماره حساب">
                {sejamDetail?.accounts[0]?.accountNumber || '---'}
              </Item>
              <Item label="شماره شبا">
                {sejamDetail?.accounts[0]?.sheba || '---'}
              </Item>
              <Item label="شعبه">
                {sejamDetail?.accounts?.[0]?.branchCity?.name || '---'}
              </Item>
            </Descriptions>
          </div>
          <CPDivider className={s.divider} />
          <div>
            <CPButton onClick={cancelFetchSejam}>انصراف</CPButton>
            <CPButton onClick={openConfirmationModal} type="primary">
              تایید و به روزرسانی
            </CPButton>
          </div>
        </div>
      }
    />
  );
}

RefetchSejam.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  CheckShahCar,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(withModal(RefetchSejam)));
