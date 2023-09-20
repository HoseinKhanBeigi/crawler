/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForDeleteTagTest as ModalForDeleteTag } from './ModalForDeleteTag';

configure({ adapter: new Adapter() });

describe('ModalForDeleteTag Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForDeleteTag className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForDeleteTag Test');
  });
});
