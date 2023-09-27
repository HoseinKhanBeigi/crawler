import React from 'react';
import Leads from './Leads';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'سرنخ حقیقی',
    chunks: ['leads'],
    component: (
      <Layout>
        <Leads />
      </Layout>
    ),
  };
}

export default action;
