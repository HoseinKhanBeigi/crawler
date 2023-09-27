import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { RadioGroup } from '@atlaskit/radio';
import styles from './RadioButtonWrapper.scss';

function RadioButtonWrapper({
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
      <RadioGroup
        options={options}
        onChange={onChange}
        aria-labelledby="radiogroup-label"
        value={value}
        isDisabled={readOnly}
      />
    </div>
  );
}

RadioButtonWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool.isRequired,
};
RadioButtonWrapper.defaultProps = {
  onChange: () => {},
  value: null,
  isRequired: false,
};

export default withStyles(styles)(RadioButtonWrapper);
