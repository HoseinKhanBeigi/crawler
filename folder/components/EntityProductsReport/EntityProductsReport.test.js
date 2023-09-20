/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityProductsReportTest as EntityProductsReport } from './EntityProductsReport';

configure({ adapter: new Adapter() });

describe('EntityProductsReport Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EntityProductsReport className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('EntityProductsReport Test');
  });
});
