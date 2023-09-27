/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import jest from 'jest-mock';
import Adapter from 'enzyme-adapter-react-16';
import merge from 'lodash/merge';
import ProviderMock from '../../../../tools/mocks/ProviderMock';
import { peopleTest as Component } from '../People';
import { AddPersonFormTest } from '../../../components/AddPersonForm';

configure({ adapter: new Adapter() });

describe('People Component', () => {
  const defaultProps = {
    getPersonAction: jest.fn(),
    getPersonByMobileAction: jest.fn().mockReturnValue('data'),
    getPersonInfoAction: jest.fn(),
    getActivitiesAction: jest.fn(),
    getOpportunityAction: jest.fn(),
    getTaskListAction: jest.fn(),
    personListError: false,
    personInfo: {
      id: 100,
    },
    activities: [],
    personList: {
      number: 0,
      totalElements: 1,
      size: 1,
      content: [
        {
          firstName: 'first_name',
          lastName: 'last_name',
          id: 10,
          levantId: 14,
          nationalCode: '123123',
          mobilePhone: '091234567890',
          key: 10,
        },
      ],
    },
  };
  /**
   * in this helper method, we provide the elements, which are often used
   * @returns {{editButton: *, column: (function(*=): *), row: *}}
   * @param propOverrides
   * @param isMount
   */
  const setup = (propOverrides = {}, isMount = false) => {
    const compNode = <Component {...defaultProps} {...propOverrides} />;
    const wrapper = isMount ? mount(ProviderMock(compNode)) : shallow(compNode);

    const row = wrapper.find('.ant-table-row-level-0').first();
    const column = index => row.find('td').at(index);

    const editButton = row
      .find('td')
      .last()
      .find('button');

    return { wrapper, row, editButton, column };
  };

  it('should render People component with the correct DOM structure', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render table rows correctly with all necessary fields', () => {
    const { row, column } = setup({}, 'mount');

    expect(row.prop('data-row-key')).toEqual(10);
    expect(row.find('td')).toHaveLength(6);
    expect(column(0).text()).toEqual('14');
    expect(column(1).text()).toEqual('first_name');
    expect(column(2).text()).toEqual('last_name');
    expect(column(3).text()).toEqual('091234567890');
    expect(column(4).text()).toEqual('123123');
  });

  it('should render error text, in case of any error', () => {
    const { wrapper } = setup({ personListError: true }, true);

    expect(wrapper.find('.alert')).toHaveLength(1);
    expect(wrapper.find('[type="error"]')).toHaveLength(2);
  });

  it('edit modal should open when correct states are there', () => {
    const { wrapper } = setup({}, true);
    const innerWrapper = wrapper.find('People').instance();

    expect(wrapper.find(AddPersonFormTest)).toHaveLength(0);

    innerWrapper.setState({ editPersonVisible: true });
    wrapper.update();
    expect(wrapper.find(AddPersonFormTest)).toHaveLength(1);

    innerWrapper.setState({
      editPersonVisible: false,
      addPersonVisible: false,
    });
    wrapper.update();
    expect(wrapper.find(AddPersonFormTest)).toHaveLength(0);

    innerWrapper.setState({ addPersonVisible: true });
    wrapper.update();
    expect(wrapper.find(AddPersonFormTest)).toHaveLength(1);
  });

  it('should show error instead of drawer if levantId is missing', done => {
    const newProps = merge(defaultProps, {
      personList: { content: [{ levantId: null }] },
    });
    const { row, wrapper } = setup(newProps, true);
    expect(row).toHaveLength(1);
    expect(wrapper.find('People').instance().state.visible).toBeFalsy();
    row.simulate('click');
    wrapper.update();
    // as the function includes, calling async props, if we do not use setTimeout, the state values will not change
    setTimeout(() => {
      expect(wrapper.find('People').instance().state.visible).toBeFalsy();
      done();
    }, 4000);
  });
});
