import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stickyWindowRepository from './StickyWindows/StickyWindowRepository';

const StickyWindowRoot = props => {
  const { stickyWindow } = props;
  return (
    <div>
      {stickyWindow.map(window => {
        const Window = stickyWindowRepository[window.type];

        return <Window key={window.type} {...window.props} />;
      })}
    </div>
  );
};

StickyWindowRoot.propTypes = {
  stickyWindow: PropTypes.array.isRequired,
};

const mapState = ({ stickyWindow }) => ({
  stickyWindow,
});

export default connect(mapState)(StickyWindowRoot);
