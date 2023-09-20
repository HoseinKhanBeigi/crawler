/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UnMaskMobileNumberTest as UnMaskMobileNumber } from './UnMaskMobileNumber';

configure({ adapter: new Adapter() });

describe('UnMaskMobileNumber Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UnMaskMobileNumber className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('UnMaskMobileNumber Test');
  });
});
