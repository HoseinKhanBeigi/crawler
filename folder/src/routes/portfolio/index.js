import React from 'react';
import Portfolio from './Portfolio';
import Layout from '../../components/AdminLayout';

async function action({ params }) {
  const { levantId } = params;
  return {
    title: 'پورتفوی مالی',
    chunks: ['portfolio'],
    component: (
      <Layout>
        <Portfolio levantId={levantId} />
      </Layout>
    ),
  };
}

export default action;
