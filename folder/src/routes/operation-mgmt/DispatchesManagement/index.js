import React from 'react';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import DispatchesManagementTable from './DispatchesManagementTable';

export default function action({ route: { title } }) {
  return {
    chunks: ['operation-mgmt-dispatches'],
    title,
    component: (
      <AdminLayout>
        <DispatchesManagementTable />
      </AdminLayout>
    ),
  };
}
