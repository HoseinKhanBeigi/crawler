import React from 'react';
import { CPButtonTest } from './CPButton';

export default {
  component: CPButtonTest,
  title: 'Form/Button',
};

export const button = () => (
  <CPButtonTest
    className="classname"
    htmlType="submit"
    // onClick={() => console.log('clicked')}
    loading={false}
  >
    ورود
  </CPButtonTest>
);
