import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Branches from './Branches';

const title = 'شعبه ها';

async function action({ params }) {
  const { parentId } = params;
  return {
    chunks: ['branches'],
    title,
    component: (
      <Layout>
        <Branches title={title} parentId={parentId} />
      </Layout>
    ),
  };
}

export default action;
