import React, { useState } from 'react';
import { MODAL_FOR_ADD_DISPATCH_GROUP } from '../../repository';
import CPModal from '../../../CP/CPModal/CPModal';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { DISPATCH_GROUP_TABLE } from '../../../../store/settings/settings.constants';
import StepsNewGroups from '../../../../routes/operation-mgmt/DispatchesManagement/StepsNewGroups';

const ModalForAddDispatchGroup = () => {
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };
  const refreshTable = () => {
    kianTableApi(DISPATCH_GROUP_TABLE).refreshTable();
  };

  return (
    <CPModal
      title="ایجاد گروه جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_DISPATCH_GROUP}
      width={800}
    >
      <StepsNewGroups refreshTable={refreshTable} onClose={closeModal} />
    </CPModal>
  );
};

export default ModalForAddDispatchGroup;
