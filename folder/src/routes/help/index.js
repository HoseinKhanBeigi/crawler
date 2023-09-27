import React from 'react';
import Layout from '../../components/AdminLayout';
import Help from './Help';

const title = 'Help';

async function action() {
  return {
    chunks: ['help'],
    title,
    component: (
      <Layout>
        <Help title={title} />
      </Layout>
    ),
  };
}

export default action;
