import React from 'react';
import SimpleLayout from '../../components/Layout';
import UnAuthPhoneNumber from './components/UnAuthPhoneNumber';

const title = 'خطا در احراز هویت شما';

async function action() {
  return {
    chunks: ['unauth-phonenumber'],
    title,
    component: (
      <SimpleLayout>
        <UnAuthPhoneNumber />
      </SimpleLayout>
    ),
  };
}

export default action;
