/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SaveSearchResultModalTest as SaveSearchResultModal } from './SaveSearchResultModal';

configure({ adapter: new Adapter() });

describe('SaveSearchResultModal Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SaveSearchResultModal className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('SaveSearchResultModal Test');
  });
});
