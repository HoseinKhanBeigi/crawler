import React, { useState } from 'react';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import CPInput from '../../../../../components/CP/CPInput/CPInput';
import StepWizardFooter from '../../../../../components/StepWizard/StepWizardFooter';
import { createDispatchGroup } from '../../../../../service/dispatchGroupServices';

const StepName = ({ onNextStep, onCloseModal }) => {
  const [groupName, setGroupName] = useState('');
  const onChange = async () => {
    const response = await createDispatchGroup({
      name: groupName,
    });
    onNextStep({ id: response.result, name: groupName });
  };
  return (
    <>
      <div className={s.label}>نام گروه*</div>
      <CPInput
        placeholder=" نام گروه را وارد کنید"
        value={groupName}
        isRequired
        onChange={text => setGroupName(text.target.value)}
      />
      <div className={s.hr} />
      <StepWizardFooter
        onClickNext={onChange}
        backTitle="انصراف"
        onClickBack={onCloseModal}
        disabled={!groupName}
      />
    </>
  );
};
StepName.propTypes = {
  onNextStep: PropType.func.isRequired,
  onCloseModal: PropType.func.isRequired,
};
export default withStyles(s)(StepName);
