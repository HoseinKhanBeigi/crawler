import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import SalesOpportunities from './SalesOpportunities';

const title = 'فرصت های فروش';

async function action() {
  return {
    chunks: ['sales-opportunities'],
    title,
    component: (
      <Layout>
        <SalesOpportunities title={title} />
      </Layout>
    ),
  };
}

export default action;
