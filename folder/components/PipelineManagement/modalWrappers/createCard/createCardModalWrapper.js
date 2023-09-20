import React, { useContext } from 'react';
import Modal from '../../Modal/Modal';
import CreateCard from './createCard';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../store';
import { closeModal } from '../store/actions';

function CreateCardModalWrapper() {
  const { state, dispatch } = useContext(ModalWrapperContext);
  const modalState = state.modals[MODAL_KEY_MAP.CREATE_CARD];

  function hideModal() {
    dispatch(closeModal(MODAL_KEY_MAP.CREATE_CARD));
  }

  return (
    <Modal show={modalState?.visible} handleClose={hideModal}>
      {modalState?.visible && (
        <CreateCard
          pipeId={modalState?.data?.pipeId}
          onClose={hideModal}
          phaseName={modalState?.data?.phaseName}
        />
      )}
    </Modal>
  );
}

export default CreateCardModalWrapper;
