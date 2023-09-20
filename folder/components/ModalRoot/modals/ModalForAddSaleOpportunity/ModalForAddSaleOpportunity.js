import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { MODAL_FOR_ADD_SALE_OPPORTUNITY } from '../../repository';
import { SALE_OPPORTUNITY_LIST_TABLE } from '../../../../store/settings/settings.constants';
import AddSaleOpportunityForm from '../../../AddSaleOpportunityForm';

const ModalForAddSaleOpportunity = props => {
  const [visible, setVisible] = useState(true);

  function closeModal() {
    setVisible(false);
  }

  const closeAndRefresh = () => {
    kianTableApi(SALE_OPPORTUNITY_LIST_TABLE).refreshTable();
    setVisible(false);
  };

  return (
    <CPModal
      title="ایجاد فرصت فروش"
      footer={false}
      width={520}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_SALE_OPPORTUNITY}
    >
      <AddSaleOpportunityForm
        withLeadSearch={props.withLeadSearch}
        onSubmit={closeAndRefresh}
        onCancel={closeModal}
      />
    </CPModal>
  );
};

ModalForAddSaleOpportunity.defaultProps = {
  withLeadSearch: true,
};
ModalForAddSaleOpportunity.propTypes = {
  withLeadSearch: PropTypes.bool,
};
export default ModalForAddSaleOpportunity;
