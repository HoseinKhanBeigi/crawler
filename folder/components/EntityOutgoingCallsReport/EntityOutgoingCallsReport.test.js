/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityOutgoingCallsReportTest as EntityOutgoingCallsReport } from './EntityOutgoingCallsReport';

configure({ adapter: new Adapter() });

describe('EntityOutgoingCallsReport Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityOutgoingCallsReport className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityOutgoingCallsReport Test');
  });
});
