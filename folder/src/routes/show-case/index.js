import React from 'react';
import Layout from '../../components/AdminLayout';
import ShowCase from './ShowCase';

const title = 'درخواست';

async function action({ params }) {
  const { caseId } = params;
  return {
    chunks: ['show-case'],
    title,
    component: (
      <Layout>
        <ShowCase title={title} id={caseId} />
      </Layout>
    ),
  };
}

export default action;
