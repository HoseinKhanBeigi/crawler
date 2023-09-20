/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPProgressTest as CPProgress } from './CPProgress';

configure({ adapter: new Adapter() });

describe('CPProgressDemo Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPProgress className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPProgressDemo Test');
  });
});
