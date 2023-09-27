/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ContactFormTest as ContactForm } from './ContactForm';

configure({ adapter: new Adapter() });

describe('ContactForm Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ContactForm className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ContactForm Test');
  });
});
