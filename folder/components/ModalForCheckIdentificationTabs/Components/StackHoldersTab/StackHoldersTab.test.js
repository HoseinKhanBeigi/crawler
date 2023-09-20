/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StackHoldersTabTest as StackHoldersTab } from './StackHoldersTab';

configure({ adapter: new Adapter() });

describe('StackHoldersTab Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StackHoldersTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('StackHoldersTab Test');
  });
});
