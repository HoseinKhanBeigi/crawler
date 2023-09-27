import React from 'react';
import { Form, Input } from 'antd';
import Column from '../components/Column';
import { convertFarsiDigits } from '../../../utils/string';

const { Item } = Form;
export default function renderTextInput(f) {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    handleBlur,
    field: {
      name,
      type,
      value = null,
      label,
      onChange,
      suffix = null,
      formatValue,
      config: {
        placeholder,
        required,
        readonly,
        grid,
        disabled,
        visibile = true,
      } = {},
    },
  } = f;
  const TextInput = type === 'input' ? Input : Input.TextArea;
  const textAreaAdditionalProps =
    type === 'input'
      ? {}
      : {
          rows: f.field?.config?.rows || 4,
        };
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
            {type === 'input' && (
              <TextInput
                placeholder={placeholder}
                name={name}
                suffix={suffix}
                onBlur={handleBlur}
                onChange={e => {
                  let val = convertFarsiDigits(e.target.value);
                  if (formatValue) val = formatValue(val);
                  if (!readonly) setFieldValue(name, val);
                  if (onChange) onChange(val, f);
                }}
                value={values[name] || value}
                disabled={disabled}
                {...textAreaAdditionalProps}
              />
            )}
            {type === 'textarea' && (
              <>
                <TextInput
                  placeholder={placeholder}
                  name={name}
                  onBlur={handleBlur}
                  onChange={e => {
                    const val = convertFarsiDigits(e.target.value);
                    if (!readonly) setFieldValue(name, val);
                    if (onChange) onChange(val, f);
                  }}
                  value={values[name] || value}
                  disabled={disabled}
                  {...textAreaAdditionalProps}
                />
                <div
                  style={{ position: 'absolute', left: '10px', top: '10px' }}
                >
                  {suffix}
                </div>
              </>
            )}
          </Item>
        </Column>
      )}
    </>
  );
}
