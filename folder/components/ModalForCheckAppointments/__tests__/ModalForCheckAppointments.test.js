/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckAppointmentsTest as ModalForCheckAppointments } from '../ModalForCheckAppointments';

configure({ adapter: new Adapter() });

describe('ModalForCheckAppointments Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      className: 'Test',
      checkAppointmentsCloseModal: () => {},
      putCancelMeetingAction: () => {},
      putApproveMeetingAction: () => {},
      getOpportunitiesAction: () => {},
      product: '',
      visible: true,
    };
    wrapper = shallow(<ModalForCheckAppointments {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('Test modalBody');
  });
});
