/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_OPERATION_MANAGEMENT_BRANCH } from '../../repository';
import AddOperationBranch from './components/AddOperationBranch';
import OperationBranchTable from './components/OperationBranchRelationTable';
import useBranchOperation from './hook';
import HandleAclPermission from '../../../HandleAclPermission/HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';

const ModalForEditOperationManagementBranch = ({ name, id }) => {
  const [visible, setVisible] = useState(true);
  const [data, onDelete, onAdd] = useBranchOperation(id);

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <CPModal
      title={name}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_EDIT_OPERATION_MANAGEMENT_BRANCH}
      footer={null}
    >
      <HandleAclPermission wich={Actions.createOperationBranchRelation}>
        <AddOperationBranch branchList={data} onAdd={onAdd} id={id} />
      </HandleAclPermission>
      <OperationBranchTable data={data} isRemove onDelete={onDelete} />
    </CPModal>
  );
};

ModalForEditOperationManagementBranch.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ModalForEditOperationManagementBranch;
