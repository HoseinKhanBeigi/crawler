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
import serialize from 'serialize-javascript';
import config from '../config';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    app: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const {
      title,
      description,
      styles,
      scripts,
      app,
      children,
      hostName,
    } = this.props;
    return (
      <html className="no-js" lang={app.lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="stylesheet" href="/css/antd.min.css" />
          {app.lang === 'fa-IR'
            ? [
                <link rel="stylesheet" href="/css/fontiran.css" />,
                <link rel="stylesheet" href="/css/antd-rtl.css" />,
              ]
            : null}
          <link rel="stylesheet" href="/css/grid.css" />
          <link rel="stylesheet" href="/css/icons.css" />
          <link rel="stylesheet" href="/css/public.css" />
          <link rel="stylesheet" href="/css/_datepicker.css" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body className={app.lang === 'fa-IR' ? 'rtlLayout' : ''}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {/* <script src="/js/env-conf.js" /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                const _HOSTURL_=\`${app.HOSTURL}\`;
                const _ENV_=\`${app.ENV}\`;
                const _MQTTURL_=\`${app.MQTTURL}\`;
                const _MQTTCLIENTID_=\`${app.MQTTCLIENTID}\`;
                const _MQTTUSERNAME_=\`${app.MQTTUSERNAME}\`;
                const _MQTTPASSWORD_=\`${app.MQTTPASSWORD}\`;
                const _MQTTCLEAN_=\`${app.MQTTCLEAN}\`;
                const _NESHAN_CLIENT_ID_=\`${app.NESHANCLIENTID}\`;
                const _NESHAN_BASE_URL_=\`${app.NESHANBASEURL}\`;
                const _HOSTNAME_=\`${hostName}\`;
                const _CONTEXT_MAP_=\`${app.CONTEXT_MAP}\`;
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${config.analytics.googleTrackingId}','{secure;samesite=none}');ga('send','pageview')`,
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
        </body>
      </html>
    );
  }
}

export default Html;
