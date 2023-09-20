/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ApproveButtonTest as ApproveButton } from './ApproveButton';

configure({ adapter: new Adapter() });

describe('ApproveButton Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ApproveButton className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ApproveButton Test');
  });
});
