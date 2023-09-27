import React from 'react';
import { connect } from 'react-redux';

import {
  showStickyWindowAction,
  hideStickyWindowAction,
  hideAllStickyWindowAction,
} from '../../store/stickyWindow/stickyWindow.actions';

export default Component => {
  function WithStickyWindow(props) {
    return <Component {...props} />;
  }

  const mapState = ({ windows }) => ({ windows });

  const mapDispatch = {
    showStickyWindowAction,
    hideStickyWindowAction,
    hideAllStickyWindowAction,
  };

  return connect(mapState, mapDispatch)(WithStickyWindow);
};
