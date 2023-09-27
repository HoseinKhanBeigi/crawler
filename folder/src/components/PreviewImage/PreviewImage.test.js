/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PreviewImageTest as PreviewImage } from './PreviewImage';

configure({ adapter: new Adapter() });

describe('PreviewImage Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PreviewImage className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('PreviewImage Test');
  });
});
