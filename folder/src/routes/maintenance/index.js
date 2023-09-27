import React from 'react';
import SimpleLayout from '../../components/Layout';
import Maintenance from './Maintenance';

const title = 'Maintenance';

async function action() {
  return {
    chunks: ['maintenance'],
    title,
    component: (
      <SimpleLayout>
        <Maintenance title={title} />
      </SimpleLayout>
    ),
    status: 503,
  };
}

export default action;
