/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckIdentificationRejectionTest as ModalForCheckIdentificationRejection } from './ModalForCheckIdentificationRejection';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationRejection Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ModalForCheckIdentificationRejection className="Test" />,
    );
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationRejection Test',
    );
  });
});
