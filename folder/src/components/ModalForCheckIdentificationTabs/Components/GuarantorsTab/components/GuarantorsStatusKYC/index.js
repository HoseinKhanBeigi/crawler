/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';

const GuarantorsStatusKYC = props => {
  const { partyStatus, currentAction, onClickKYC } = props;
  const renderStatusNotKYC = (content, titleAction, onClick) => (
    <Row gutter={[12, 12]}>
      {titleAction && (
        <Col lg={6}>
          <Button onClick={onClick}>{titleAction}</Button>
        </Col>
      )}
      <Col lg={titleAction ? 18 : 24}>
        <div style={{ backgroundColor: '#faad14' }} className={s.kyc_container}>
          <Icon
            type="exclamation"
            style={{ color: '#faad14' }}
            className={s.icon}
          />
          <span>{content}</span>
        </div>
      </Col>
    </Row>
  );
  const handleCheckStatusForNotApprove = status => {
    switch (status) {
      case '1':
        return renderStatusNotKYC(
          'بررسی اطلاعات در انتظار تایید یا رد',
          'بررسی اطلاعات',
          onClickKYC,
        );
      // case '6':
      //   return renderStatusNotKYC(
      //     'احراز هویت در انتظار تایید یا رد',
      //     'بررسی احراز هویت',
      //     onClickKYC,
      //   );
      default:
        return renderStatusNotKYC('این کاربر احراز هویت نشده است.');
    }
  };
  if (partyStatus === 'KYC' || partyStatus === 'ACTIVE') {
    return (
      <div style={{ backgroundColor: '#13c29a' }} className={s.kyc_container}>
        <Icon type="check" style={{ color: '#13c29a' }} className={s.icon} />
        <span>احراز هویت با موفقیت انجام شده است</span>
      </div>
    );
  }
  return handleCheckStatusForNotApprove(currentAction);
};

GuarantorsStatusKYC.propTypes = {
  partyStatus: PropTypes.string.isRequired,
  currentAction: PropTypes.string.isRequired,
  onClickKYC: PropTypes.func.isRequired,
};

export default withStyles(s)(GuarantorsStatusKYC);
