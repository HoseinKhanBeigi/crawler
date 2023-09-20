/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BussinessInfoDocsTest as BussinessInfoDocs } from './BussinessInfoDocs';

configure({ adapter: new Adapter() });

describe('ModalForCheckIdentificationTabBusinessProfileDocs Test', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BussinessInfoDocs className="Test" />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual(
      'ModalForCheckIdentificationTabBusinessProfileDocs Test',
    );
  });
});
