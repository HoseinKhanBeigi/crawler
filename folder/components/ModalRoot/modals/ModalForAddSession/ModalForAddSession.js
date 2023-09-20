import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { MODAL_FOR_ADD_SESSION } from '../../repository';
import { SESSION_LIST_TABLE } from '../../../../store/settings/settings.constants';
import AddSessionForm from '../../../AddSessionForm';

const ModalForAddSession = ({ withSessionFor }) => {
  const [visible, setVisible] = useState(true);

  function closeModal() {
    setVisible(false);
  }

  const closeAndRefresh = () => {
    kianTableApi(SESSION_LIST_TABLE).refreshTable();
    setVisible(false);
  };

  return (
    <CPModal
      title="ایجاد جلسه جدید"
      footer={false}
      width={520}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_SESSION}
    >
      <AddSessionForm
        onSubmit={closeAndRefresh}
        withSessionFor={withSessionFor}
      />
    </CPModal>
  );
};
ModalForAddSession.defaultProps = {
  withSessionFor: true,
};
ModalForAddSession.propTypes = {
  withSessionFor: PropTypes.bool,
};
export default ModalForAddSession;
