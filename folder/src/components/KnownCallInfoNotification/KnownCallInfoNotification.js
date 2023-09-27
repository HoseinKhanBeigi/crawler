import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Descriptions, Row } from 'antd';
import Link from '../Link';

const { Item } = Descriptions;

const KnownCallInfoNotification = props => {
  const { data, onShowCallDetail } = props;
  const { callInfo } = data;
  const { callerPhoneNumber, callerFullName, callerLevantId } = callInfo;
  return (
    <>
      <Row gutter={[24]}>
        <Col span={24}>
          <Descriptions column={1}>
            <Item label="نام : ">{callerFullName || 'ندارد'}</Item>
            <Item label="شماره تلفن : ">
              <Link to={`/lead/${callerLevantId}`}>{callerPhoneNumber}</Link>
            </Item>
          </Descriptions>
        </Col>
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

KnownCallInfoNotification.defaultProps = {
  data: null,
  onShowCallDetail: () => {},
};
KnownCallInfoNotification.propTypes = {
  onShowCallDetail: PropTypes.func,
  data: PropTypes.object,
};

export default KnownCallInfoNotification;
