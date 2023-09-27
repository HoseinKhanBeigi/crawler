import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import SaleProducts from './SaleProducts';

const title = 'محصولات فروش';

async function action() {
  return {
    chunks: ['sale-products'],
    title,
    component: (
      <Layout>
        <SaleProducts title={title} />
      </Layout>
    ),
  };
}

export default action;
