import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AclRowCheckbox.scss';

const AclRowCheckbox = ({ checked, onChange, id }) => (
  <div className={s.aclCheckbox}>
    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
    <label
      htmlFor={`row_${id}_key`}
      style={{ color: checked ? '#ff5252' : '#178ffe' }}
    >
      <Icon type={checked ? 'minus-square' : 'plus-square'} />
    </label>
    <input
      type="checkbox"
      name={`row_${id}_key`}
      id={`row_${id}_key`}
      checked={checked}
      onChange={() => onChange(id)}
    />
  </div>
);

AclRowCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

AclRowCheckbox.defaultProps = {
  checked: undefined,
  onChange: undefined,
};

export default withStyles(s)(AclRowCheckbox);
