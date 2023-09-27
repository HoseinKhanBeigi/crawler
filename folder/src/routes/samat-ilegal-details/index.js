import React from 'react';
import SamatDetails from './SamatIlegalDetails';
import Layout from '../../components/AdminLayout/AdminLayout';

async function action({ params }) {
  const { nationalCode } = params;
  const { id } = params;
  return {
    title: 'اعتبارسنجی سمات-حقیقی',
    chunks: ['samatIlegaldetails'],
    component: (
      <Layout>
        <SamatDetails param={nationalCode ? { nationalCode } : { id }} />
      </Layout>
    ),
  };
}

export default action;
