import React from 'react';
import Layout from '../../components/AdminLayout';
import Tags from './Tags';

const title = 'تنظیمات برچسب ها';

async function action() {
  return {
    chunks: ['tags'],
    title,
    component: (
      <Layout>
        <Tags title={title} />
      </Layout>
    ),
  };
}

export default action;
