import React from 'react';
import { Radio, Form } from 'antd';
import Column from '../components/Column';

const { Item } = Form;
export default function renderRadioInput(f) {
  const {
    values,
    setFieldValue,
    touched,
    handleBlur,
    errors,
    field: {
      name,
      label,
      data,
      onChange = () => {},
      config: { grid, required } = {},
    },
  } = f;
  return (
    <Column key={name} grid={grid}>
      <Item
        label={label}
        required={required}
        hasFeedback={touched[name]}
        validateStatus={
          (errors[name] && touched[name]) || errors[name] ? 'error' : 'success'
        }
        help={
          (errors[name] && touched[name]) || errors[name] ? errors[name] : ''
        }
      >
        <Radio.Group
          onBlur={handleBlur}
          value={values[name]}
          name={name}
          onChange={e => {
            const val = e.target.value;
            setFieldValue(name, val);
            onChange(val, f);
          }}
        >
          {data?.map(radio => (
            <Radio key={radio.label} value={radio.value}>
              {radio.label}
            </Radio>
          ))}
        </Radio.Group>
      </Item>
    </Column>
  );
}
