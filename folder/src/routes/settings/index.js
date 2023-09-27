import React from 'react';
import Layout from '../../components/AdminLayout';
import Settings from './Settings';

const title = 'تنظیمات';

async function action() {
  return {
    chunks: ['settings'],
    title,
    component: (
      <Layout>
        <Settings title={title} />
      </Layout>
    ),
  };
}

export default action;
