/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BussinessInfoFieldsTest as BussinessInfoFields } from './BussinessInfoFields';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabBusinessProfileFields Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BussinessInfoFields className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabBusinessProfileFields Test',
    );
  });
});
