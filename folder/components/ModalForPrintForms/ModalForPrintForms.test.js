/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForPrintFormsTest as ModalForPrintForms } from './ModalForPrintForms';

configure({ adapter: new Adapter() });

describe('ModalForPrintForms Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ModalForPrintForms className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('ModalForPrintForms Test');
  });
});
