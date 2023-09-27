import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import s from './CPLoading.css';

class CPLoading extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    delay: PropTypes.number,
    size: PropTypes.string,
    tip: PropTypes.string,
    spinning: PropTypes.bool,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    children: '',
    delay: 0,
    tip: '',
    size: 'default',
    spinning: false,
    wrapperClassName: '',
  };

  render() {
    const { delay, size, spinning, wrapperClassName, tip } = this.props;
    return (
      <Spin
        tip={tip}
        size={size}
        delay={delay}
        spinning={spinning}
        wrapperClassName={wrapperClassName}
      >
        {this.props.children}
      </Spin>
    );
  }
}

export default withStyles(s)(CPLoading);
