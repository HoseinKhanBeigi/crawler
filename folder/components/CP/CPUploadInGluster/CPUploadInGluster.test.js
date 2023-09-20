/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPUploadInGlusterTest as CPUploadInGluster } from './CPUploadInGluster';

configure({ adapter: new Adapter() });

describe('CPUploadInGluster Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPUploadInGluster className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPUploadInGluster Test');
  });
});
