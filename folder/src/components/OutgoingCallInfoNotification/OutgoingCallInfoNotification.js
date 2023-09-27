import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Descriptions, Row } from 'antd';

const { Item } = Descriptions;

const OutgoingCallInfoNotification = props => {
  const { data, onShowCallDetail } = props;
  const { callInfo } = data;
  const { callerPhoneNumber, callerFullName } = callInfo;
  return (
    <>
      <Row gutter={[24]}>
        <Descriptions column={1}>
          <Item label="نام : ">{callerFullName || 'ندارد'}</Item>
          <Item label="شماره تلفن : ">{callerPhoneNumber || 'ندارد'}</Item>
        </Descriptions>
      </Row>
      <Row gutter={[24]}>
        <Col span={8} className="gutter-row">
          <Button type="primary" onClick={() => onShowCallDetail(data)}>
            ثبت اطلاعات
          </Button>
        </Col>
      </Row>
    </>
  );
};

OutgoingCallInfoNotification.defaultProps = {
  data: null,
  onShowCallDetail: () => {},
};
OutgoingCallInfoNotification.propTypes = {
  onShowCallDetail: PropTypes.func,
  data: PropTypes.object,
};

export default OutgoingCallInfoNotification;
