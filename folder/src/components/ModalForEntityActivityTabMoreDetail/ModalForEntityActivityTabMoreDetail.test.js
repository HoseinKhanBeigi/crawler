/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForEntityActivityTabMoreDetailTest as ModalForEntityActivityTabMoreDetail } from './ModalForEntityActivityTabMoreDetail';

configure({ adapter: new Adapter() });

describe('ModalForEntityActivityTabMoreDetail Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForEntityActivityTabMoreDetail className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForEntityActivityTabMoreDetail Test',
    );
  });
});
