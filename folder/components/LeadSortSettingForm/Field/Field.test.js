/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FieldTest as Field } from './Field';

configure({ adapter: new Adapter() });

describe('Field Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Field className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('Field Test');
  });
});
