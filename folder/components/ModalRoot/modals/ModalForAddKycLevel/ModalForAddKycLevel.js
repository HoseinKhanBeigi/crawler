import React, { useState } from 'react';
import { MODAL_FOR_ADD_KYC_LEVEL } from '../../repository';
import KycLevelForm from '../../../../routes/kyc-level/components/KycLevelForm';
import CPModal from '../../../CP/CPModal';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import kycLevelService from '../../../../service/kycLevelService';
import { KYC_LEVELS_TABLE } from '../../../../store/settings/settings.constants';

const ModalForAddKycLevel = () => {
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };

  const refreshTable = () => {
    kianTableApi(KYC_LEVELS_TABLE).refreshTable();
  };

  const submitFormHandler = async data => {
    try {
      await kycLevelService.addKycLevel(data);
      refreshTable();
      closeModal();
    } catch (e) {
      // ...
    }
  };

  return (
    <CPModal
      title="سطح جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_KYC_LEVEL}
    >
      <KycLevelForm onSubmit={submitFormHandler} onCancel={closeModal} />
    </CPModal>
  );
};

export default ModalForAddKycLevel;
