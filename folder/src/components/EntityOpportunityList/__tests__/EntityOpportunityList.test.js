/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EntityOpportunityListTest as EntityOpportunityList } from '../EntityOpportunityList';

configure({ adapter: new Adapter() });

describe('EntityOpportunityList Test', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      putCancelMeetingAction: () => {},
    };
    wrapper = shallow(<EntityOpportunityList className="Test" {...props} />);
  });

  it('should render children when passed in', () => {
    expect(wrapper.prop('className')).toEqual('noData');
  });
});
