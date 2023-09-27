import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import NotFound from './NotFound';

const title = 'Page Not Found';

function action() {
  return {
    chunks: ['not-found'],
    title,
    component: (
      <AdminLayout>
        <NotFound title={title} />
      </AdminLayout>
    ),
    status: 404,
  };
}

export default action;
