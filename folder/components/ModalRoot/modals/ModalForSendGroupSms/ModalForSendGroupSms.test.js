/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForSendGroupSmsTest as ModalForSendGroupSms } from './ModalForSendGroupSms';

configure({ adapter: new Adapter() });

describe('ModalForSendGroupSms Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForSendGroupSms className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForSendGroupSms Test');
  });
});
