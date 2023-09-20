/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPTabTest as CPTab } from '../CPTab';

configure({ adapter: new Adapter() });

const tabPane = [
  {
    key: 'tab1',
    tab: 'content',
    children: 'children',
  },
  {
    key: 'tab2',
    tab: 'تب 2',
    children: 'متن لورم اپیسوم',
  },
  {
    key: 'tab3',
    tab: 'تب 3',
    children: 'متن لورم اپیسوم',
    disabled: true,
  },
];
configure({ adapter: new Adapter() });

describe('CPTab Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      tabPane,
      className: 'Test',
      defaultKey: 'tab1',
    };
    wrapper = shallow(<CPTab {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPTab Test');
  });
});
