import React from 'react';
import Layout from '../../components/AdminLayout';
import Activities from './Activities';

const title = 'فعالیت ها';

async function action() {
  return {
    chunks: ['activities'],
    title,
    component: (
      <Layout>
        <Activities title={title} />
      </Layout>
    ),
  };
}

export default action;
