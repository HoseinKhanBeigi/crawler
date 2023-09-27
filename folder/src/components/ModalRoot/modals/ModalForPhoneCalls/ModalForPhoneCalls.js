import React, { useState } from 'react';
import CPModal from '../../../CP/CPModal';
import PhoneLogActivityForm from '../../../PhoneLogActivityForm';
import { PHONE_CALL_TABLE } from '../../../../store/settings/settings.constants';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { MODAL_FOR_PHONE_CALLS } from '../../repository';

const ModalForPhoneCalls = () => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const refreshAndCloseTable = () => {
    kianTableApi(PHONE_CALL_TABLE).refreshTable();
    setVisible(false);
  };

  return (
    <CPModal
      title="افزودن تماس"
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_PHONE_CALLS}
      footer={false}
    >
      <PhoneLogActivityForm onSubmit={refreshAndCloseTable} withSearch />
    </CPModal>
  );
};

export default ModalForPhoneCalls;
