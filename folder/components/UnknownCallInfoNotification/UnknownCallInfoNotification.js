import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Descriptions, Row } from 'antd';

const { Item } = Descriptions;

const UnknownCallInfoNotification = props => {
  const { data, onShowAddLeadCallDetail, onShowUpdateCallDetail } = props;
  const { callInfo } = data;
  const { callerPhoneNumber } = callInfo;
  return (
    <>
      <Row gutter={[24]}>
        <Col span={24}>
          <Descriptions column={1}>
            <Item label="نام : ">نامشخص</Item>
            <Item label="شماره تلفن : ">{callerPhoneNumber || 'ندارد'}</Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={[24]}>
        <Col span={8} className="gutter-row">
          <Button type="primary" onClick={() => onShowAddLeadCallDetail(data)}>
            افزودن سرنخ
          </Button>
        </Col>
        <Col span={12} className="gutter-row">
          <Button onClick={() => onShowUpdateCallDetail(data)}>
            اضافه کردن تماس
          </Button>
        </Col>
      </Row>
    </>
  );
};

UnknownCallInfoNotification.defaultProps = {
  data: null,
  onShowAddLeadCallDetail: () => {},
  onShowUpdateCallDetail: () => {},
};

UnknownCallInfoNotification.propTypes = {
  // setCallDetailWindowDataAction: PropTypes.func.isRequired,
  onShowAddLeadCallDetail: PropTypes.func,
  onShowUpdateCallDetail: PropTypes.func,
  data: PropTypes.object,
};

export default UnknownCallInfoNotification;
