import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio } from 'antd';
import s from './CPRadio.css';

const RadioGroup = Radio.Group;

class CPRadio extends React.Component {
  static propTypes = {
    model: PropTypes.arrayOf(PropTypes.object).isRequired,
    disabled: PropTypes.bool,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
    ]),
    size: PropTypes.string,
    /**
     * Passing the name property to all input[type="radio"] that are in
     * the same RadioGroup. It is usually used to let the browser see your
     * RadioGroup as a real "group" and keep the default behavior.
     * For example, using left/right keyboard arrow to change your selection
     * that in the same RadioGroup.
     */
    name: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    name: null,
    onChange: () => {},
    vertical: false,
    value: null,
    size: 'default',
    className: undefined,
  };

  loop = data => {
    const { vertical, disabled, size } = this.props;
    const radioStyle = vertical
      ? {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        }
      : {};
    return data.map(item => (
      <Radio
        disabled={disabled || item.disabled}
        value={item.value}
        key={item.value}
        style={radioStyle}
        size={size}
      >
        {item.name}
      </Radio>
    ));
  };

  render() {
    const { model, onChange, value, name, className } = this.props;
    return (
      <RadioGroup
        name={name}
        onChange={onChange}
        value={value}
        className={className}
      >
        {this.loop(model)}
      </RadioGroup>
    );
  }
}

export default withStyles(s)(CPRadio);
