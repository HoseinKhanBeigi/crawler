import React from 'react';
import Layout from '../../components/AdminLayout';
import KycLevel from './container/KycLevel';

export default function action() {
  return {
    chunks: ['kyc-level'],
    title: 'سطح احراز هویت',
    component: (
      <Layout>
        <KycLevel />
      </Layout>
    ),
  };
}
