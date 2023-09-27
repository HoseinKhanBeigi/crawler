/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PersonalInfoFormTest as PersonalInfoForm } from './PersonalInfoForm';

configure({ adapter: new Adapter() });

describe('PersonalInfoForm Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PersonalInfoForm className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('PersonalInfoForm Test');
  });
});
