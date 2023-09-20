import React from 'react';
import Select from '@atlaskit/select';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SelectWrapper.scss';

function SelectWrapper({ label, options, value, placeholder, onChange }) {
  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectLabel}>{label}</div>
      <div className={styles.selectWrapper}>
        <Select
          inputId="grouped-options-example"
          className="automation-select"
          classNamePrefix="automation-select-pipe"
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

SelectWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
SelectWrapper.defaultProps = {
  options: [],
  value: null,
  placeholder: '',
  onChange: () => {},
};

export default withStyles(styles)(SelectWrapper);
