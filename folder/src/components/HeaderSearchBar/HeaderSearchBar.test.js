/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HeaderSearchBarTest as HeaderSearchBar } from './HeaderSearchBar';

configure({ adapter: new Adapter() });

describe('HeaderSearchBar Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      getFullSearchAction: () => {},
    };
    wrapper = shallow(<HeaderSearchBar className="Test" {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('headerSearchBar Test');
  });
});
