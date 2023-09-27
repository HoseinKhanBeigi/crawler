/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityReportsTabTest as EntityReportsTab } from './EntityReportsTab';

configure({ adapter: new Adapter() });

describe('EntityReportsTab Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityReportsTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityReportsTab Test');
  });
});