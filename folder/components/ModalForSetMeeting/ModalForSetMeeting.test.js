/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForSetMeetingTest as ModalForSetMeeting } from './ModalForSetMeeting';

configure({ adapter: new Adapter() });

describe('ModalForSetMeeting Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      setMeetingModalClose: () => {},
      getAvailableTimeAction: () => {},
      postSetMeetingLocationAction: () => {},
      postSetMeetingTimeAction: () => {},
      putAccountLocationAction: () => {},
      getApplicationAction: () => {},
      getOpportunitiesAction: () => {},
      product: '',
    };
    wrapper = shallow(<ModalForSetMeeting {...props} className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('root Test');
  });
});
