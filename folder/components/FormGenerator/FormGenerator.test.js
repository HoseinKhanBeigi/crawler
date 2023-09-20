/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FormGeneratorTest as FormGenerator } from './FormGenerator';

configure({ adapter: new Adapter() });

describe('FormGenerator Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FormGenerator className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('FormGenerator Test');
  });
});
