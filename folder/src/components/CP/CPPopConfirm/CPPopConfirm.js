import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Popconfirm } from 'antd';
import s from './CPPopConfirm.css';

class CPPopConfirm extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    okType: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    icon: PropTypes.node,
    placement: PropTypes.oneOf([
      'top',
      'topLeft',
      'topRight',
      'left',
      'leftTop',
      'leftBottom',
      'right',
      'rightTop',
      'rightBottom',
      'bottom',
      'bottomLeft',
      'bottomRight',
    ]),
  };

  static defaultProps = {
    children: null,
    cancelText: 'انصراف',
    okText: '',
    okType: '',
    title: '',
    placement: 'top',
    onCancel: () => {},
    onConfirm: () => {},
    icon: (
      <Icon type="question-circle" theme="filled" style={{ color: 'orange' }} />
    ),
  };

  render() {
    const {
      cancelText,
      okText,
      okType,
      title,
      onCancel,
      onConfirm,
      placement,
      icon,
    } = this.props;
    return (
      <Popconfirm
        cancelText={cancelText}
        okText={okText}
        okType={okType}
        title={title}
        onCancel={onCancel}
        onConfirm={onConfirm}
        placement={placement}
        icon={icon}
      >
        {this.props.children}
      </Popconfirm>
    );
  }
}

export default withStyles(s)(CPPopConfirm);
