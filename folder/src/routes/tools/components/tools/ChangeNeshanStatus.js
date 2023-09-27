import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, message, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  changeNeshanUserStatus,
  inquiryNeshanStatus,
} from '../../../../service/toolsService';
import ToolContainer from '../ToolContainer/ToolContainer';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';


const ChangeNeshanStatus = ({ title }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [data, setData] = useState(null);

  const validateCardNumber = () => {
    const cardNumberValidationRegex = /^09\d{9}$/g;
    if (!cardNumberValidationRegex.test(mobileNumber)) {
      const errorText = 'شماره تلفن همراه نامعتبر است';
      message.error(errorText);
      throw new Error(errorText);
    }
  };

  const handleInquiry = async () => {
    setLoading(true);
    try {
      validateCardNumber();
      const { additionalInfo, ...inquiryData } = await inquiryNeshanStatus(
        mobileNumber,
      );
      setData(inquiryData);
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  const handleChangeNeshanStatus = async () => {
    setChangeStatusLoading(true);
    try {
      const { enabled } = data;
      await changeNeshanUserStatus(mobileNumber, !enabled);
      message.success('وضعیت کاربر با موفقیت تغییر پیدا کرد');
      setData(prevState => ({ ...prevState, enabled: !prevState.enabled }));
    } catch (e) {
      // ...
    }
    setChangeStatusLoading(false);
  };

  return (
    <ToolContainer
      title={title}
      showResult={data}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>شماره تلفن همراه</div>
              <CPInput
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                placeholder="شماره تلفن همراه"
              />
            </Col>
          </Row>
          <CPButton
            loading={loading}
            onClick={handleInquiry}
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
            <Col span={12}>
              <div className={s.fieldTitle}>نام</div>
              <div className={s.fieldValue}>{data?.firstName}</div>
            </Col>
            <Col span={12}>
              <div className={s.fieldTitle}>نام خانوادگی</div>
              <div className={s.fieldValue}>{data?.lastName}</div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={s.fieldTitle}>وضعیت</div>
              <div className={s.fieldValue}>
                {data?.enabled ? 'فعال' : 'غیرفعال'}
              </div>
            </Col>
            <Col span={12}>
              <div className={s.fieldTitle}>شماره همراه</div>
              <div className={s.fieldValue}>{mobileNumber}</div>
            </Col>
          </Row>
          <Row className="margin-t-10">
            <CPButton
              type={data?.enabled ? 'danger' : 'primary'}
              block
              onClick={handleChangeNeshanStatus}
              loading={changeStatusLoading}
            >
              {data?.enabled ? 'غیر فعال سازی' : 'فعال سازی'}
            </CPButton>
          </Row>
        </div>
      }
    />
  );
};

ChangeNeshanStatus.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(ChangeNeshanStatus);
