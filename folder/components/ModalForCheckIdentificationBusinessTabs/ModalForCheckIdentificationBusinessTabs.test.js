/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCheckIdentificationBusinessTabsTest as ModalForCheckIdentificationBusinessTabs } from './ModalForCheckIdentificationBusinessTabs';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationBusinessTabs Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ModalForCheckIdentificationBusinessTabs className="Test" />,
    );
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationBusinessTabs Test',
    );
  });
});
