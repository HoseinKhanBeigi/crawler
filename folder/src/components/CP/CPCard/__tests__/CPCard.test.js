/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPCardTest as CPCard } from '../CPCard';

configure({ adapter: new Adapter() });

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPCard title="Events" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('title')).toEqual('Events');
  });

  test('should render children when passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
