import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import OperationManagementTable from './container/OperationManagementTable';

export default function action({ route: { title } }) {
  return {
    chunks: ['operation-mgmt-branches'],
    title,
    component: (
      <AdminLayout>
        <OperationManagementTable title={title} />
      </AdminLayout>
    ),
  };
}
