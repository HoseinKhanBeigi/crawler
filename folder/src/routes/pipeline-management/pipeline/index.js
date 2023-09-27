import React from 'react';
import Module from './Pipeline';
import Layout from '../../../components/AdminLayout';

async function action({ params }) {
  const { pipelineId } = params;
  return {
    title: 'فرآیند',
    chunks: ['pipeline'],
    component: (
      <Layout>
        <Module pipelineId={pipelineId} />
      </Layout>
    ),
  };
}

export default action;
