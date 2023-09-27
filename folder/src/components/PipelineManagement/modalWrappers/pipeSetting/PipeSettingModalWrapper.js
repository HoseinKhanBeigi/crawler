import React, { useContext } from 'react';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../store';
import { closeModal } from '../store/actions';
import Modal from '../../Modal/Modal';
import PipeSetting from '../../PipeSetting/pipeSetting';

function PipeSettingModalWrapper() {
  const { state, dispatch } = useContext(ModalWrapperContext);
  const modalState = state.modals[MODAL_KEY_MAP.PIPE_SETTING];

  function hideModal() {
    dispatch(closeModal(MODAL_KEY_MAP.PIPE_SETTING));
  }

  return (
    <Modal show={modalState?.visible} handleClose={hideModal}>
      {modalState?.visible && (
        <PipeSetting
          onClose={hideModal}
          actionId={modalState?.data?.actionId}
          pipeId={modalState?.data?.pipeId}
          phaseId={modalState?.data?.phaseId}
        />
      )}
    </Modal>
  );
}

export default PipeSettingModalWrapper;
