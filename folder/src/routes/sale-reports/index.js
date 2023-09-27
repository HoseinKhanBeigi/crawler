import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import SaleReports from './containers/SaleReports';

const title = 'گزارشات فروش';

export default () => ({
  title,
  chunks: ['sale-reports'],
  component: (
    <Layout>
      <SaleReports />
    </Layout>
  ),
});
