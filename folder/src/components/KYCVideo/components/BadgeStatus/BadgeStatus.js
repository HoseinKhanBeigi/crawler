import React from 'react';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './BadgeStatus.scss';

const BadgeStatus = props => {
  const { isVerify } = props;
  return isVerify ? (
    <div className={s.selfi_badge} style={{ backgroundColor: '#13c29a' }}>
      <Icon
        style={{ verticalAlign: 'middle' }}
        type="check-circle"
        theme="filled"
        className={s.selfi_checked}
      />
      <span>تایید هوش مصنوعی</span>
    </div>
  ) : (
    <div className={s.selfi_badge} style={{ backgroundColor: '#ff5252' }}>
      <Icon
        style={{ verticalAlign: 'middle' }}
        type="close-circle"
        theme="filled"
        className={s.selfi_checked}
      />
      <span>عدم تایید هوش مصنوعی</span>
    </div>
  );
};
BadgeStatus.propTypes = {
  isVerify: PropTypes.bool,
};
BadgeStatus.defaultProps = {
  isVerify: {},
};
export default withStyles(s)(BadgeStatus);
