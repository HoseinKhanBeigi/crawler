import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './LoginLayout.scss';

const LoginLayout = props => <div>{props.children}</div>;

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(normalizeCss, s)(memo(LoginLayout));
