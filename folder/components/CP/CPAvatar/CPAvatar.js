import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Avatar, Badge } from 'antd';
import defaultImg from './avatar.png';
import s from './CPAvatar.scss';

function CPAvatar(props) {
  const { icon, shape, size, src, badge, style, children } = props;
  if (badge) {
    if (badge === 'dot') {
      return (
        <Badge dot>
          <Avatar icon={icon} shape={shape} size={size} src={src}>
            {this.props.children}
          </Avatar>
        </Badge>
      );
    }
    return (
      <Badge count={badge}>
        <Avatar icon={icon} shape={shape} size={size} src={src}>
          {this.props.children}
        </Avatar>
      </Badge>
    );
  }
  return (
    <Avatar icon={icon} shape={shape} size={size} src={src} style={style}>
      {children}
    </Avatar>
  );
}

CPAvatar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  badge: PropTypes.string,
  style: PropTypes.object,
};

CPAvatar.defaultProps = {
  children: '',
  icon: '',
  shape: 'circle',
  size: 'default',
  src: defaultImg,
  badge: null,
  style: {},
};

export default withStyles(s)(CPAvatar);
