/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForKianBusinessIdentificationTest as ModalForKianBusinessIdentification } from './ModalForKianBusinessIdentification';

configure({ adapter: new Adapter() });

describe('ModalForKianBusinessIdentification Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForKianBusinessIdentification className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForKianBusinessIdentification Test',
    );
  });
});
