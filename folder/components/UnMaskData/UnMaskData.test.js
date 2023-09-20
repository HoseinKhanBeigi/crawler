/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UnMaskDataTest as UnMaskData } from './UnMaskData';

configure({ adapter: new Adapter() });

describe('UnMaskData Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UnMaskData className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('UnMaskData Test');
  });
});
