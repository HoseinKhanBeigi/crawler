import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Popover } from 'antd';
import s from './CPPopover.css';

const CPPopover = props => {
  const {
    children,
    placement,
    title,
    content,
    trigger,
    overlayClassName,
  } = props;

  return (
    <Popover
      content={content}
      trigger={trigger}
      placement={placement}
      title={title}
      overlayClassName={overlayClassName}
    >
      {children}
    </Popover>
  );
};

CPPopover.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  trigger: PropTypes.string,
  overlayClassName: PropTypes.string,
};

CPPopover.defaultProps = {
  children: '',
  content: null,
  placement: 'top',
  title: '',
  trigger: 'hover',
  overlayClassName: undefined,
};

export default withStyles(s)(CPPopover);
