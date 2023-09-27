import React from 'react';
import Home from './containers/Home';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'صفحه اصلی',
    chunks: ['home'],
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
