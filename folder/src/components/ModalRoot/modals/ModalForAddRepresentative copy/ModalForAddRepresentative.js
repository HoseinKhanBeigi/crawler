import React, { useState } from 'react';
import { Steps } from 'antd';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_ADD_REPRESENTATIVE } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { REPRESENTATIVE_TABLE } from '../../../../store/settings/settings.constants';
import AddUnitDetailForm from '../../../Unit/components/AddUnitDetailForm/AddUnitDetailForm';
import AddUnitResponsiblePersonForm from '../../../Unit/components/AddUnitResponsiblePersonForm/AddUnitResponsiblePersonForm';
import AddUnitProductsForm from '../../../Unit/components/AddUnitProductsForm/AddUnitProductsForm';
import UnitRegistrationFinishInfo from '../../../Unit/components/UnitRegistrationFinishInfo/UnitRegistrationFinishInfo';

const submitAndNextLabel = 'ثبت و گام بعدی';

const { Step } = Steps;
const ModalForAddRepresentative = () => {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [represnetativeInfo, setRepresentativeInfo] = useState({});

  function closeModal() {
    setVisible(false);
  }
  const refreshTable = () => {
    kianTableApi(REPRESENTATIVE_TABLE).refreshTable();
  };

  const changeStep = d => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    refreshTable();
    setRepresentativeInfo(d);
  };

  const renderSteps = [
    {
      title: 'مشخصات نمایندگی',
      content: (
        <AddUnitDetailForm
          unitType="REPRESENTATIVE"
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          onSubmit={changeStep}
        />
      ),
    },
    {
      title: 'مسئول نمایندگی',
      content: (
        <AddUnitResponsiblePersonForm
          unitType="REPRESENTATIVE"
          unitId={represnetativeInfo?.id}
          onSubmit={changeStep}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
        />
      ),
    },
    {
      title: 'تخصیص محصول',
      content: (
        <AddUnitProductsForm
          unitType="REPRESENTATIVE"
          unitId={represnetativeInfo?.id}
          onSubmit={changeStep}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
        />
      ),
    },
    {
      title: 'ثبت اطلاعات',
      content: (
        <UnitRegistrationFinishInfo
          unitType="REPRESENTATIVE"
          unitId={represnetativeInfo?.id}
          onFinish={closeModal}
        />
      ),
    },
  ];

  return (
    <CPModal
      title="نمایندگی جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_REPRESENTATIVE}
    >
      <div
        style={{
          padding: '0 0 12px',
          borderBottom: 'solid 1px #f0f0f0',
          marginBottom: 12,
        }}
      >
        <Steps current={currentStep} size="small" labelPlacement="vertical">
          {renderSteps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="steps-content">{renderSteps[currentStep].content}</div>
    </CPModal>
  );
};

export default ModalForAddRepresentative;
