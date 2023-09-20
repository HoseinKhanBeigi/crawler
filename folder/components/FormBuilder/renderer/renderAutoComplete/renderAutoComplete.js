/* eslint-disable react/prop-types */
import React from 'react';
import { AutoComplete, Descriptions, Form, Input } from 'antd';
import debounce from 'lodash/debounce';
import Column from '../../components/Column';

const renderAutoComplete = f => {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    field: {
      name,
      label,
      dataSource,
      suffix,
      hasDescription = false,
      descriptionProp = [{ title: 'title', prop: 'propName' }],
      filterOption = false,
      onSearch = () => {},
      showSearch = false,
      selectedDebounce,
      notFoundContent = 'نتیجه‌ای یافت نشد!',
      onChange = () => {},
      config: { placeholder, required, grid, disabled, visible = true } = {},
    },
  } = f;

  const renderUserInfoDesc = props => (
    <Descriptions
      layout="vertical"
      column={props.length}
      style={{ fontSize: '8px' }}
    >
      {props.map(d => (
        <Descriptions.Item label={d.title} key={d.id}>
          {d.value || 'ندارد'}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <>
      {visible && (
        <Column key={name} grid={grid}>
          <Form.Item
            required={required}
            label={label}
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
            <AutoComplete
              showSearch={showSearch}
              filterOption={filterOption}
              notFoundContent={notFoundContent}
              onChange={value => {
                onChange(name, value);
                setFieldValue(name, value);
              }}
              value={values[name]}
              optionLabelProp="text"
              disabled={disabled}
              placeholder={placeholder}
              onSearch={debounce(onSearch, 1000 || selectedDebounce)}
              dataSource={dataSource}
            >
              <Input name={name} suffix={suffix} />
            </AutoComplete>
          </Form.Item>
          {hasDescription && (
            <div
              style={{
                backgroundColor: '#fbfbfb',
                marginTop: 8,
                padding: 8,
                border: 'solid 1px #e1e1e1',
              }}
            >
              {renderUserInfoDesc(descriptionProp)}
            </div>
          )}
        </Column>
      )}
    </>
  );
};

export default renderAutoComplete;
