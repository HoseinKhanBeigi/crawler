import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import CPMessage from '../../../../components/CP/CPMessage';
import {
  fixPersianDate,
  genderDetermination,
  liveDetermination,
} from '../../../../helpers/identifyInquiryResponseHandler';
import { InquiryInfo } from '../../../../store/tools/tools.actions';
import CPSimpleDatePicker from '../../../../components/CP/CPSimpleDatePicker';
import CopyableField from '../../../../components/CopyableField/CopyableField';
import { checkNationalCode } from '../../../../utils/validateField';
import ToolContainer from '../ToolContainer/ToolContainer';
import {persianNumToEnglishNum} from "../../../../utils";

const renderField = (label, value) => (
  <Col span={12}>
    <div className={s.fieldTitle}>{label}</div>
    <div className={s.fieldValue}>{value}</div>
  </Col>
);

function IdentifyInquiryWithOutImage(props) {
  const [infoLoading, setInfoLoading] = useState(false);
  const [nationalCode, setNationalCode] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [registrationDetail, setRegistrationDetail] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  const inquiryInfo = async () => {
    if (checkNationalCode(persianNumToEnglishNum(nationalCode)) && birthDate) {
      setInfoLoading(true);
      const response = await props.InquiryInfo({
        birthDate,
        nationalCode,
      });
      if (response && !response.err) {
        setRegistrationDetail(response?.inqueryResults[0]);
      } else if (!response || (response && response.err)) {
        setErrorCode(response?.err);
        if (response.status === 500) {
          CPMessage('خطای سرور اتفاق افتاده!', 'error');
        } else if (response.status === 429) {
          CPMessage(
            'تعداد استعلام بیش از حد مجاز، لطفا دقایقی دیگر تلاش کنید',
            'error',
          );
        }
      }
      setInfoLoading(false);
    } else if (!checkNationalCode(persianNumToEnglishNum(nationalCode))) {
      if (isNaN(persianNumToEnglishNum(nationalCode))) {
        CPMessage('کد ملی باید فقط شامل عدد باشد', 'warning');
      }
      CPMessage('کد ملی صحیح نیست', 'warning');
    } else {
      CPMessage('تاریخ تولد صحیح نیست', 'warning');
    }
  };

  useEffect(() => {
    if (nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }
  }, [nationalCode])

  return (
    <ToolContainer
      title={props.title}
      showResult={registrationDetail?.name && !errorCode}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={10}>
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
            <Col span={14}>
              <div className={s.fieldTitle}>تاریخ تولد</div>
              <CPSimpleDatePicker onChange={e => setBirthDate(e.getTime())} />
            </Col>
          </Row>
          <CPButton
            loading={infoLoading}
            onClick={() => inquiryInfo()}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        <div className={s.card}>
          <Row>
            {renderField('نام', registrationDetail?.name)}
            {renderField('نام خانوادگی', registrationDetail?.family)}
          </Row>
          <Row>
            {renderField('کد ملی', nationalCode)}
            <Col span={12}>
              <CopyableField
                className={s.fieldTitle}
                copyText={fixPersianDate(registrationDetail?.birthDate)?.join(
                  '',
                )}
              >
                <div className={s.fieldTitle}>تاریخ تولد</div>
              </CopyableField>
              <div className={s.fieldValue}>
                {fixPersianDate(registrationDetail?.birthDate)}
              </div>
            </Col>
          </Row>
          <Row>
            {renderField('نام پدر', registrationDetail?.fatherName)}
            {renderField(
              'جنسیت',
              genderDetermination(registrationDetail?.gender),
            )}
          </Row>
          <Row>
            {renderField(
              'وضعیت حیات',
              liveDetermination(registrationDetail?.deathStatus),
            )}
            {renderField('شماره شناسنامه', registrationDetail?.shenasnameNo)}
          </Row>
          <Row>
            {renderField('سری شناسنامه', registrationDetail?.shenasnameSeri)}
            {renderField(
              'سریال شناسنامه',
              registrationDetail?.shenasnameSerial,
            )}
          </Row>
        </div>
      }
    />
  );
}

IdentifyInquiryWithOutImage.propTypes = {
  InquiryInfo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  InquiryInfo,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(IdentifyInquiryWithOutImage));
