import React from 'react';
import EmployeeManagement from './EmployeeManagement';
import Layout from '../../components/AdminLayout';

async function action({ params }) {
  const { unitId } = params;
  return {
    title: 'مدیریت کاربران',
    chunks: ['employeeManagement'],
    component: (
      <Layout>
        <EmployeeManagement unitId={unitId} />
      </Layout>
    ),
  };
}

export default action;
