import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CautionMessage.scss';

const CautionMessage = ({ message }) => (
  <div className={s.danger}>
    <span>
      <Icon type="exclamation-circle" theme="filled" />
    </span>
    <p>{message}</p>
  </div>
);

CautionMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default withStyles(s)(CautionMessage);
