/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import jest from 'jest-mock';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForVerifyDataRenderUserInfoTest as Component } from './ModalForVerifyDataRenderUserInfo';

configure({ adapter: new Adapter() });

describe('ModalForVerifyDataRenderUserInfo Test', () => {
  const defaultProps = {
    className: '',
    isVerifyModal: true,
    additionalInfoLoading: false,
    visible: true,
    handleChange: jest.fn(),
    updateAdditionalInfo: jest.fn(),
  };

  const setup = (propOverrides = {}) =>
    shallow(<Component {...defaultProps} {...propOverrides} />);

  beforeEach(() => {});

  it('should render children when passed in', () => {
    const wrapper = setup();
    expect(wrapper.text()).toEqual('');
  });

  it('should render children when passed in', () => {
    const wrapper = setup({ className: 'Test', identificationWithDocs: {} });
    expect(wrapper.prop('className')).toEqual('root Test');
  });
});
