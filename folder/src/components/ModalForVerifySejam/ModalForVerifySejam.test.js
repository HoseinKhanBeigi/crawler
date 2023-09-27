/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForVerifySejamTest as ModalForVerifySejam } from './ModalForVerifySejam';

configure({ adapter: new Adapter() });

describe('ModalForVerifySejam Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForVerifySejam className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForVerifySejam Test');
  });
});
