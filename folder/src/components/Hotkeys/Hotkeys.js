import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';
import withModal from '../HOC/withModal';

const Hotkeys = ({ showModalAction, shortcuts }) => {
  const showModal = type => () => {
    showModalAction({ type });
  };

  const handlers = () => {
    const hand = {};
    Object.keys(shortcuts).forEach(k => {
      hand[k] = showModal(k);
    });
    return hand;
  };

  const keyMap = () => {
    const result = {};
    Object.entries(shortcuts).forEach(([k, v]) => {
      result[k] = v.shortcut;
    });
    return result;
  };

  return <GlobalHotKeys keyMap={keyMap()} handlers={handlers()} />;
};

Hotkeys.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  shortcuts: PropTypes.object.isRequired,
};

const mapState = ({ settings }) => ({
  shortcuts: settings?.settings?.globalSettings?.shortcuts,
});

export default connect(mapState)(withModal(Hotkeys));
