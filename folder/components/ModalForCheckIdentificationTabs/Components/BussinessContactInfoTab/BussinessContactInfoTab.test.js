/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BussinessContactInfoTabTest as BussinessContactInfoTab } from './BussinessContactInfoTab';

configure({ adapter: new Adapter() });

describe('BussinessContactInfoTab Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BussinessContactInfoTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('BussinessContactInfoTab Test');
  });
});
