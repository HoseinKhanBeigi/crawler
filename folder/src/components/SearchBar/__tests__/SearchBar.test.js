/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchBarTest as SearchBar } from '../SearchBar';

configure({ adapter: new Adapter() });

describe('SearchBar Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      onSearch: () => {},
    };
    wrapper = shallow(<SearchBar data={[]} {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('searchBar');
  });
});
