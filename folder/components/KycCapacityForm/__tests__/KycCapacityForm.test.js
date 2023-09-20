/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KycCapacityFormTest as KycCapacityForm } from '../KycCapacityForm';

configure({ adapter: new Adapter() });

describe('KycCapacityForm Test', () => {
  const defaultProps = {
    handleCancel: jest.fn(),
    postKycCapacityManagementAction: jest.fn(),
    onSubmit: jest.fn(),
    getMeetingsManagementAction: jest.fn(),
    getGetProductsAction: jest.fn(),
    productList: jest.fn(),
  };

  it('should render snapshot', () => {
    const wrapper = shallow(<KycCapacityForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
