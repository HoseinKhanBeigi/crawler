/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CertificateSerialNumberTest as CertificateSerialNumber } from './CertificateSerialNumber';

configure({ adapter: new Adapter() });

describe('CertificateSerialNumber Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CertificateSerialNumber className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CertificateSerialNumber Test');
  });
});
