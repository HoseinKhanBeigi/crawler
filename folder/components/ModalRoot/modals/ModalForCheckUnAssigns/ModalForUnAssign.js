import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import CPMessage from '../../../CP/CPMessage';
import { postUnAssignsAction } from '../../../../store/assign/assign.actions';
import { MODAL_FOR_UN_ASSIGN } from '../../repository';

const ModalForUnAssign = props => {
  const {
    selectedLeads,
    loading,
    deSelectRows,
    ids: leadIds,
    type: leadType,
  } = props;
  const [visible, setVisible] = useState(true);
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [owner, setOwner] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const validateSameOwner = () => {
    const cleanOwner = new Set();
    selectedLeads.forEach(l => cleanOwner.add(l.assigneeLevantId));
    if (cleanOwner.size > 1 || cleanOwner.has(null)) {
      setIsValidStatus(false);
    } else {
      setOwner(
        selectedLeads.find(l => l.assigneeLevantId === [...cleanOwner][0]),
      );
    }
  };

  useEffect(validateSameOwner, []);

  const unAssign = async () => {
    const body = {
      ownerLevantId: owner.assigneeLevantId,
      relevantLevantIds: selectedLeads.map(l => l.levantId),
    };
    if (leadIds?.length > 0) body.leadIds = leadIds;
    const result = await props.postUnAssignsAction(body, leadType);
    if (result === 'OK') {
      CPMessage('رفع مسئولیت با موفقیت انجام شد.', 'success');
      deSelectRows();
      closeModal();
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  return (
    <CPModal
      title="تایید رفع مسئولیت"
      visible={visible}
      onCancel={closeModal}
      onOk={unAssign}
      confirmLoading={loading}
      modalType={MODAL_FOR_UN_ASSIGN}
      okButtonProps={{ disabled: !isValidStatus }}
    >
      {isValidStatus ? (
        <p>{`از رفع مسئولیت ${selectedLeads.length} مورد انتخاب شده از ${owner.assigneeFullName} اطمینان دارید؟`}</p>
      ) : (
        <Alert
          message="خطا"
          description="افراد انتخابی باید دارای مسئول بوده و مسئول آن‌ها یکسان باشد!"
          type="error"
          showIcon
        />
      )}
    </CPModal>
  );
};

ModalForUnAssign.propTypes = {
  selectedLeads: PropTypes.array,
  postUnAssignsAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  deSelectRows: PropTypes.func,
  ids: PropTypes.string,
  type: PropTypes.string,
};

ModalForUnAssign.defaultProps = {
  selectedLeads: [],
  loading: false,
  deSelectRows: () => {},
  ids: null,
  type: null,
};

const mapStateToProps = state => ({
  loading: state.assign.postUnAssignsLoading,
});

const mapDispatch = {
  postUnAssignsAction,
};

export default connect(mapStateToProps, mapDispatch)(ModalForUnAssign);
