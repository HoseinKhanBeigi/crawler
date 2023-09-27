/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DashboardEntityListTest as DashboardEntityList } from './DashboardEntityList';

configure({ adapter: new Adapter() });

describe('DashboardEntityList Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DashboardEntityList className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('DashboardEntityList Test');
  });
});
