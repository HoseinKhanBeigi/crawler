import React from 'react';
import SamatDetails from './SamatDetails';
import Layout from '../../components/AdminLayout';

async function action({ params }) {
  const { nationalCode } = params;
  const { id } = params;
  return {
    title: 'جزییات اعتبارسنجی سمات',
    chunks: ['samatdetails'],
    component: (
      <Layout>
        <SamatDetails param={nationalCode ? { nationalCode } : { id }} />
      </Layout>
    ),
  };
}

export default action;
