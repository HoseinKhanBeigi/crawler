/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckAppointmentsCardTest as ModalForCheckAppointmentsCard } from './ModalForCheckAppointmentsCard';

configure({ adapter: new Adapter() });

describe('ModalForCheckAppointmentsCard Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForCheckAppointmentsCard className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckAppointmentsCard Test',
    );
  });
});
