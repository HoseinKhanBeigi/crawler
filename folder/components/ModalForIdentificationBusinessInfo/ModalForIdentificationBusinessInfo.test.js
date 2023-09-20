/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForIdentificationBusinessInfoTest as ModalForIdentificationBusinessInfo } from './ModalForIdentificationBusinessInfo';

configure({ adapter: new Adapter() });

describe('ModalForIdentificationBusinessInfo Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForIdentificationBusinessInfo className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForIdentificationBusinessInfo Test',
    );
  });
});
