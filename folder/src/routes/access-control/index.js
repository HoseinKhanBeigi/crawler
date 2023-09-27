import React from 'react';
import Layout from '../../components/AdminLayout';
import AclForm from './View/AclForm';

const title = 'دسترسی';

async function action({ query }) {
  const { groupId, editMode, refLink } = query;
  return {
    chunks: ['access-control'],
    title,
    component: (
      <Layout>
        <AclForm
          aclGroupId={groupId}
          editMode={editMode === 'true'}
          refLink={refLink}
        />
      </Layout>
    ),
  };
}

export default action;
