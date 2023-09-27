import React, { useContext } from 'react';
import Modal from '../../Modal/Modal';
import CreatePhase from './createPhase';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../store';
import { closeModal } from '../store/actions';

function CreatePhaseModalWrapper() {
  const { state, dispatch } = useContext(ModalWrapperContext);
  const modalState = state.modals[MODAL_KEY_MAP.CREATE_PHASE];

  function hideModal() {
    dispatch(closeModal(MODAL_KEY_MAP.CREATE_PHASE));
  }

  return (
    <Modal show={modalState?.visible} handleClose={hideModal}>
      {modalState?.visible && (
        <CreatePhase pipeId={modalState?.data?.pipeId} onClose={hideModal} />
      )}
    </Modal>
  );
}

export default CreatePhaseModalWrapper;
