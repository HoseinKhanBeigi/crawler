/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPEmptyTest as CPEmpty } from './CPEmpty';

configure({ adapter: new Adapter() });

describe('CPEmpty Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPEmpty className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPEmpty Test');
  });
});
