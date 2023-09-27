import React from 'react';
import PeopleBusiness from './PeopleBusiness';
import Layout from '../../components/AdminLayout/AdminLayout';

async function action() {
  return {
    title: 'شرکت ها',
    chunks: ['people-business'],
    component: (
      <Layout>
        <PeopleBusiness />
      </Layout>
    ),
  };
}

export default action;
