import React from 'react';
import PropTypes from 'prop-types';
import SaleProductsDrawer from '../../../../routes/sale-products/components/SaleProductsDrawer/SaleProductsDrawer';
import { DRAWER_FOR_VIEW_SALE_PRODUCTS } from '../../repository';

const DrawerForViewSaleProducts = ({ data }) => (
  <SaleProductsDrawer data={data} drawerId={DRAWER_FOR_VIEW_SALE_PRODUCTS} />
);

DrawerForViewSaleProducts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DrawerForViewSaleProducts;
