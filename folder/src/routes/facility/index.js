import React from 'react';
import Facility from './Facility';
import Layout from '../../components/AdminLayout';

async function action({ query }) {
  return {
    title: 'لیست درخواست های تسهیلات',
    chunks: ['facility'],
    component: (
      <Layout>
        <Facility levantId={query?.levantId} />
      </Layout>
    ),
  };
}

export default action;
