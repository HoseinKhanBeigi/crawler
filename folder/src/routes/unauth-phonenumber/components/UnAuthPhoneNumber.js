import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Frame from '../../../../public/images/Frame.svg';
import s from './UnAuthPhoneNumber.scss';
import { postNeshanLogoutAction } from '../../../store/neshanAuth/neshan.actions';
import { getNeshanLogoutUrl } from '../../../store/neshanAuth/neshan.services';

const UnAuthPhoneNumber = props => {
  const redirectToLogin = () => {
    props.postNeshanLogoutAction();
  };
  return (
    <>
      <div className={s.container}>
        <div className={s.box}>
          <img src={Frame} className={s.logo} alt="" />
          <p className={s.text}>کاربر گرامی شما به این بخش دسترسی ندارید.</p>
          <p className={s.text}>
            جهت دریافت اطلاعات بیشتر میتوانید با پشتیبانی تماس بگیرید.
          </p>
          <button className={s.logout} onClick={redirectToLogin}>
            خروج
          </button>
        </div>
      </div>
    </>
  );
};

UnAuthPhoneNumber.propTypes = {
  postNeshanLogoutAction: PropTypes.func.isRequired,
};
const mapState = () => {};

const mapDispatch = {
  postNeshanLogoutAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(UnAuthPhoneNumber));
