import React from 'react';
import SimpleLayout from '../../components/Layout';
import ServerError from './ServerError';

const title = 'ServerError';

async function action() {
  return {
    chunks: ['server-error'],
    title,
    component: (
      <SimpleLayout>
        <ServerError title={title} />
      </SimpleLayout>
    ),
    status: 500,
  };
}

export default action;
