import React from 'react';
import { connect } from 'react-redux';

import {
  showModalAction,
  hideModalAction,
  hideAllModalAction,
} from '../../store/modals/modals.actions';

export default Component => {
  function withModal(props) {
    return <Component {...props} />;
  }

  const mapState = ({ modals }) => ({ modals });

  const mapDispatch = {
    showModalAction,
    hideModalAction,
    hideAllModalAction,
  };

  return connect(mapState, mapDispatch)(withModal);
};
