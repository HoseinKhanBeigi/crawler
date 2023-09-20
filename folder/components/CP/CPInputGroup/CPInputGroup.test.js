/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPInputGroupTest as CPInputGroup } from './CPInputGroup';

configure({ adapter: new Adapter() });

describe('CPInputGroup Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPInputGroup className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPInputGroup Test');
  });
});
