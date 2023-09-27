import React from 'react';
import Module from './PipelineManagement';
import Layout from '../../components/AdminLayout';

async function action() {
  return {
    title: 'مدیریت فرآیند',
    chunks: ['pipelineManagement'],
    component: (
      <Layout>
        <Module />
      </Layout>
    ),
  };
}

export default action;
