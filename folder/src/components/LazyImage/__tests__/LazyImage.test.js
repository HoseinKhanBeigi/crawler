/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LazyImageTest as LazyImage } from '../LazyImage';

configure({ adapter: new Adapter() });

describe('LazyImage Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      getDocAction: () => {},
    };
    wrapper = shallow(<LazyImage className="Test" {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
