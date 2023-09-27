import React, { useState } from 'react';
import { Steps } from 'antd';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_ADD_AGENT } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { AGENT_TABLE } from '../../../../store/settings/settings.constants';
import AddUnitDetailForm from '../../../Unit/components/AddUnitDetailForm/AddUnitDetailForm';
import AddUnitResponsiblePersonForm from '../../../Unit/components/AddUnitResponsiblePersonForm/AddUnitResponsiblePersonForm';
import AddUnitProductsForm from '../../../Unit/components/AddUnitProductsForm/AddUnitProductsForm';
import UnitRegistrationFinishInfo from '../../../Unit/components/UnitRegistrationFinishInfo/UnitRegistrationFinishInfo';

const submitAndNextLabel = 'ثبت و گام بعدی';

const { Step } = Steps;
const ModalForAddAgent = () => {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [represnetativeInfo, setRepresentativeInfo] = useState({});

  function closeModal() {
    setVisible(false);
  }
  const refreshTable = () => {
    kianTableApi(AGENT_TABLE).refreshTable();
  };

  const changeStep = d => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    refreshTable();
    setRepresentativeInfo(d);
  };

  const renderSteps = [
    {
      title: 'مشخصات کارگزار',
      content: (
        <AddUnitDetailForm
          unitType="AGENT"
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          onSubmit={changeStep}
        />
      ),
    },
    {
      title: 'مسئول کارگزار',
      content: (
        <AddUnitResponsiblePersonForm
          unitType="AGENT"
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
          unitType="AGENT"
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
          unitType="AGENT"
          unitId={represnetativeInfo?.id}
          onFinish={closeModal}
        />
      ),
    },
  ];

  return (
    <CPModal
      title="کارگزار جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_AGENT}
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

export default ModalForAddAgent;
