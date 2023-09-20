import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'antd';
import s from './CPButton.scss';

class CPButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf([
      'primary',
      'ghost',
      'dashed',
      'danger',
      'default',
      'plain',
      'link',
    ]),
    size: PropTypes.string,
    shape: PropTypes.string,
    className: PropTypes.string,
    htmlType: PropTypes.node,
    loading: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    children: '',
    disabled: false,
    onClick: () => {},
    icon: '',
    type: 'default',
    size: 'default',
    className: null,
    shape: null,
    htmlType: 'button',
    loading: false,
    style: null,
  };

  render() {
    const {
      disabled,
      onClick,
      icon,
      type,
      size,
      shape,
      className,
      htmlType,
      loading,
      style,
      ...props
    } = this.props;

    // const isSuccess = type === 'success' ? 'green' : '';
    return (
      <Button
        {...props}
        style={
          type === 'plain'
            ? Object.assign({}, style, { border: '0px solid transparent' })
            : style
        }
        type={type}
        className={className}
        onClick={onClick}
        icon={icon}
        disabled={disabled}
        size={size}
        shape={shape}
        htmlType={htmlType}
        loading={loading}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default withStyles(s)(CPButton);
export const CPButtonTest = CPButton;
