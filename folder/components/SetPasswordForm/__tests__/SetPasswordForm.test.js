/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SetPasswordFormTest as SetPasswordForm } from '../SetPasswordForm';

configure({ adapter: new Adapter() });

describe('SetPasswordForm Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      getSetPasswordAction: () => {},
      setPasswordLoading: false,
      record: {},
    };
    wrapper = shallow(<SetPasswordForm {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('container');
  });
});
