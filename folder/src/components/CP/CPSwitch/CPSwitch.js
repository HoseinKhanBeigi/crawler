import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch } from 'antd';
import s from './CPSwitch.css';

class CPSwitch extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checkedChildren: PropTypes.node,
    unCheckedChildren: PropTypes.node,
    loading: PropTypes.bool,
    name: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    size: 'default',
    checked: false,
    disabled: false,
    onChange: () => {},
    checkedChildren: '',
    unCheckedChildren: '',
    loading: false,
    name: undefined,
  };

  render() {
    const {
      className,
      size,
      checked,
      onChange,
      disabled,
      checkedChildren,
      unCheckedChildren,
      loading,
      name,
    } = this.props;
    return (
      <Switch
        size={size}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        className={className}
        loading={loading}
        name={name}
      />
    );
  }
}

export default withStyles(s)(CPSwitch);
