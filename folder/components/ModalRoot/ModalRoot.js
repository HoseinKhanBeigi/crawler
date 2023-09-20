import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import repository from './repository';

const ModalRoot = props => {
  const { modals } = props;
  return (
    <div>
      {modals.map(modal => {
        const Modal = repository[modal.type];

        return <Modal key={modal.type} {...modal.props} />;
      })}
    </div>
  );
};

ModalRoot.propTypes = {
  modals: PropTypes.array.isRequired,
};

const mapState = ({ modals }) => ({
  modals,
});

export default connect(mapState)(ModalRoot);
