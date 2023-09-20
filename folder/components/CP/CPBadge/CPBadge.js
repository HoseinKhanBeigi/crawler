import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Badge, Icon } from 'antd';
import s from './CPBadge.scss';

function CPBadge(props) {
  const { count, status, text, icon, dot, showZero, onClick, children } = props;
  if (icon !== '') {
    if (dot === 'dot') {
      return (
        <Badge dot onClick={onClick}>
          <Icon type={icon} />
        </Badge>
      );
    }
    return (
      <Badge count={0} dot onClick={onClick}>
        <Icon type={icon} />
      </Badge>
    );
  }
  return (
    <Badge
      onClick={onClick}
      count={count}
      status={status}
      text={text}
      showZero={showZero}
    >
      {children}
    </Badge>
  );
}

CPBadge.propTypes = {
  children: PropTypes.node,
  count: PropTypes.node,
  status: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  dot: PropTypes.bool,
  showZero: PropTypes.bool,
  onClick: PropTypes.func,
};

CPBadge.defaultProps = {
  children: '',
  count: '0',
  status: '',
  text: '',
  icon: '',
  dot: false,
  showZero: false,
  onClick: () => {},
};

export default withStyles(s)(CPBadge);
