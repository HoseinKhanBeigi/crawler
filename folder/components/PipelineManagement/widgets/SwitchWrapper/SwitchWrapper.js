import React from 'react';
import Toggle from '@atlaskit/toggle';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SwitchWrapper.scss';

function SwitchWrapper({ isChecked, onChange, label }) {
  return (
    <div className={styles.switchButtonContainer}>
      <div className={styles.switchButtonTitle}>{label}</div>
      <Toggle
        id="toggle-controlled"
        onChange={onChange}
        isChecked={isChecked}
      />
    </div>
  );
}

SwitchWrapper.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
};
SwitchWrapper.defaultProps = {
  isChecked: false,
  onChange: () => {},
};

export default withStyles(styles)(SwitchWrapper);
