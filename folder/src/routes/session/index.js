import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Session from './Session';

const title = 'جزئیات جلسه';

async function action({ params }) {
  const { sessionId } = params;
  return {
    chunks: ['session'],
    title,
    component: (
      <Layout>
        <Session title={title} sessionId={sessionId} />
      </Layout>
    ),
  };
}

export default action;
