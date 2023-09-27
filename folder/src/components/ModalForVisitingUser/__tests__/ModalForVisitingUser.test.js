/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
/* eslint-disable react/prop-types */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForVisitingUserTest as ModalForVisitingUser } from '../ModalForVisitingUser';

configure({ adapter: new Adapter() });

describe('ModalForVisitingUser Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      className: 'Test',
      putCancelMeetingAction: () => {},
      getTaskListAction: () => {},
      putKycDoneAction: () => {},
      putCancelOpportunityAction: () => {},
      visitingUserModalClose: () => {},
      getOpportunitiesAction: () => {},
      product: '',
      visible: true,
    };
    wrapper = shallow(<ModalForVisitingUser {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('Test');
  });
});
