/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LegalInformationTabTest as LegalInformationTab } from './LegalInformationTab';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabPersonalProfileFields Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LegalInformationTab className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabPersonalProfileFields Test',
    );
  });
});
