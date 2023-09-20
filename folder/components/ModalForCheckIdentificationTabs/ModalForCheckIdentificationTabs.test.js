/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckIdentificationTabsTest as ModalForCheckIdentificationTabs } from './ModalForCheckIdentificationTabs';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabs Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForCheckIdentificationTabs className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabs Test',
    );
  });
});
