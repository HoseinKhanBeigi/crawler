import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import SystemicMessageTemplates from './systemicMessageTemplate';

const title = 'مدیریت قالب سیستمی';

async function systemicMessageTemplates() {
  return {
    chunks: ['systemic-message-templates'],
    title,
    component: (
      <Layout>
        <SystemicMessageTemplates title={title} />
      </Layout>
    ),
  };
}

export default systemicMessageTemplates;
