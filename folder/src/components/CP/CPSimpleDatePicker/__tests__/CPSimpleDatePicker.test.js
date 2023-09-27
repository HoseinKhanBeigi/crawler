/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPSimpleDatePickerTest as CPSimpleDatePicker } from '../CPSimpleDatePicker';

configure({ adapter: new Adapter() });

describe('CPSimpleDatePicker Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      onChange: () => {},
    };
    wrapper = shallow(<CPSimpleDatePicker className="Test" {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('selectDate Test');
  });
});
