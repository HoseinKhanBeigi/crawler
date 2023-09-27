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
import { InquiryImageAndInfo } from '../../../../store/tools/tools.actions';
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

function IdentifyInquiryWithImage(props) {
  const [infoLoading, setInfoLoading] = useState(false);
  const [nationalCode, setNationalCode] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [registrationDetail, setRegistrationDetail] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const inquiryImageAndInfo = async () => {
    if (checkNationalCode(persianNumToEnglishNum(nationalCode)) && birthDate) {
      setInfoLoading(true);
      const response = await props.InquiryImageAndInfo({
        birthDate,
        nationalCode,
      });
      if (response && !response.err) {
        setRegistrationDetail(response);
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

  const handleImageDisplay = () => {
    if (
      registrationDetail?.images?.length &&
      registrationDetail?.images[0]?.image
    ) {
      setShowImage(true);
    } else {
      CPMessage('عکسی وجود ندارد.', 'warning');
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
                maxLength={10}
                min={0}
                className={s.inputField}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="کدملی را وارد نمایید"
              />
            </Col>
            <Col span={14}>
              <div className={s.fieldTitle}>تاریخ تولد</div>
              <CPSimpleDatePicker onChange={e => setBirthDate(e.getTime())} />
            </Col>
          </Row>
          <CPButton
            loading={infoLoading}
            onClick={() => inquiryImageAndInfo()}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        <>
          <div className={s.card}>
            <Row>
              {renderField('نام', registrationDetail?.name)}
              {renderField('نام خانوادگی', registrationDetail?.family)}
            </Row>
            <Row>
              {renderField('شهر تولد', registrationDetail?.birthplace)}
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
              {renderField(
                'جنسیت',
                genderDetermination(registrationDetail?.gender),
              )}
              {renderField('نام پدر', registrationDetail?.fatherName)}
            </Row>
            <Row>
              {renderField('کد ملی', nationalCode)}
              {renderField(
                'تاریخ انقضای کارت ملی',
                fixPersianDate(registrationDetail?.cardExpireDate),
              )}
            </Row>
            <Row>
              {renderField(
                'وضعیت حیات',
                liveDetermination(registrationDetail?.deathStatus),
              )}
              {renderField(
                'تاریخ فوت',
                fixPersianDate(registrationDetail?.deathDate),
              )}
            </Row>
            <Row>
              {renderField('کد پستی', registrationDetail?.zipcode)}
              {renderField('محل صدور شناسنامه', registrationDetail?.officeName)}
            </Row>
            <Row>
              {renderField(
                'تاریخ تنظیم شناسنامه',
                fixPersianDate(registrationDetail?.shenasnameIssueDate),
              )}
              {renderField('نام مادر', registrationDetail?.specialFeild)}
            </Row>
            <Row>
              {renderField('شماره شناسنامه', registrationDetail?.shenasnameNo)}
              {renderField('سری شناسنامه', registrationDetail?.shenasnameSeri)}
            </Row>
            <Row>
              {renderField(
                'سریال شناسنامه',
                registrationDetail?.shenasnameSerial,
              )}
              <Col span={12}>
                <div className={s.fieldTitle}>لینک تصویر</div>
                <CPButton
                  style={{ padding: '0px' }}
                  type="link"
                  onClick={() => handleImageDisplay()}
                >
                  کلیک کنید
                </CPButton>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={s.fieldTitle}>آدرس</div>
                <div className={s.fieldValue}>
                  {registrationDetail?.addressDesc}
                </div>
              </Col>
            </Row>
          </div>
          {showImage && (
            <div className={s.card}>
              <img
                src={`data:image/png;base64,${registrationDetail?.images[0]?.image}`}
                alt="person"
              />
              {registrationDetail?.images[1]?.image && (
                <img
                  src={`data:image/png;base64,${registrationDetail?.images[1]?.image}`}
                  alt="cert"
                />
              )}
            </div>
          )}
        </>
      }
    />
  );
}

IdentifyInquiryWithImage.propTypes = {
  InquiryImageAndInfo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  InquiryImageAndInfo,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(IdentifyInquiryWithImage));
