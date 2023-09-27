import path from 'path';
import express from 'express';
import jwtDecode from 'jwt-decode';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import React from 'react';
import * as Sentry from '@sentry/node';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { IntlProvider } from 'react-intl';
import expressStaticGzip from 'express-static-gzip';
import './serverIntlPolyfill';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/_config_/configureStore';
import { setRuntimeVariable } from './store/runtime/runtime.actions';
import { setLocale } from './store/intl/intl.actions';
import config from './config';
import { getHeaderCookie } from './utils';
import { loginSuccess, jwtSuccess } from './store/neshanAuth/neshan.actions';
import {
  getGetProductsAction,
  selectProductAction,
} from './store/getProducts/getProducts.actions';
import {
  selectApplicationAction,
  getApplicationsAction,
} from './store/applications/applications.actions';
import {
  getAclMenuListAction,
  getAclAuthoritiesListAction,
} from './store/acl/acl.actions';
import { getUISettingsAction } from './store/settings/settings.actions';
import {
  BASE_VARIABLE_KEYS,
  envContext,
  refreshVariables,
  resolveVariable,
} from './serviceConfig';

let hostName = '';

if (process.env.ENV === 'production') {
  switch (process.env.CONTEXT) {
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

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

app.use(
  expressStaticGzip(path.join(__dirname, 'public'), {
    enableBrotli: true,
    index: false,
  }),
);

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());

/**
 * Remove accept-language and fix react-intl default fa-IR.
 */
app.use((req, res, next) => {
  delete req.headers['accept-language'];
  next();
});

app.use(
  requestLanguage({
    languages: config.locales,
    queryName: 'lang',
    cookie: {
      name: 'lang',
      options: {
        path: '/',
        maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
      },
      url: '/lang/{language}',
    },
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  hostName = req.headers.host;
  refreshVariables(hostName, envContext);

  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style?._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    const initialState = {};

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      token: getHeaderCookie('access_token', req.headers.cookie)
        ? getHeaderCookie('access_token', req.headers.cookie)
        : undefined,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    store.dispatch(
      setRuntimeVariable({
        name: 'availableLocales',
        value: config.locales,
      }),
    );

    const locale = req.language;
    const intl = await store.dispatch(
      setLocale({
        locale,
      }),
    );

    /**
     * this block set token to application,
     */
    const accessToken = getHeaderCookie('access_token', req.headers.cookie);
    const refreshToken = getHeaderCookie('refresh_token', req.headers.cookie);

    const accessData = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    /**
     * This part checks if the jwt is correct and valid
     */
    let jwt = null;
    if (refreshToken) {
      try {
        jwt = jwtDecode(accessToken);
      } catch (e) {
        res.cookie('access_token', '');
        res.cookie('refresh_token', '');
        res.redirect('/logout');
      }
    }
    if (jwt) {
      store.dispatch(loginSuccess(accessData));
      store.dispatch(jwtSuccess(jwt));

      /**
       * Get user UI settings
       * keep user UI settings on refresh
       */
      store.dispatch(getUISettingsAction());

      // TODO: check for correct usage
      const currentContext = resolveVariable(BASE_VARIABLE_KEYS.CONTEXT);

      /**
       * Set based context is logined for selected application in whole crm
       */
      const applications = await store.dispatch(getApplicationsAction());
      await store.dispatch(selectApplicationAction(currentContext));
      res.cookie('application_name', currentContext);
      /**
       * get all products and choose a product
       * keep productName on refresh
       *
       */
      const products = await store.dispatch(getGetProductsAction());
      if (products?.length && !req.cookies.product_name) {
        // set first product as selected, then keep it in cookie.
        await store.dispatch(selectProductAction(products[0]?.code));
        // res.cookie('product_name', products[0]?.code);
      } else if (products?.length && req.cookies.product_name) {
        // keep (or set) selected product on page refresh
        const found = products.find(
          values => values.code === req.cookies.product_name,
        );
        if (found) {
          await store.dispatch(selectProductAction(found.code));
        } else {
          await store.dispatch(selectProductAction(products[0]?.code));
          // res.cookie('product_name', products[0]?.code);
        }
      }

      if (!products && !applications && req.path !== '/500') {
        res.redirect('/500');
        return;
      }
    } else if (
      req.path !== '/login' &&
      !(
        req.path === '/500' ||
        req.path === '/503' ||
        req.path === '/unauth-phonenumber'
      )
    ) {
      res.redirect('/login');
      return;
    }
    // get acl menu list
    await store.dispatch(getAclMenuListAction());

    // get authorities list role actions
    await store.dispatch(getAclAuthoritiesListAction());
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // intl instance as it can be get with injectIntl
      intl,
      locale,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    const rootComponent = <App context={context}>{route.component}</App>;
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      HOSTURL: process.env.HOSTURL,
      CONTEXT: process.env.CONTEXT,
      MQTTURL: process.env.MQTTURL,
      MQTTCLIENTID: process.env.MQTTCLIENTID,
      MQTTUSERNAME: process.env.MQTTUSERNAME,
      MQTTPASSWORD: process.env.MQTTPASSWORD,
      MQTTCLEAN: process.env.MQTTCLEAN,
      NESHANCLIENTID: process.env.NESHANCLIENTID,
      NESHANBASEURL: process.env.NESHANBASEURL,
      CONTEXT_MAP: process.env.CONTEXT_MAP,
      ENV: process.env.ENV,
      state: context.store.getState(),
      lang: locale,
      buildMetaData: __BUILD_META_DATA__, // eslint-disable-line
    };

    const html = ReactDOM.renderToStaticMarkup(
      <Html {...data} hostName={hostName} />,
    );
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    if (process.env.ENV === 'production') {
      Sentry.captureException(err);
    }
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const locale = req.language;
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      hostName={hostName}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      app={{ lang: locale }}
    >
      {ReactDOM.renderToString(
        <IntlProvider locale={locale}>
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>,
      )}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
