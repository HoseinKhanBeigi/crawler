import React from 'react';
import LegalLeads from './LegalLeads';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'سرنخ حقوقی',
    chunks: ['legal-leads'],
    component: (
      <Layout>
        <LegalLeads />
      </Layout>
    ),
  };
}

export default action;
