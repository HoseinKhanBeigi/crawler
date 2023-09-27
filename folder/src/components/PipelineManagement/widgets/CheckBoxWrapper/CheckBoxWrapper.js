import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Checkbox } from '@atlaskit/checkbox';
import styles from './CheckBoxWrapper.scss';

function CheckBoxWrapper({
  title,
  options,
  onChange,
  value,
  isRequired,
  readOnly,
}) {
  return (
    <div>
      <div className={styles.checkboxTitle}>
        {isRequired && '*'}
        {title}
      </div>
      <div className={styles.optionsContainer}>
        {options.map(option => (
          <Checkbox
            isChecked={value?.includes(option)}
            onChange={onChange}
            label={option}
            value={option}
            name={option}
            isDisabled={readOnly}
          />
        ))}
      </div>
    </div>
  );
}

CheckBoxWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool.isRequired,
};
CheckBoxWrapper.defaultProps = {
  options: [],
  onChange: () => {},
  value: null,
  isRequired: false,
};

export default withStyles(styles)(CheckBoxWrapper);
