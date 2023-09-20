/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Layout as Component } from '../Layout';

configure({ adapter: new Adapter() });

describe('Layout', () => {
  const setup = (propOverrides = {}, isMount = false) => {
    const compNode = (
      <Component {...propOverrides}>
        <div className="child" />
      </Component>
    );
    const wrapper = isMount ? mount(compNode) : shallow(compNode);

    return { wrapper };
  };
  it('renders children correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
