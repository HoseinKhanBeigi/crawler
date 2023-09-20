import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Select } from 'antd';
import cs from 'classnames';
import s from './CPInputGroup.scss';

const InputGroup = Input.Group;
const { Option } = Select;

class CPInputGroup extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.string,
    compact: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    children: '',
    size: null,
    compact: false,
  };

  render() {
    const { className, children, size, compact } = this.props;

    return (
      <InputGroup
        compact={compact ? true : null}
        className={cs(s.CPInputGroup, className)}
        size={size}
      >
        {children}
      </InputGroup>
    );
  }
}

export const ChildSelect = props => {
  const { defaultValue, options } = props;
  return (
    <Select defaultValue={defaultValue}>
      {options.map(v => (
        <Option value={v.value}>{v.text}</Option>
      ))}
    </Select>
  );
};

ChildSelect.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export const ChildInput = props => {
  const { placeholder } = props;
  return <Input prefix={placeholder} />;
};

ChildInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default withStyles(s)(CPInputGroup);
export const CPInputGroupTest = CPInputGroup;
