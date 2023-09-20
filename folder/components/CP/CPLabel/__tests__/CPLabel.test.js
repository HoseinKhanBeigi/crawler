/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CPLabelTest as CPLabel } from '../CPLabel';

configure({ adapter: new Adapter() });

describe('CPLabel Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CPLabel className="Test" label="label" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('CPLabel Test right');
  });
});
