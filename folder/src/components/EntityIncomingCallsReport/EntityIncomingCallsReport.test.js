/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityIncomingCallsReportTest as EntityIncomingCallsReport } from './EntityIncomingCallsReport';

configure({ adapter: new Adapter() });

describe('EntityIncomingCallsReport Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityIncomingCallsReport className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityIncomingCallsReport Test');
  });
});
