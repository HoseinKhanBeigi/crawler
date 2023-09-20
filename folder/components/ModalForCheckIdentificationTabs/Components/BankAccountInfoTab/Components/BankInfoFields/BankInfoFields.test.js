/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BankInfoFieldsTest as BankInfoFields } from './BankInfoFields';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabBankProfileFields Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BankInfoFields className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabBankProfileFields Test',
    );
  });
});
