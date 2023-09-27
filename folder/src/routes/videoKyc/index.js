import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import VideoAuthenticationList from './videoKycList';
import VideoKycEntrance from './VideoKycEntrance';

const title = 'لیست احراز هویت‌های الکترونیکی';

async function action({ params }) {
  const { kycType, code } = params;
  return {
    chunks: ['videoKyc'],
    title,
    component: (
      <Layout>
        {kycType ? (
          <VideoAuthenticationList
            kycType={kycType}
            code={code}
            title={title}
          />
        ) : (
          <VideoKycEntrance />
        )}
      </Layout>
    ),
  };
}

export default action;
