/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import jest from 'jest-mock';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForVerifyDataRenderDocsTest as Component } from './ModalForVerifyDataRenderDocs';

configure({ adapter: new Adapter() });

describe('ModalForVerifyDataRenderDocs Test', () => {
  const defaultProps = {
    className: '',
    documents: {},
    documentToken: {},
    isVerifyModal: true,
    handleChange: jest.fn(),
    statesData: {
      certificateStatus: true,
      nationalCardFrontStatus: true,
      nationalCardBackStatus: true,
    },
    preview: null,
  };

  const setup = (propOverrides = {}) =>
    shallow(<Component {...defaultProps} {...propOverrides} />);

  beforeEach(() => {});

  it('should render children when passed in', () => {
    const wrapper = setup({ statesData: null, documents: null });
    expect(wrapper.text()).toEqual('');
  });

  it('should render children when passed in', () => {
    const wrapper = setup({ className: 'Test' });
    expect(wrapper.prop('className')).toEqual('root Test');
  });
});
