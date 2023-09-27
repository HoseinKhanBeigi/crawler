import React from 'react';
import { Form } from 'antd';
import CPToggleButton from '../../CP/CPToggleButton';
import Column from '../components/Column';

const renderToggleButton = field => {
  const {
    setFieldValue,
    values,
    touched,
    errors,
    field: {
      options,
      name,
      label,
      config: { required, grid, visibile = true } = {},
    } = {},
  } = field;

  const onToggleButtonChangeHandler = value => setFieldValue(name, value);

  return (
    visibile && (
      <Column key={name} grid={grid}>
        <Form.Item
          label={label}
          required={required}
          hasFeedback={touched[name]}
          validateStatus={
            (errors[name] && touched[name]) || errors[name]
              ? 'error'
              : 'success'
          }
          help={
            (errors[name] && touched[name]) || errors[name] ? errors[name] : ''
          }
        >
          <CPToggleButton
            buttons={options}
            onChange={onToggleButtonChangeHandler}
            defaultValue={values[name]}
          />
        </Form.Item>
      </Column>
    )
  );
};
renderToggleButton.propTypes = {};

export default renderToggleButton;
