import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './FinishStage.scss';

const FinishStage = () => (
  <>
    <div className={s.container}>
      <div className={s.success__message}>
        <Icon
          type="check-circle"
          theme="filled"
          className={s.success__message__icon}
        />
        <div className={s.success__message__text}>
          عملیات احراز هویت با موفقیت انجام شد
        </div>
      </div>
    </div>
  </>
);
export default withStyles(s)(FinishStage);
