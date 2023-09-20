import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '@atlaskit/textarea';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TextAreaWrapper.scss';

function TextAreaWrapper({
  name,
  label,
  onChange,
  onBlur,
  description,
  placeholder,
  value,
  icon,
  ref,
  isRequired,
  readOnly,
}) {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <div className={styles.label}>
          {icon}
          {isRequired && '*'}
          {label}
        </div>
      )}
      <TextArea
        name={name}
        aria-label="default text field"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        resize="auto"
        ref={ref}
        isReadOnly={readOnly}
      />
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

TextAreaWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.any,
  readOnly: PropTypes.bool,
  ref: PropTypes.any,
  isRequired: PropTypes.bool,
};

TextAreaWrapper.defaultProps = {
  name: '',
  onChange: () => {},
  onBlur: () => {},
  description: '',
  placeholder: '',
  value: '',
  icon: null,
  readOnly: false,
  ref: null,
  isRequired: false,
};

export default withStyles(styles)(TextAreaWrapper);
