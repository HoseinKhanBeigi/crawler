import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import StepWizardFooter from '../../../../../components/StepWizard/StepWizardFooter';
import useSelectApplications from './hook';

const StepApplications = ({ onNextStep, data }) => {
  const {
    applications,
    onChangeStatus,
    selectedApp,
    onSubmit,
  } = useSelectApplications(onNextStep, data);

  return (
    <>
      <div className={s.label}>اپلیکیشن‌های ایجاد‌کننده را مشخص کنید</div>
      <Row>
        {applications.map(item => (
          <Col span={8} key={item.id} className={s.checkbox}>
            <Checkbox
              name={item.name}
              id={item.id}
              onChange={value => onChangeStatus(value, item)}
            >
              {item.name}
            </Checkbox>
          </Col>
        ))}
      </Row>
      <div className={s.hr} />
      <Row type="flex" justify="space-between" align="middle">
        <Col span={12} className={s.selectedContent}>
          <div className={s.label}>
            {selectedApp.length} اپلیکیشن انتخاب شده
          </div>
        </Col>
        <Col span={12}>
          <StepWizardFooter
            onClickNext={onSubmit}
            disabled={!selectedApp.length > 0}
          />
        </Col>
      </Row>
    </>
  );
};
StepApplications.propTypes = {
  onNextStep: PropType.func.isRequired,
  data: PropType.object.isRequired,
};
export default withStyles(s)(StepApplications);
