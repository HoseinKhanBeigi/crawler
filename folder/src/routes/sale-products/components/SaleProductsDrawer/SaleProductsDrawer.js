import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from '../../../sales-opportunities/components/SaleOpportunityDrawer/SaleOpportunityDrawer.scss';
import { itemsList } from './utils/itemsList';
import RenderDetailRow from '../../../sessions/components/SessionDrawer/components/RenderDetailRow/RenderDetailRow';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import { SALE_PRODUCTS_LIST_TABLE } from '../../../../store/settings/settings.constants';
import AddSaleProductForm from '../../../../components/AddSaleProductForm';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import KianDrawer from '../../../../components/KianDrawer/KianDrawer';
import { DRAWER_FOR_EDIT_SALE_PRODUCTS } from '../../../../components/ModalRoot/repository';

const convertDataToFormFormat = data => ({
  ...data,
  productPrice: toCommaSeparatedNumber(data.productPrice),
});

const SaleProductsDrawer = ({
  data: dataFromTable,
  drawerId,
  editMode: editing,
}) => {
  const [editMode, setEditMode] = useState(editing);
  const [data, setData] = useState(dataFromTable);
  const [visible, setVisible] = useState(true);
  const closeDrawer = () => {
    setEditMode(false);
    setVisible(false);
  };

  const isEditDrawer = drawerId === DRAWER_FOR_EDIT_SALE_PRODUCTS;

  const closeHandler = () =>
    isEditDrawer ? closeDrawer() : setEditMode(false);

  useEffect(() => {
    setData(dataFromTable);
  }, [dataFromTable]);

  const refreshData = newData => {
    kianTableApi(SALE_PRODUCTS_LIST_TABLE).refreshTable();
    setData(newData);
    closeHandler();
  };

  const renderContainer = () =>
    editMode ? (
      <AddSaleProductForm
        editMode={editMode}
        initialValues={convertDataToFormFormat(data)}
        onSubmit={refreshData}
        onCancel={closeHandler}
      />
    ) : (
      itemsList(data).map(d => (
        <RenderDetailRow
          title={d.title}
          data={d.data}
          type={d.type}
          tagColor={d.tagColor || undefined}
          titleMaxWidth={140}
        />
      ))
    );

  return (
    <KianDrawer
      width={420}
      drawerId={drawerId}
      title="مشاهده محصول"
      visible={visible}
      onClose={closeDrawer}
      okText="ویرایش محصول"
      onOk={() => setEditMode(true)}
      footer={!editMode}
    >
      <div className={s.container}>{data && renderContainer()}</div>
    </KianDrawer>
  );
};

SaleProductsDrawer.propTypes = {
  data: PropTypes.object.isRequired,
  drawerId: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};
export default withStyles(s)(SaleProductsDrawer);
