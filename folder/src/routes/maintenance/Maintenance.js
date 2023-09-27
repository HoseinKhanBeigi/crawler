import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Maintenance.scss';

class Maintenance extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div>
          <h1 className={s.h1}>در حال بروزرسانی</h1>
          <h2 className={s.h2}>شکیبا باشید.</h2>
          <p className={s.p}>
            سرور درحال بروزرسانی است و کمی بعد در دسترس خواهد بود.
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Maintenance);
