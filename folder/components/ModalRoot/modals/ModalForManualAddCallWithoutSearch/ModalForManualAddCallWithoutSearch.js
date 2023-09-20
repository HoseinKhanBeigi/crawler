import React, { useState } from 'react';
import CPModal from '../../../CP/CPModal';
import PhoneLogActivityForm from '../../../PhoneLogActivityForm';
import { PHONE_CALL_TABLE } from '../../../../store/settings/settings.constants';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH } from '../../repository';

const ModalForManualAddCallWithoutSearch = () => {
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
      modalType={MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH}
      footer={false}
    >
      <PhoneLogActivityForm onSubmit={refreshAndCloseTable} />
    </CPModal>
  );
};

export default ModalForManualAddCallWithoutSearch;
