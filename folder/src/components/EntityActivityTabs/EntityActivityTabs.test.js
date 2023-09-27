/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityActivityTabsTest as EntityActivityTabs } from './EntityActivityTabs';

configure({ adapter: new Adapter() });

describe('EntityActivityTabs Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityActivityTabs className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityActivityTabs Test');
  });
});
