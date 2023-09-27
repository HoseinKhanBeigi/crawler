/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddLeadModalTest as AddLeadModal } from './ModalForLeadForm';

configure({ adapter: new Adapter() });

describe('AddLeadModal Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddLeadModal className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('AddLeadModal Test');
  });
});
