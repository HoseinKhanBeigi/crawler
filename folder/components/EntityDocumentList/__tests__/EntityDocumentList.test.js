/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityDocumentListTest as Component } from '../EntityDocumentList';

configure({ adapter: new Adapter() });

describe('EntityDocumentList Test', () => {
  const defaultProps = {
    documentData: null,
  };
  const setup = (propOverrides = {}, isMount = false) => {
    const compNode = <Component {...defaultProps} {...propOverrides} />;
    const wrapper = isMount ? mount(compNode) : shallow(compNode);
    return { wrapper };
  };

  it('should render children when passed in', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
