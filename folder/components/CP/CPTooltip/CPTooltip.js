import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tooltip } from 'antd';
import s from './CPTooltip.css';

class CPTooltip extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    placement: PropTypes.string,
    children: PropTypes.node,
    overlayClassName: PropTypes.string,
    mouseLeaveDelay: PropTypes.number,
    overlayStyle: PropTypes.object,
  };

  static defaultProps = {
    placement: 'top',
    children: null,
    title: null,
    overlayClassName: '',
    mouseLeaveDelay: undefined,
    overlayStyle: undefined,
  };

  render() {
    const {
      title,
      placement,
      overlayClassName,
      mouseLeaveDelay,
      overlayStyle,
    } = this.props;

    return (
      <Tooltip
        title={title}
        placement={placement}
        overlayClassName={overlayClassName}
        mouseLeaveDelay={mouseLeaveDelay}
        overlayStyle={overlayStyle}
      >
        {this.props.children}
      </Tooltip>
    );
  }
}

export default withStyles(s)(CPTooltip);
