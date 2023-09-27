/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalForVerifyDataTest as ModalForVerifyData } from '../ModalForVerifyData';

configure({ adapter: new Adapter() });

describe('ModalForVerifyData Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      className: 'Test',
      getOpportunitiesAction: () => {},
      leadsInformationCloseModal: () => {},
      putSaveIdentificationAction: () => {},
      putAdditionalInfoAction: () => {},
      identificationWithDocsCloseModal: () => {},
      product: '',
      visible: true,
    };
    wrapper = shallow(<ModalForVerifyData {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toMatchSnapshot();
  });
});
