import React from 'react';
import Layout from '../../components/AdminLayout';
import Reports from './Reports';

const title = 'گزارشات تفصیلی کاربر';

async function action() {
  return {
    chunks: ['reports'],
    title,
    component: (
      <Layout>
        <Reports title={title} />
      </Layout>
    ),
  };
}

export default action;
