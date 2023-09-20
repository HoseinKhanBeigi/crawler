import React from 'react';
import PropTypes from 'prop-types';
import SaleOpportunityDrawer from '../../../../routes/sales-opportunities/components/SaleOpportunityDrawer/SaleOpportunityDrawer';
import { DRAWER_FOR_VIEW_SALE_OPPORTUNITY } from '../../repository';

const DrawerForViewSaleOpportunityDetail = ({ data, saleStates }) => (
  <SaleOpportunityDrawer
    drawerId={DRAWER_FOR_VIEW_SALE_OPPORTUNITY}
    data={data}
    saleStates={saleStates}
  />
);

DrawerForViewSaleOpportunityDetail.propTypes = {
  data: PropTypes.object.isRequired,
  saleStates: PropTypes.object.isRequired,
};

export default DrawerForViewSaleOpportunityDetail;
