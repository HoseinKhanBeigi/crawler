/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StatCardTest as StatCard } from './StatCard';

configure({ adapter: new Adapter() });

describe('StatCard Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StatCard className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('StatCard Test');
  });
});
