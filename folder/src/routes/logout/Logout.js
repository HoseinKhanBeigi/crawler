import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
import { deleteUserDataCookie } from '../../store/neshanAuth/neshan.actions';
import { getNeshanLogoutUrl } from '../../store/neshanAuth/neshan.services';

const Logout = ({ query }) => {
  useEffect(() => {
    if (query.state === 'success') {
      deleteUserDataCookie();
      history.push('/login');
    } else {
      const idToken = localStorage.getItem('id_token');
      window.location.assign(
        `${getNeshanLogoutUrl()}?redirect_uri=${encodeURI(
          `${window.location.origin}/logout?state=success`,
        )}&post_logout_redirect_uri=${encodeURI(
          `${window.location.origin}/logout?state=success`,
        )}&id_token_hint=${idToken}`,
      );
    }
  }, []);

  return <></>;
};

Logout.propTypes = {
  query: PropTypes.objectOf({
    state: PropTypes.string,
  }).isRequired,
};
export default Logout;
