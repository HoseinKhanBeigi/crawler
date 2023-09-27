import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Sessions from './Sessions';

const title = 'جلسات';

async function action() {
  return {
    chunks: ['sessions'],
    title,
    component: (
      <Layout>
        <Sessions title={title} />
      </Layout>
    ),
  };
}

export default action;
