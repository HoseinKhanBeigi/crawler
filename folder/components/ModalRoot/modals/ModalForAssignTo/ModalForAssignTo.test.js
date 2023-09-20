import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForAssignToTest as ModalForAssignTo } from './ModalForAssignTo';

configure({ adapter: new Adapter() });

describe('ModalForAssignTo Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForAssignTo className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForAssignTo Test');
  });
});
