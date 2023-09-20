/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityTableDetailsTest as EntityTableDetails } from './EntityTableDetails';

configure({ adapter: new Adapter() });

describe('EntityTableDetails Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityTableDetails className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityTableDetails Test');
  });
});
