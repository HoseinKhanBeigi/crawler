import React from 'react';
import People from './People';
import Layout from '../../components/AdminLayout';

async function action({ params }) {
  const { type } = params;
  return {
    title: 'افراد',
    chunks: ['people'],
    component: (
      <Layout>
        <People type={type} />
      </Layout>
    ),
  };
}

export default action;
