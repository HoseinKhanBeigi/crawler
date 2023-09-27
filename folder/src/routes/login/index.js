import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import Login from './Login';
import messages from './messages';

function action({ intl, query }) {
  const title = intl?.formatMessage(messages?.title);
  return {
    chunks: ['login'],
    title,
    component: (
      <LoginLayout>
        <Login title={title} query={query} />
      </LoginLayout>
    ),
  };
}

export default action;
