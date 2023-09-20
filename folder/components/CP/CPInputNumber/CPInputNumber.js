import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { InputNumber } from 'antd';
import s from './CPInputNumber.css';

class CPInputNumber extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    size: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    step: PropTypes.node,
  };

  static defaultProps = {
    defaultValue: undefined,
    disabled: false,
    max: undefined,
    min: undefined,
    size: 'small',
    type: '',
    step: 1,
    onChange: () => {},
  };

  render() {
    const {
      disabled,
      max,
      min,
      size,
      onChange,
      type,
      defaultValue,
      step,
    } = this.props;

    if (type === 'Currency') {
      return (
        <InputNumber
          {...this.props}
          formatter={value =>
            `${value}ریال`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value.replace(/ریال\s?|(,*)/g, '')}
        />
      );
    } else if (type === 'Percent') {
      return (
        <InputNumber
          defaultValue={defaultValue || 0}
          min={min || 0}
          max={max || 100}
          disabled={disabled}
          size={size}
          step={step}
          onChange={onChange}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
        />
      );
    }
    return <InputNumber {...this.props} />;
  }
}

export default withStyles(s)(CPInputNumber);
