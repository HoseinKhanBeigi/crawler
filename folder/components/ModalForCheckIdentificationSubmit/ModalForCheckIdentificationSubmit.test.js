/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckIdentificationSubmitTest as ModalForCheckIdentificationSubmit } from './ModalForCheckIdentificationSubmit';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationSubmit Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForCheckIdentificationSubmit className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationSubmit Test',
    );
  });
});
