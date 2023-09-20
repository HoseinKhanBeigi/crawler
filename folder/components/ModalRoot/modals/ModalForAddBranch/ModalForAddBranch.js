import React, { useState } from 'react';
import { Steps } from 'antd';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import { MODAL_FOR_ADD_BRANCH } from '../../repository';
import s from './ModalForAddBranch.scss';
import CPModal from '../../../CP/CPModal';
import AddUnitDetailForm from '../../../Unit/components/AddUnitDetailForm/AddUnitDetailForm';
import AddUnitResponsiblePersonForm from '../../../Unit/components/AddUnitResponsiblePersonForm/AddUnitResponsiblePersonForm';
import AddUnitProductsForm from '../../../Unit/components/AddUnitProductsForm/AddUnitProductsForm';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { BRANCHES_LIST_TABLE } from '../../../../store/settings/settings.constants';
import UnitRegistrationFinishInfo from '../../../Unit/components/UnitRegistrationFinishInfo/UnitRegistrationFinishInfo';

const { Step } = Steps;

const submitAndNextLabel = 'ثبت و گام بعدی';

const ModalForAddBranch = () => {
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };
  const [step, setSteps] = useState(0);
  const [data, setData] = useState(null);
  const goToNextStep = () => setSteps(prevStep => prevStep + 1);

  const refreshTable = () => {
    kianTableApi(BRANCHES_LIST_TABLE).refreshTable();
  };

  const changeStep = values => {
    goToNextStep();
    refreshTable();
    setData(values);
  };

  const addBranchSteps = [
    {
      title: 'مشخصات شعبه',
      content: (
        <AddUnitDetailForm
          unitType="BRANCH"
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          onSubmit={changeStep}
        />
      ),
      id: 0,
    },
    {
      title: 'مسئول شعبه',
      content: (
        <AddUnitResponsiblePersonForm
          unitId={data?.id}
          operationType={data?.operationType}
          onSubmit={changeStep}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          unitType="BRANCH"
        />
      ),
      id: 1,
    },
    {
      title: 'تخصیص محصول',
      content: (
        <AddUnitProductsForm
          unitId={data?.id}
          operationType={data?.operationType}
          onSubmit={changeStep}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          unitType="BRANCH"
        />
      ),
      id: 2,
    },
    {
      title: 'ثبت اطلاعات',
      content: (
        <UnitRegistrationFinishInfo unitId={data?.id} onFinish={closeModal} />
      ),
      id: 3,
    },
  ];
  const StepContent = addBranchSteps[step].content;
  return (
    <CPModal
      title="شعبه جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_BRANCH}
    >
      <div className={s.navigation}>
        <Steps labelPlacement="vertical" size="small" current={step}>
          {addBranchSteps.map(({ title, id }) => (
            <Step title={title} key={id} />
          ))}
        </Steps>
      </div>
      {StepContent}
    </CPModal>
  );
};

export default withStyle(s)(ModalForAddBranch);
