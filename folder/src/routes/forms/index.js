import React from 'react';
import Layout from '../../components/AdminLayout';
import Forms from './Forms';
import { getLeadFormFieldsAction } from '../../store/lead/lead.actions';

const title = 'تنظیمات فرم ها';

async function action({ store }) {
  await store.dispatch(getLeadFormFieldsAction('PERSON', true));
  return {
    chunks: ['forms'],
    title,
    component: (
      <Layout>
        <Forms />
      </Layout>
    ),
  };
}

export default action;
