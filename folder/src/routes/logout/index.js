import React from 'react';
import Logout from './Logout';

function action({ query }) {
  const title = 'خروج';
  return {
    chunks: ['logout'],
    title,
    component: <Logout query={query} />,
  };
}

export default action;
