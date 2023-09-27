import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './SaleOpportunityDrawer.scss';
import { itemsList } from './utils/itemsList';
import RenderDetailRow from '../../../sessions/components/SessionDrawer/components/RenderDetailRow/RenderDetailRow';
import AddSaleOpportunityForm from '../../../../components/AddSaleOpportunityForm';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import { SALE_OPPORTUNITY_LIST_TABLE } from '../../../../store/settings/settings.constants';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import KianDrawer from '../../../../components/KianDrawer/KianDrawer';
import { DRAWER_FOR_EDIT_SALE_OPPORTUNITY } from '../../../../components/ModalRoot/repository';

const convertDataToFormFormat = data => ({
  ...data,
  saleProduct: data.saleProduct.id,
  expectedBudget: toCommaSeparatedNumber(data.expectedBudget),
  description: data.description || '',
});

const SaleOpportunityDrawer = ({
  data: dataFromTable,
  saleStates,
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

  const isEditDrawer = drawerId === DRAWER_FOR_EDIT_SALE_OPPORTUNITY;

  const closeHandler = () =>
    isEditDrawer ? closeDrawer() : setEditMode(false);

  useEffect(() => {
    setData(dataFromTable);
  }, [dataFromTable]);

  const refreshData = newData => {
    kianTableApi(SALE_OPPORTUNITY_LIST_TABLE).refreshTable();
    setData(newData);
    closeHandler();
  };

  const renderContainer = () =>
    editMode ? (
      <AddSaleOpportunityForm
        editMode={editMode}
        initialValues={convertDataToFormFormat(data)}
        onSubmit={refreshData}
        onCancel={closeHandler}
      />
    ) : (
      itemsList(data, saleStates).map(d => (
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
      title="مشاهده فرصت فروش"
      visible={visible}
      onClose={closeDrawer}
      okText="ویرایش فرصت فروش"
      onOk={() => setEditMode(true)}
      footer={!editMode}
      drawerId={drawerId}
    >
      <div className={s.container}>{data && renderContainer()}</div>
    </KianDrawer>
  );
};

SaleOpportunityDrawer.defaultProps = {
  editMode: false,
};

SaleOpportunityDrawer.propTypes = {
  data: PropTypes.object.isRequired,
  drawerId: PropTypes.string.isRequired,
  saleStates: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
};
export default withStyles(s)(SaleOpportunityDrawer);
