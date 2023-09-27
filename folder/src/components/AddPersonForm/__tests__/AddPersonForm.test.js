/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddPersonFormTest as Component } from '../AddPersonForm';

configure({ adapter: new Adapter() });

describe('AddPersonForm Test', () => {
  const defaultProps = {
    handleCancel: jest.fn(),
    getAddPersonAction: jest.fn(() => 'OK'),
    postCreatePartyPersonAction: jest.fn(() => true),
    getPersonAction: jest.fn(),
    onSubmit: jest.fn(), // this props call on parent after submit.
    editMode: true,
    personByMobileData: {
      firstName: 'firstName',
      lastName: 'lastName',
      mobilePhone: '09123589789',
      nationalCode: '4380064794',
      email: '',
    },
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

  it('should fill the form with correct data', () => {
    const { wrapper } = setup({}, true);

    const checkInput = (input, value) =>
      expect(wrapper.find(`input[name="${input}"]`).props().value).toBe(value);

    checkInput('firstname', 'firstName');
    checkInput('lastname', 'lastName');
    checkInput('mobileNumber', '09123589789');
    checkInput('nationalCode', '4380064794');
  });

  it('should submit edit form correctly', done => {
    const editPersonSpy = jest.spyOn(Component.prototype, 'editPerson');
    const { wrapper } = setup({}, true);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    setTimeout(() => {
      expect(editPersonSpy).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should set the correct states in component update props', () => {
    const { wrapper } = setup({ personByMobileData: undefined }, true);

    expect(wrapper.state('formData').firstname).toBe('');
    expect(wrapper.state('formData').lastname).toBe('');
    expect(wrapper.state('formData').mobileNumber).toBe('');
    expect(wrapper.state('formData').nationalCode).toBe('');
    expect(wrapper.state('formData').email).toBe('');

    wrapper.setProps(defaultProps);

    expect(wrapper.state('formData').firstname).toBe('firstName');
    expect(wrapper.state('formData').lastname).toBe('lastName');
    expect(wrapper.state('formData').mobileNumber).toBe('09123589789');
    expect(wrapper.state('formData').nationalCode).toBe('4380064794');
    expect(wrapper.state('formData').email).toBe('');
  });
});
