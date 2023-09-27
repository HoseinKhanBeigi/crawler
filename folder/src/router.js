import React from 'react';
import UniversalRouter from 'universal-router';
import { FormattedMessage } from 'react-intl';
import routes from './routes';
import messages from './routes/messages';
import config from './webConfig';
import setBreadCrumb from './store/breadCrumb/breadCrumb.actions';

function setDynamicPath(pathList, path) {
  return pathList[
    pathList.findIndex(pathName => pathName === path.replace('/', '')) + 1
  ];
}

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    const { pathname, store } = context;
    if (config.showBreadcrumb) {
      const breadcrumbs = [];
      let { route } = context;
      const pathList = pathname.split('/');
      while (route) {
        let { title } = route;
        let path = route.path.replace('/', '');

        if (path.charAt(0) === ':') {
          let dynamicPathList = route.path.split('/');
          dynamicPathList = dynamicPathList.filter(item => item !== ':id');
          dynamicPathList.forEach(item => {
            const name = params[item.replace(':', '')];
            if (messages[name]) {
              title = <FormattedMessage {...messages[name]} />;
            } else {
              title = name;
            }
          });
          path = setDynamicPath(pathList, route.parent.path);
        }

        const url = pathList.filter(
          (item, index) => index <= pathList.indexOf(path),
        );
        if (url[0] === '' && url.length === 1) url[0] = '/';

        breadcrumbs.push({
          url:
            route.load ||
            (route.children &&
              route.children.find(item => item.path === '') !== undefined)
              ? url.join('/')
              : undefined,
          title,
        });
        route = route.parent;
      }
      store.dispatch(setBreadCrumb(breadcrumbs));
    }
    if (typeof context.route.load === 'function') {
      return context.route
        ?.load()
        .then(action => action.default(context, params));
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return undefined;
  },
});
