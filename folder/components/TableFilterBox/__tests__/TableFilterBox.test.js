/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TableFilterBoxTest as TableFilterBox } from '../TableFilterBox';

configure({ adapter: new Adapter() });

describe('TableFilterBox Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TableFilterBox className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('TableFilterBox Test');
  });
});
