import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Alert } from 'antd';
import s from './CPAlert.css';

function CPAlert(props) {
  const {
    closable,
    type,
    showIcon,
    message,
    description,
    onClose,
    className,
  } = props;
  return (
    <Alert
      closable={closable}
      onClose={onClose}
      type={type}
      showIcon={showIcon}
      message={message}
      description={description}
      className={className}
    />
  );
}

CPAlert.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.string,
  showIcon: PropTypes.bool,
  message: PropTypes.node,
  description: PropTypes.node,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

CPAlert.defaultProps = {
  closable: false,
  type: '',
  message: '',
  description: '',
  showIcon: false,
  onClose: () => {},
  className: '',
};

export default withStyles(s)(CPAlert);
