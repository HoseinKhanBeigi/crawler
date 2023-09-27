import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import OperationSetting from './OperationSetting';

export default function action({ route: { title } }) {
  return {
    chunks: ['operation-mgmt'],
    title,
    component: (
      <AdminLayout>
        <OperationSetting />
      </AdminLayout>
    ),
  };
}
