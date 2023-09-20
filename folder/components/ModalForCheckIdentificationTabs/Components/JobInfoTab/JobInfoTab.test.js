/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BusinessInfoTabTest as BusinessInfoTab } from './JobInfoTab';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabBusinessInfoProfile Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BusinessInfoTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabBusinessInfoProfile Test',
    );
  });
});
