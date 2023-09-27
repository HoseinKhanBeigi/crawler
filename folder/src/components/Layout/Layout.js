/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// external-globagitl styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.scss';

const Layout = props => <div>{props.children}</div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(normalizeCss, s)(memo(Layout));
