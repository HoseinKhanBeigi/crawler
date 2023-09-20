/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForDoActionOnLeadsTest as ModalForDoActionOnLeads } from './ModalForDoActionOnLeads';

configure({ adapter: new Adapter() });

describe('ModalForDoActionOnLeads Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForDoActionOnLeads className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForDoActionOnLeads Test');
  });
});
