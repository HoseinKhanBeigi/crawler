/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorPage from './Error';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,

  // ReactIntl
  intl: IntlProvider.childContextTypes.intl,
  locale: PropTypes.string,
};

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  constructor() {
    super();
    if (process.env.BROWSER) {
      /**
       * window.app is used  to create the first instance of store,
       * and a critical problem is that the initial store remains in this variable,
       * so we need to clear it as soon as App is getting rendered
       */
      window.App = {};
    }
    this.state = {
      hasError: false,
      error: {},
    };
  }

  getChildContext() {
    return this.props.context;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: {
        error,
        errorInfo,
      },
    });
  }

  render() {
    const { hasError, error } = this.state;
    // Here, we are at universe level, sure? ;-)
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return hasError ? <ErrorPage error={error} /> : <>{this.props.children}</>;
  }
}

export default App;
