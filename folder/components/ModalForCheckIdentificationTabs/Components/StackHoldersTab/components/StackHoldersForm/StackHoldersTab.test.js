/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StackHoldersFormTest as StackHoldersForm } from './StackHoldersForm';

configure({ adapter: new Adapter() });

describe('StackHoldersForm Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackHoldersForm className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('StackHoldersForm Test');
  });
});
