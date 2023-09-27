import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import PhoneCalls from './PhoneCalls';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'تماس ها',
    chunks: ['phone-calls'],
    component: (
      <Layout>
        <PhoneCalls />
      </Layout>
    ),
  };
}

export default action;
