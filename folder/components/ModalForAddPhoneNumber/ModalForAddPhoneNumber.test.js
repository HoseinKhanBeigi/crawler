/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForAddPhoneNumberTest as ModalForAddPhoneNumber } from './ModalForAddPhoneNumber';

configure({ adapter: new Adapter() });

describe('ModalForAddPhoneNumber Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForAddPhoneNumber className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForAddPhoneNumber Test');
  });
});
