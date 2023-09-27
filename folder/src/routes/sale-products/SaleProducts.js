import React from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../components/KianTable';
import { SALE_PRODUCTS_LIST_TABLE } from '../../store/settings/settings.constants';
import { saleProductServices } from '../../service/saleProductServices';
import columns from './utils/columns';
import {
  DRAWER_FOR_EDIT_SALE_PRODUCTS,
  DRAWER_FOR_VIEW_SALE_PRODUCTS,
  MODAL_FOR_ADD_SALE_PRODUCT,
} from '../../components/ModalRoot/repository';
import withModal from '../../components/HOC/withModal';
import { Actions } from '../../utils/aclActions';

const SaleProducts = props => {
  const activityButton = [
    {
      label: 'محصول جدید',
      icon: 'plus',
      authority: Actions.saleProductCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_SALE_PRODUCT,
        }),
    },
  ];

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const contextMenu = [
    {
      label: `مشاهده`,
      authority: Actions.saleProductLoad,
      action: data =>
        showModal(DRAWER_FOR_VIEW_SALE_PRODUCTS)({
          data,
        })(),
    },
    {
      label: `ویرایش`,
      authority: Actions.saleProductUpdate,
      action: data =>
        showModal(DRAWER_FOR_EDIT_SALE_PRODUCTS)({
          data,
        })(),
    },
  ];

  return (
    <KianTable
      tableId={SALE_PRODUCTS_LIST_TABLE}
      endpoint={saleProductServices.endPoint}
      persistInLocalStorage={false}
      activityButton={activityButton}
      withSearch={false}
      withSort={false}
      headerTitle="فروش محصول"
      columns={columns}
      contextMenu={contextMenu}
    />
  );
};

SaleProducts.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};
export default withModal(SaleProducts);
