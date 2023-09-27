import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Roles from './Roles';

const title = 'گروه کاربری';

async function action() {
  return {
    chunks: ['roles'],
    title,
    component: (
      <Layout>
        <Roles title={title} />
      </Layout>
    ),
  };
}

export default action;
