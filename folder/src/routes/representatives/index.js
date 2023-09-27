import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Representative from './Representative';

const title = 'نمایندگی‌ها';

async function action() {
  return {
    chunks: ['representatives'],
    title,
    component: (
      <Layout>
        <Representative title={title} />
      </Layout>
    ),
  };
}

export default action;
