import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Agents from './Agents';

const title = 'کارگزارها';

async function action({ params }) {
  const { parentId } = params;
  return {
    chunks: ['agents'],
    title,
    component: (
      <Layout>
        <Agents title={title} parentId={parentId} />
      </Layout>
    ),
  };
}

export default action;
