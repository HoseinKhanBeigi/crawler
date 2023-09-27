import React from 'react';
import Layout from '../../components/AdminLayout';
import TaskManagment from './TaskManagment';

async function action() {
  return {
    chunks: ['task-managment'],
    title: 'مدیریت کارها',
    component: (
      <Layout>
        <TaskManagment />
      </Layout>
    ),
  };
}

export default action;
