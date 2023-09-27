/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForCompleteTradingInfoTest as ModalForCompleteTradingInfo } from './ModalForCompleteTradingInfo';

configure({ adapter: new Adapter() });

describe('ModalForCompleteTradingInfo Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForCompleteTradingInfo className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCompleteTradingInfo Test',
    );
  });
});
