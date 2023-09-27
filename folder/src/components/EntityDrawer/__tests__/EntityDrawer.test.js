/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityDrawerTest as EntityDrawer } from '../EntityDrawer';

configure({ adapter: new Adapter() });

describe('EntityDrawer Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <EntityDrawer visible={false} handleVisible={() => {}} />,
    );
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('leads');
  });
});
