import React, { useState } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForEditEmployee.scss';
import CPButton from '../../../CP/CPButton';
import branchManagementService from '../../../../service/branchManagementService';

const EmployeeStatus = props => {
  const { employeeInfoDetail, onSuccess } = props;
  const { levantId, employeeDailyStatus } = employeeInfoDetail;
  const [onDutyloading, setOnDutyloading] = useState(false);
  const [offWorkloading, setOffWorkloading] = useState(false);
  const [currentEmployeeStatus, setCurrentEmployeeStatus] = useState(
    employeeDailyStatus,
  );

  const putOnDuty = () => {
    setOnDutyloading(true);
    branchManagementService.patchOnDutyEmployee(levantId).then(
      () => {
        setOnDutyloading(false);
        setCurrentEmployeeStatus('ONDUTY');
        onSuccess();
      },
      () => {
        setOnDutyloading(false);
      },
    );
  };

  const putOffWork = () => {
    setOffWorkloading(true);
    branchManagementService.patchOffWorkEmployee(levantId).then(
      () => {
        setOffWorkloading(false);
        setCurrentEmployeeStatus('OFFWORK');
        onSuccess();
      },
      () => {
        setOffWorkloading(false);
      },
    );
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <div
            className={s.employeeInfoDescription_container}
            style={{ minHeight: '336px' }}
          >
            <h3>وضعیت سازمانی</h3>
            <small>
              با کلیک روی یکی از دکمه های زیر میتوانید وضعیت سازمانی کاربر را
              انتخاب کنید
            </small>
            <Row gutter={24}>
              <Col span={24}>
                <div style={{ marginTop: '10px' }}>
                  <CPButton
                    type={
                      currentEmployeeStatus === 'ONDUTY' ? 'primary' : 'default'
                    }
                    onClick={putOnDuty}
                    className={s.button}
                    loading={onDutyloading}
                  >
                    آماده کار
                  </CPButton>
                  <CPButton
                    type={
                      currentEmployeeStatus === 'OFFWORK'
                        ? 'primary'
                        : 'default'
                    }
                    loading={offWorkloading}
                    onClick={putOffWork}
                    className={s.button}
                  >
                    مرخصی
                  </CPButton>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
EmployeeStatus.defaultProps = {
  employeeInfoDetail: {},
  onSuccess: () => {},
};
EmployeeStatus.propTypes = {
  employeeInfoDetail: PropTypes.object,
  onSuccess: PropTypes.func,
};
export default withStyles(s)(EmployeeStatus);
