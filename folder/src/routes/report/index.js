import React from 'react';
import Layout from '../../components/AdminLayout';
import Report from './Report';

async function action({ params }) {
  const { levantId } = params;
  const title = ` جزئیات گزارش های کاربر ${levantId}`;
  return {
    chunks: ['report'],
    title,
    component: (
      <Layout>
        <Report title={title} levantId={levantId} />
      </Layout>
    ),
  };
}

export default action;
