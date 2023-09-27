/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TagCardTest as TagCard } from './TagCard';

configure({ adapter: new Adapter() });

describe('TagCard Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TagCard className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('TagCard Test');
  });
});
