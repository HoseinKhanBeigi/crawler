import React from 'react';
import Case from './Case';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'لیست درخواست ها',
    chunks: ['case'],
    component: (
      <Layout>
        <Case />
      </Layout>
    ),
  };
}

export default action;
