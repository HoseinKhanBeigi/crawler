import React from 'react';
import Textfield from '@atlaskit/textfield';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classes from 'classnames';
import styles from './InputWrapper.scss';

function InputWrapper({
  name,
  className,
  label,
  onChange,
  onBlur,
  description,
  placeholder,
  value,
  icon,
  ref,
  autoFocus,
  isRequired,
  errorMessage,
  readOnly,
}) {
  return (
    <div className={classes(styles.inputContainer, className || '')}>
      {typeof label === 'string' ? (
        <div className={styles.label}>
          {icon}
          {isRequired && '*'}
          {label}
        </div>
      ) : (
        label
      )}
      <Textfield
        name={name}
        aria-label="default text field"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.Input}
        ref={ref}
        autoFocus={autoFocus}
        isReadOnly={readOnly}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      {description && !errorMessage && (
        <div className={styles.description}>{description}</div>
      )}
    </div>
  );
}

InputWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.any,
  readOnly: PropTypes.bool.isRequired,
  ref: PropTypes.any,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
};

InputWrapper.defaultProps = {
  name: '',
  label: '',
  onChange: () => {},
  onBlur: () => {},
  description: '',
  placeholder: '',
  value: null,
  icon: '',
  ref: null,
  className: '',
  autoFocus: false,
  isRequired: false,
  errorMessage: '',
};

export default withStyles(styles)(InputWrapper);
