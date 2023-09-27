import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Checkbox } from 'antd';
import s from './CPCheckbox.css';

const CheckboxGroup = Checkbox.Group;

class CPCheckbox extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    defaultChecked: false,
    checked: false,
    disabled: false,
    options: [],
    defaultValue: [],
    value: [],
    onBlur: () => {},
    onChange: () => {},
  };

  render() {
    const {
      onChange,
      defaultChecked,
      disabled,
      checked,
      options,
      defaultValue,
      value,
      onBlur,
    } = this.props;
    return (
      <CheckboxGroup
        onBlur={onBlur}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
      >
        {this.props.children}
      </CheckboxGroup>
    );
  }
}

export default withStyles(s)(CPCheckbox);
