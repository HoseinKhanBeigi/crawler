import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal/Modal';
import CardDetail from './CardDetail';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../store';
import { closeModal } from '../store/actions';

function CardDetailModalWrapper(props) {
  const { state, dispatch } = useContext(ModalWrapperContext);
  const modalState = state.modals[MODAL_KEY_MAP.CARD_DETAIL];
  const { titleId } = props;

  function hideModal() {
    dispatch(closeModal(MODAL_KEY_MAP.CARD_DETAIL));
  }

  return (
    <Modal show={modalState?.visible} handleClose={hideModal}>
      {modalState?.visible && (
        <CardDetail
          modalFlag
          card={modalState?.data?.card}
          close={hideModal}
          cardTitle={titleId}
        />
      )}
    </Modal>
  );
}

CardDetailModalWrapper.propTypes = {
  titleId: PropTypes.string.isRequired,
};

export default CardDetailModalWrapper;
