import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import { EMPLOYEE_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import { MODAL_FOR_ADD_EMPLOYEE } from '../../repository';
import { postUploadFileAction } from '../../../../store/upload/upload.actions';
import { postEmployeeRegisteredInfoDetail } from '../../../../store/employeeManagement/employeeManagement.actions';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { postAddCaseAction } from '../../../../store/case/case.actions';
import { getTemplatesAction } from '../../../../store/phoneCalls/phoneCalls.actions';
import EmployeeInfoStep from './EmployeeInfoStep';
import ProdcutEmployeeObserver from '../../../ProductEmployeeObserver';
import OrganizationInfoStep from '../../../OrganizationInfoStep';
import AssignPipelineEmployee from '../../../AssignPipelineEmployee/AssignPipelineEmployee';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForAddEmployee.scss';
import SuccessStep from './SuccessStep';

const { Step } = Steps;

const ModalForAddEmployee = props => {
  const { employeeInfoDetail, selectedRole } = props;
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(employeeInfoDetail)

  function closeModal() {
    setVisible(false);
    /*
        when submit employeeInfo in EmployeeInfoStep set registered
        user info in redux for use in AssignPipelineEmployee
        for this reason we must reset that when want to close
    */
    props.postEmployeeRegisteredInfoDetail({});
  }

  const refreshTable = () => {
    kianTableApi(EMPLOYEE_MANAGEMENT_TABLE).refreshTable();
  };

  const changeStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    refreshTable();
  };

  const discardStep = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
  };

  /*
    we here based on selected role in EmployeeInfoStep render it's component
  */
  const pipelineProductStep = {
    OPERATOR: (
      <AssignPipelineEmployee
        employeeInfoDetail={employeeInfoDetail}
        onSuccess={changeStep}
      />
    ),
    OBSERVER: (
      <ProdcutEmployeeObserver
        employeeInfoDetail={employeeInfoDetail}
        onSuccess={changeStep}
      />
    ),
  };

  const renderSteps = [
    {
      title: 'مشخصات کارمند',
      content: (
        <EmployeeInfoStep onChangeStep={changeStep} closeModal={closeModal} />
      ),
    },
    {
      title: 'مشخصات سازمانی',
      content: (
        <OrganizationInfoStep
          personInfo={employeeInfoDetail}
          onChangeStep={changeStep}
          onDiscardStep={discardStep}
        />
      ),
    },
    {
      title: 'تخصیص محصولات',
      content: selectedRole ? (
        pipelineProductStep[selectedRole]
      ) : (
        <h3>نقش انتخاب شده نامعتبر است</h3>
      ),
    },
    {
      title: 'ثبت اطلاعات',
      content: <SuccessStep onClose={closeModal} />,
    },
  ];

  return (
    <CPModal
      title="کاربر جدید"
      footer={false}
      width={768}
      className={s.modal_employee_container}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_EMPLOYEE}
    >
      <>
        <Steps current={currentStep} size="small" labelPlacement="vertical">
          {renderSteps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{renderSteps[currentStep].content}</div>
      </>
    </CPModal>
  );
};

ModalForAddEmployee.propTypes = {
  postEmployeeRegisteredInfoDetail: PropTypes.func.isRequired,
};

ModalForAddEmployee.defaultProps = {
  employeeInfoDetail: {},
};
ModalForAddEmployee.propTypes = {
  employeeInfoDetail: PropTypes.object,
  selectedRole: PropTypes.string.isRequired,
};
const mapDispatch = {
  postUploadFileAction,
  postAddCaseAction,
  getTemplatesAction,
  postEmployeeRegisteredInfoDetail,
};

const mapState = state => ({
  selectedRole: state.employeeManagement?.lastEmployeeAddedInfo?.selectedRole,
  employeeInfoDetail:
    state.employeeManagement?.lastEmployeeAddedInfo?.userInfoDetail || {},
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForAddEmployee));
