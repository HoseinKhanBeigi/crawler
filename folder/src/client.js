import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import * as Sentry from '@sentry/browser';
import { createPath } from 'history';
import { addLocaleData } from 'react-intl';
// This is so bad: requiring all locale if they are not needed?
/* @intl-code-template import ${lang} from 'react-intl/locale-data/${lang}'; */
import en from 'react-intl/locale-data/en';
import fa from 'react-intl/locale-data/fa';
/* @intl-code-template-end */
import App from './components/App';
import createFetch from './createFetch';
import configureStore from './store/_config_/configureStore';
import { updateMeta } from './DOMUtils';
import history from './history';
import router from './router';
import { getIntl } from './store/intl/intl.actions';
import { BASE_VARIABLE_KEYS, resolveVariable } from './serviceConfig';

if (_ENV_ === 'production') { // eslint-disable-line
  switch (resolveVariable(BASE_VARIABLE_KEYS.CONTEXT)) { // eslint-disable-line
    case 'KIAN_DIGITAL':
      Sentry.init({
        dsn:
          'https://e6a6fbfdf21e430f9703a331b4b3b15f@sentry.kiandigital.com/40',
      });
      break;
    case 'KIAN_ADVISORY':
      Sentry.init({
        dsn:
          'https://1b58c9698615491580f01190bba31210@sentry.kiandigital.com/42',
      });
      break;
    case 'KIAN_BUSINESS':
      Sentry.init({
        dsn:
          'https://a6fa9a6395e447f0b009619d9a4e2c49@sentry.kiandigital.com/41',
      });
      break;
    case 'KIAN_TRADE':
      Sentry.init({
        dsn:
          'https://2c4bfe97eb434244be204b925753c388@sentry.kiandigital.com/39',
      });
      break;
    case 'DORSA':
      Sentry.init({
        dsn:
          'https://bae0f9510b064476830fa81480099943@sentry.kiandigital.com/43',
      });
      break;
    case 'IRANCR':
      Sentry.init({
        dsn:
          'https://fa60aef36c0b453394024bf2395358be@sentry.kiandigital.com/44',
      });
      break;
    default:
      Sentry.init({
        dsn:
          'https://e6a6fbfdf21e430f9703a331b4b3b15f@sentry.kiandigital.com/40',
      });
  }
}

/* @intl-code-template addLocaleData(${lang}); */
addLocaleData(en);
addLocaleData(fa);
/* @intl-code-template-end */

// Universal HTTP client
const fetch = createFetch(window.fetch, {
  baseUrl: window.App.apiUrl,
});

// Initialize a new Redux store
// http://redux.js.org/docs/basics/UsageWithReact.html
export const store = configureStore(window.App.state, {
  token:
    window.App.state.user && window.App.state.user.data
      ? window.App.state.user.data.access_token
      : undefined,
  fetch,
  history,
});

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  // For react-apollo
  store,
  storeSubscription: null,
  // Universal HTTP client
  fetch,
  // intl instance as it can be get with injectIntl
  intl: store.dispatch(getIntl()),
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  context.intl = store.dispatch(getIntl());

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);
    context.locale = store.getState().intl.locale;

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      <App context={context}>{route.component}</App>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }

          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error');
      window.location.reload();
    }
  }
}

let isHistoryObserved = false;
export default function main() {
  // Handle client-side navigation by using HTML5 History API
  // For more information visit https://github.com/mjackson/history#readme
  currentLocation = history.location;
  if (!isHistoryObserved) {
    isHistoryObserved = true;
    history.listen(onLocationChange);
  }
  onLocationChange(currentLocation);
}

// globally accesible entry point
window.RSK_ENTRY = main;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
