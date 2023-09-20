import React, { useState } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_GENERATE_SAYA_CONTRACT } from '../../repository';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import opportunityService from '../../../../service/opportunityService';

const ModalForGenerateSayaContract = props => {
  const { id } = props;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [collateralInfo, setCollateralInfo] = useState(null);

  const closeModal = () => {
    setVisible(false);
  };

  const generateCredit = async () => {
    setLoading(true);

    try {
      const {
        collateralInfo: receivedCollateralInfo,
      } = await opportunityService.createSayaCredit(id);
      setCollateralInfo(receivedCollateralInfo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CPModal
      title="ساخت و تخصیص اعتبار"
      onCancel={closeModal}
      visible={visible}
      modalType={MODAL_FOR_GENERATE_SAYA_CONTRACT}
      okText={collateralInfo ? 'بستن' : 'تخصیص اعتبار'}
      onOk={
        collateralInfo
          ? () => {
              closeModal();
              props.getOpportunitiesAction();
            }
          : generateCredit
      }
      confirmLoading={loading}
      cancelButtonProps={{ disabled: !!collateralInfo }}
    >
      {collateralInfo ? (
        <Alert
          message={
            collateralInfo.contractCreditId
              ? `شماره قرارداد: ${collateralInfo.contractCreditId}`
              : collateralInfo.error
          }
          type={collateralInfo.contractCreditId ? 'success' : 'error'}
        />
      ) : (
        <p>
          جهت ساخت و تخصیص اعتبار بر روی دکمه <strong>تخصیص اعتبار</strong>
          کلیک نمایید.
        </p>
      )}
    </CPModal>
  );
};

ModalForGenerateSayaContract.propTypes = {
  getOpportunitiesAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(null, mapDispatch)(ModalForGenerateSayaContract);
