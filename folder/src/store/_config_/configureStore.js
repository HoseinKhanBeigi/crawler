import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { name, version } from '../../../package.json';
import rootReducer from './rootReducer';
import createHelpers from './createHelpers';
import { POST_NESHAN_LOGOUT_SUCCESS } from '../neshanAuth/neshan.constants';

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    // middleware.push(createLogger());
    middleware.push(
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST_PAGE', 'REQUEST_PAGE', 'REQUEST_PAGE'],
      }),
    );

    // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
    const composeEnhancers = composeWithDevTools({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: `${name}@${version}`,
    });

    // https://redux.js.org/docs/api/applyMiddleware.html
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const getRootReducer = (state, action) => {
    const appState =
      action.type === POST_NESHAN_LOGOUT_SUCCESS ? { intl: state.intl } : state;
    return rootReducer(appState, action);
  };

  // https://redux.js.org/docs/api/createStore.html
  const store = createStore(getRootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('./rootReducer', () =>
      // Don't forget to remove `()` if you change reducers back to normal rootReducer.
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./rootReducer').default),
    );
  }

  return store;
}
