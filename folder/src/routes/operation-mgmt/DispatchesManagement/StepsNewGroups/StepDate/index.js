import React, { useState } from 'react';
import PropType from 'prop-types';
import StepWizardFooter from '../../../../../components/StepWizard/StepWizardFooter';
import { updateDispatchGroup } from '../../../../../service/dispatchGroupServices';
import DateSelectForm from './DateSelectForm';

const StepDate = ({ onNextStep, data }) => {
  const [mode, setMode] = useState({
    type: 'fromDate',
    fromDate: '',
    fromDays: '',
  });
  const onChange = async () => {
    await updateDispatchGroup({
      id: data?.current?.id,
      [mode.type]: mode[mode.type],
    });
    onNextStep({ [mode.type]: mode[mode.type] });
  };
  return (
    <>
      <DateSelectForm mode={mode} setMode={setMode} />
      <StepWizardFooter
        onClickNext={onChange}
        backTitle="رد کردن این مرحله"
        onClickBack={onNextStep}
        disabled={!mode[mode.type]}
      />
    </>
  );
};
StepDate.propTypes = {
  onNextStep: PropType.func.isRequired,
  data: PropType.object.isRequired,
};
export default StepDate;
