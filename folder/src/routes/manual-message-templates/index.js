import React from 'react';
import Layout from '../../components/AdminLayout';
import MessageTemplates from './MessageTemplates';

const title = 'مدیریت قالب دستی';

async function manualMessageTemplates() {
  return {
    chunks: ['message-templates'],
    title,
    component: (
      <Layout>
        <MessageTemplates title={title} />
      </Layout>
    ),
  };
}

export default manualMessageTemplates;
