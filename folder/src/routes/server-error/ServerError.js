import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ServerError.scss';
import history from '../../history';
import CPButton from '../../components/CP/CPButton';

class ServerError extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div>
          <h1 className={s.h1}>500</h1>
          <h2 className={s.h2}>خطای سرور</h2>
          <p className={s.p}>متاسفانه مشکلی در نمایش محتوا پیش آمده است.</p>
          <p className={s.p}>لطفا کمی صبر کنید سپس مجددا تلاش کنید.</p>
          <CPButton
            type="primary"
            className={s.btn}
            onClick={() => {
              history.replace('/');
            }}
          >
            خانه
          </CPButton>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ServerError);
