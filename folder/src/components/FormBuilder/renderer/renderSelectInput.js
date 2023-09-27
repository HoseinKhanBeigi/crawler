import React from 'react';
import { Form, Select } from 'antd';
import debounce from 'lodash/debounce';
import Column from '../components/Column';

const { Item } = Form;
const { Option } = Select;
export default function renderSelectInput(f) {
  const {
    values,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    field: {
      name,
      mode = 'default',
      label,
      data = [],
      labelInValue = false,
      filterOption = true,
      onSearch = () => {},
      suffixIcon = null,
      showSearch = false,
      onMouseLeave = () => {},
      notFoundContent = 'نتیجه‌ای یافت نشد!',
      onChange = () => {},
      config: {
        placeholder,
        required,
        grid,
        disabled,
        visible = true,
        withDeleteButton = false,
      } = {},
    },
  } = f;
  const deleteHandler = e => {
    e.preventDefault();
    setFieldValue(name, undefined);
    onChange(undefined, f);
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
            {!!(
              withDeleteButton &&
              (Array.isArray(values[name]) ? values[name].length : values[name])
            ) && (
              <button
                onClick={deleteHandler}
                type="button"
                style={{
                  all: 'unset',
                  color: 'red',
                  position: 'absolute',
                  top: '-200%',
                  left: 0,
                }}
              >
                حذف همه
              </button>
            )}
            <Select
              mode={mode}
              suffixIcon={suffixIcon}
              value={values[name]}
              labelInValue={labelInValue}
              filterOption={filterOption}
              onMouseLeave={onMouseLeave}
              notFoundContent={notFoundContent}
              onSearch={debounce(onSearch, 1000)}
              showSearch={showSearch}
              placeholder={placeholder}
              name={name}
              onChange={val => {
                setFieldValue(name, val);
                onChange(val, f);
              }}
              onBlur={handleBlur}
              disabled={disabled}
            >
              {data?.map(option => (
                <Option key={option.label} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Item>
        </Column>
      )}
    </>
  );
}
