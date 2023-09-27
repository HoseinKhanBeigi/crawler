import React from 'react';
import { Form } from 'antd';
import Column from '../components/Column';
import CPCheckbox from '../../CP/CPCheckbox';

const { Item } = Form;
export default function renderCheckbox(f) {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    handleBlur,
    field: {
      name,
      label = '',
      onChange = () => {},
      options = [],
      defaultValue = [],
      config: { required, grid, visibile = true } = {},
    },
  } = f;
  return (
    <>
      {visibile && (
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
            <CPCheckbox
              onBlur={handleBlur}
              defaultValue={defaultValue}
              options={options}
              value={values[name]}
              onChange={v => {
                setFieldValue(name, v);
                onChange(name, v);
              }}
            />
          </Item>
        </Column>
      )}
    </>
  );
}
