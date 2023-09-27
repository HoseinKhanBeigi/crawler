import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import AddPersonForm from '../../../AddPersonForm';
import { MODAL_FOR_PERSON_FORM } from '../../repository';

const ModalForPersonForm = props => {
  const { editMode, refreshTable, resetTable } = props;

  const [visible, setVisible] = useState(true);

  const closeModal = () => setVisible(false);

  const onSubmit = () => {
    refreshTable();
    resetTable();
    closeModal();
  };

  return (
    <CPModal
      title={editMode ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
      visible={visible}
      onCancel={closeModal}
      footer={null}
      modalType={MODAL_FOR_PERSON_FORM}
    >
      <AddPersonForm
        onSubmit={onSubmit}
        editMode={editMode}
        closeModal={closeModal}
      />
    </CPModal>
  );
};

ModalForPersonForm.propTypes = {
  editMode: PropTypes.bool,
  refreshTable: PropTypes.func,
  resetTable: PropTypes.func,
};

ModalForPersonForm.defaultProps = {
  editMode: false,
  refreshTable: () => {},
  resetTable: () => {},
};

export default ModalForPersonForm;
