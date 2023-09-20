/* eslint-disable */
import React from 'react';
import { Form, Input, TimePicker } from 'antd';
import Column from '../components/Column';
import moment from 'moment';
import CPTimePicker from '../../CP/CPTimePicker';

const { Item } = Form;
export default function renderTimePicker(f) {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    field: {
      name,
      label,
      onChange = () => {},
      config: { placeholder, required, grid, disabled } = {},
    },
  } = f;

  const handleChange = value => {
    onChange(value, name);
    setFieldValue(name, value)
  }

  return (
    <Column key={name} grid={grid}>
      <Item
        label={label}
        required={required}
        hasFeedback={touched[name]}
        validateStatus={(errors[name] && touched[name] ) || errors[name]  ? 'error' : 'success'}
        help={(errors[name] && touched[name]) || errors[name] ? errors[name] : ''}
      >
        <TimePicker
            allowClear={false}
            name={name}
            format='HH:mm'
            minuteStep={1}
            hourStep={1}
            defaultOpenValue={moment('00:00', 'HH:mm')}
            disabled={disabled}
            value={values[name] || ''}
            placeholder={placeholder}
            onChange={value => handleChange(value)}
          />
      </Item>
    </Column>
  );
}
