import React from 'react';
import Layout from '../../components/AdminLayout';
import NotificationCenter from './containers/NotificationCenter';

const title = 'مرکز اطلاع رسانی';

async function action() {
  return {
    chunks: ['notification-center'],
    title,
    component: (
      <Layout>
        <NotificationCenter />
      </Layout>
    ),
  };
}

export default action;
