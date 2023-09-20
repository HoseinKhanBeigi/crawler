import React from 'react';
import PropTypes from 'prop-types';
import SaleOpportunityDrawer from '../../../../routes/sales-opportunities/components/SaleOpportunityDrawer/SaleOpportunityDrawer';
import { DRAWER_FOR_EDIT_SALE_OPPORTUNITY } from '../../repository';

const DrawerForEditSaleOpportunityDetail = ({ data, saleStates }) => (
  <SaleOpportunityDrawer
    editMode
    drawerId={DRAWER_FOR_EDIT_SALE_OPPORTUNITY}
    data={data}
    saleStates={saleStates}
  />
);

DrawerForEditSaleOpportunityDetail.propTypes = {
  data: PropTypes.object.isRequired,
  saleStates: PropTypes.object.isRequired,
};

export default DrawerForEditSaleOpportunityDetail;
