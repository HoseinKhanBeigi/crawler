import React from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import Layout from '../../components/AdminLayout';
import KycTimeManagement from './KycTimeManagement';
import { getMeetingsManagementAction } from '../../store/kycCapacityManagement/kycCapacityManagement.actions';

const title = 'KycTimeManagement';

async function action({ store }) {
  store.dispatch(showLoading());
  await store.dispatch(getMeetingsManagementAction());
  store.dispatch(hideLoading());
  return {
    chunks: ['kyc-time-management'],
    title,
    component: (
      <Layout>
        <KycTimeManagement title={title} />
      </Layout>
    ),
  };
}

export default action;
