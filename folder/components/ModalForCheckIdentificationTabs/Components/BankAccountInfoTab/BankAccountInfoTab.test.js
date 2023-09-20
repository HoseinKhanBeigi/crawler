/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BankAccountInfoTabTest as BankAccountInfoTab } from './BankAccountInfoTab';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabBankProfile Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BankAccountInfoTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabBankProfile Test',
    );
  });
});
