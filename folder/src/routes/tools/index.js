import React from 'react';
import Layout from '../../components/AdminLayout';
import Tools from './container/Tools';

const title = 'ابزار ها';

async function action() {
  return {
    chunks: ['tools'],
    title,
    component: (
      <Layout>
        <Tools title={title} />
      </Layout>
    ),
  };
}

export default action;
