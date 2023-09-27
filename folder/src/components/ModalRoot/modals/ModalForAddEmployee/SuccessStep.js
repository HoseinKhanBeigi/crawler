import React from 'react';
import { Col, Divider, Result, Row } from 'antd';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForAddEmployee.scss';
import CPButton from '../../../CP/CPButton';

const SuccessStep = props => {
  const { onClose } = props;
  return (
    <div className={s.employeeInfoDescription_container}>
      <Result
        status="success"
        title={
          <span className={s.result_success_text}>
            اطلاعات کاربر با موفقیت ثبت شد
          </span>
        }
      />
      <Divider />
      <Row gutter={24}>
        <Col span={24}>
          <div className={s.footer}>
            <CPButton type="primary" onClick={onClose} className={s.button}>
              بستن
            </CPButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};
SuccessStep.propTypes = {
  onClose: PropTypes.func,
};
SuccessStep.defaultProps = {
  onClose: () => {},
};
export default SuccessStep;
