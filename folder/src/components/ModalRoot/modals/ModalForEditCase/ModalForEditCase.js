import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_CASE } from '../../repository';
import EditCaseForm from '../../../EditCaseForm/EditCaseForm';

const ModalForEditCase = props => {
  const { data } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title="ویرایش درخواست"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_EDIT_CASE}
    >
      <EditCaseForm data={data} onFinish={closeModal} />
    </CPModal>
  );
};

ModalForEditCase.defaultProps = {
  data: {},
};
ModalForEditCase.propTypes = {
  data: PropTypes.object,
};

export default ModalForEditCase;
