/**
 * Error Handling
 * author: Ali Eslamifard
 * @input {data, redirect}
 * @param {object} data - json response from fetch
 * @param {boolean} redirect - check for 403,401 status code then redirect to '/logout'
 * @return { err, message, resp, redirect }
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
// import history from '../history';
import messages from './messages';

class ErrorHandling {
  constructor(data, redirect = true) {
    this.status = data.status;
    this.data =
      data.data === null || data.data === undefined ? data : data.data;
    this.text = null;
    this.redirect = redirect;
  }

  static serverError(status = 500) {
    return {
      status,
      err: true,
      message: <FormattedMessage {...messages.serverErr} />,
    };
  }

  async resp(response = null) {
    let result;
    switch (this.status) {
      case 200:
        try {
          result = await this.data.json();
        } catch (e) {
          result = this.data;
        }
        return {
          status: this.status,
          err: false,
          resp: result,
        };
      case 201:
        try {
          result = await this.data.json();
        } catch (e) {
          result = this.data;
        }
        return {
          status: this.status,
          err: false,
          resp: result,
        };
      case 401:
        // if (
        //   this.redirect &&
        //   history &&
        //   history?.location?.pathname !== '/login'
        // ) {
        //   history.push('/logout');
        // }
        return {
          status: this.status,
          err: true,
          message: <FormattedMessage {...messages.unauthorized} />,
          // redirect: '/logout',
        };
      case 400:
        try {
          result = await response?.text();
        } catch (e) {
          result = this.data;
        }
        return {
          status: this.status,
          err: true,
          text: result,
          message: result,
        };
      case 404:
        return {
          status: this.status,
          err: true,
          message: <FormattedMessage {...messages.invalidReq} />,
        };
      case 403:
        return {
          status: this.status,
          err: true,
          message: <FormattedMessage {...messages.forbidden} />,
        };
      case 429:
        return {
          status: this.status,
          err: true,
          message: { ...messages.rateLimitExceeded },
        };
      case 406:
        try {
          result = await this.data.json();
        } catch (e) {
          result = this.data;
        }
        return {
          status: this.status,
          err: true,
          resp: result,
        };
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return ErrorHandling.serverError(this.status);
      default:
        return {};
    }
  }
}

export default ErrorHandling;
