import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import Tabs from './containers/Tabs';
import DemoEntrance from './DemoEntrance';

async function action({ route }) {
  return {
    chunks: ['aseman-panel'],
    title: route.title,
    component: (
      <Layout>
        {route.path ? (
          <Tabs type={route.path.slice(1).toUpperCase()} />
        ) : (
          <DemoEntrance />
        )}
      </Layout>
    ),
  };
}

export default action;
