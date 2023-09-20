/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SejamTrackingCodePopConfirmTest as SejamTrackingCodePopConfirm } from './SejamTrackingCodePopConfirm';

configure({ adapter: new Adapter() });

describe('SejamTrackingCodePopConfirm Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SejamTrackingCodePopConfirm className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'SejamTrackingCodePopConfirm Test',
    );
  });
});
