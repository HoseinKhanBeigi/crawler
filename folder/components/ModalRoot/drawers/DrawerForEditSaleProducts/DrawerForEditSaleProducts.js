import React from 'react';
import PropTypes from 'prop-types';
import SaleProductsDrawer from '../../../../routes/sale-products/components/SaleProductsDrawer/SaleProductsDrawer';
import { DRAWER_FOR_EDIT_SALE_PRODUCTS } from '../../repository';

const DrawerForEditSaleProducts = ({ data }) => (
  <SaleProductsDrawer
    data={data}
    drawerId={DRAWER_FOR_EDIT_SALE_PRODUCTS}
    editMode
  />
);

DrawerForEditSaleProducts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DrawerForEditSaleProducts;
