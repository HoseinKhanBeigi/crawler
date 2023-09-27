import React from 'react';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './index.scss';
import StepWizardFooter from '../../../../../components/StepWizard/StepWizardFooter';
import history from '../../../../../history';
import ShowGroupData from '../../ShowGroupData';

const StepComplated = ({ data, onCloseModal }) => {
  const { current } = data;
  const onComplate = () => {
    onCloseModal();
    history.push('operation-mgmt');
  };
  return (
    <>
      <div className={s.iconContainer}>
        <Icon type="like" theme="filled" className={s.icon} />
      </div>
      <div className={s.messages}>
        گروه جدید با موفقیت ایجاد شد، شما می‌توانید در ادامه اعضا را مدیریت کنید
      </div>
      <div className={s.hr} />
      <div className={s.container}>
        {current && <ShowGroupData {...current} />}
      </div>
      <div className={s.hr} />
      <StepWizardFooter
        onClickNext={onComplate}
        nextTitle="انتخاب اعضای گروه"
      />
    </>
  );
};
StepComplated.propTypes = {
  data: PropType.object.isRequired,
  onCloseModal: PropType.func.isRequired,
};
export default withStyles(s)(StepComplated);
