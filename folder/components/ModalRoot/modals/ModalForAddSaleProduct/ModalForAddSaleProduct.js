import React, { useState } from 'react';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_ADD_SALE_PRODUCT } from '../../repository';
import AddSaleProductForm from '../../../AddSaleProductForm';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { SALE_PRODUCTS_LIST_TABLE } from '../../../../store/settings/settings.constants';

const ModalForAddSaleProduct = () => {
  const [visible, setVisible] = useState(true);

  function closeModal() {
    setVisible(false);
  }

  const closeAndRefresh = () => {
    kianTableApi(SALE_PRODUCTS_LIST_TABLE).refreshTable();
    setVisible(false);
  };

  return (
    <CPModal
      title="ایجاد محصول"
      footer={false}
      width={520}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_SALE_PRODUCT}
    >
      <AddSaleProductForm onSubmit={closeAndRefresh} onCancel={closeModal} />
    </CPModal>
  );
};

export default ModalForAddSaleProduct;
