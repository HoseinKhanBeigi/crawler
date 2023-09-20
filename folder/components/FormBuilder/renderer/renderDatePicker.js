/* eslint-disable */
import React from 'react';
import { Form, Input } from 'antd';
import Column from '../components/Column';
import CPSingleDatePicker from '../../CP/CPSingleDatePicker';

const { Item } = Form;
export default function renderDatePicker(f) {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    field: {
      name,
      label,
      onChange = () => {},
      config: { placeholder, required, grid, disabled, visible = true } = {},
    },
  } = f;

  const handleChange = e => {
    onChange(Date.parse(e.date), name);
    setFieldValue(name, Date.parse(e.date));
  };

  return (
    <>
      {visible && (
        <Column key={name} grid={grid}>
          <Item
            label={label}
            required={required}
            hasFeedback={touched[name]}
            validateStatus={
              (errors[name] && touched[name]) || errors[name]
                ? 'error'
                : 'success'
            }
            help={
              (errors[name] && touched[name]) || errors[name]
                ? errors[name]
                : ''
            }
          >
            <CPSingleDatePicker
              disabled={disabled}
              date={values[name]}
              placeholder={placeholder}
              onChange={handleChange} // eslint-disable-line
            />
          </Item>
        </Column>
      )}
    </>
  );
}
