/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';
import { Leads as Component } from '../Leads';
import ProviderMock from '../../../../tools/mocks/ProviderMock';

configure({ adapter: new Adapter() });

describe('People Component', () => {
  const defaultProps = {
    leadsData: {},
    getActivitiesAction: jest.fn(),
    getTaskListAction: jest.fn(),
    getLeadsAction: jest.fn(),
    getLeadAction: jest.fn(),
    listLoading: false,
    assignOperatorsList: [],
    leadsDataError: false,
    getOpportunityAction: jest.fn(),
  };

  const setup = (isMount = false) => {
    const compNode = <Component {...defaultProps} />;
    const wrapper = isMount ? mount(ProviderMock(compNode)) : shallow(compNode);
    return { wrapper };
  };

  it('should render Snapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  const openSearchBar = () => {
    const { wrapper } = setup();
    const search = wrapper.find('.text').simulate('click');
    return { search };
  };

  const submitSearch = () => {
    const { wrapper } = setup();
    const searchBtn = wrapper.find('.btn').simulate('click');
    return { searchBtn };
  };

  it('should search by levantId', () => {
    const { wrapper } = setup({}, true);
    openSearchBar();
    expect(wrapper.find('input[placeholder="شناسه لوانت"]')).node.value =
      '10526';
    submitSearch();
  });

  // it('should search by mobilePhone', () => {
  //   const { wrapper, search, searchBtn } = setup({}, true);
  //   search.simulate('click');
  //   expect(wrapper.find('input[placeholder="شماره همراه"]')).value(
  //     '09211649799',
  //   );
  //   searchBtn.simulate('click');
  // });
  //
  // it('should search by nationalCode', () => {
  //   const { wrapper, search, searchBtn } = setup({}, true);
  //   search.simulate('click');
  //   expect(wrapper.find('input[placeholder="کد ملی"]').value('0123456789'));
  //   searchBtn.simulate('click');
  // });
  //
  // it('should search by creatorApp', () => {
  //   const { wrapper, search, searchBtn } = setup({}, true);
  //   search.simulate('click');
  //   expect(wrapper.find('input[placeholder="برنامه"]').value('کیان دیجیتال'));
  //   searchBtn.simulate('click');
  // });
  //
  // it('should search by leadType', () => {
  //   const { wrapper, search, searchBtn } = setup({}, true);
  //   search.simulate('click');
  //   expect(wrapper.find('input[placeholder="نوع"]').value('person'));
  //   searchBtn.simulate('click');
  // });
});
