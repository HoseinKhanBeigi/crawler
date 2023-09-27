import React from 'react';
import CardDetails from './cardDetails';
import Layout from '../../../../components/AdminLayout/AdminLayout';

async function action({ params }) {
  const { cardId } = params;
  return {
    title: 'جزییات کارت',
    chunks: ['card_details'],
    component: (
      <Layout>
        <CardDetails cardId={cardId} />
      </Layout>
    ),
  };
}

export default action;
