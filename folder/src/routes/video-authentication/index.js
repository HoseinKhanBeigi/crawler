import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import VideoAuthentication from './VideoAuthentication';

const title = 'احراز هویت الکترونیکی';

async function action() {
  return {
    chunks: ['video-authentication'],
    title,
    component: (
      <Layout>
        <VideoAuthentication title={title} />
      </Layout>
    ),
  };
}

export default action;
