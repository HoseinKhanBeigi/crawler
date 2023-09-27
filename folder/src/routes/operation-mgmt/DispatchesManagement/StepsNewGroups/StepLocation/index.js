import React from 'react';
import { Col, Row } from 'antd';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import StepWizardFooter from '../../../../../components/StepWizard/StepWizardFooter';
import useSelectLocation from './hook';
import SelectBranchInAddGroup from './SelectBranchInAddGroup';

const StepLocation = ({ onNextStep, data }) => {
  const {
    branchesAddedList,
    onAddBranch,
    onRemoveBranch,
    onSubmit,
  } = useSelectLocation([], onNextStep, data);
  return (
    <>
      <SelectBranchInAddGroup
        branchesAdded={branchesAddedList}
        onAddBranch={onAddBranch}
        onRemoveBranch={onRemoveBranch}
      />
      <Row type="flex" justify="space-between" align="middle">
        <Col span={12} className={s.selectedContent}>
          <div className={s.label}>
            {branchesAddedList.length} شعبه انتخاب شده
          </div>
        </Col>
        <Col span={12}>
          <StepWizardFooter
            onClickNext={onSubmit}
            disabled={!branchesAddedList.length > 0}
          />
        </Col>
      </Row>
    </>
  );
};
StepLocation.propTypes = {
  onNextStep: PropType.func.isRequired,
  data: PropType.object.isRequired,
};
export default withStyles(s)(StepLocation);
