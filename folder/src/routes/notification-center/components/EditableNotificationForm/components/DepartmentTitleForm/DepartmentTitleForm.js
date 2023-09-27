import React from 'react';
import { Form, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './DepartmentTitleForm.scss';
import Label from '../Label/Label';

const DepartmentTitleForm = ({ onChange, onBlur, value, error }) => (
  <div className={s.departmentTitle}>
    <Label text="دپارتمان" />
    <Form.Item
      htmlFor="name"
      validateStatus={error ? 'error' : 'success'}
      help={error && <small>{error}</small>}
    >
      <Input
        name="name"
        value={value}
        onChange={onChange}
        onBlur={e => (e.target.value ? onBlur() : undefined)}
        placeholder="وارد کنید"
      />
    </Form.Item>
  </div>
);

DepartmentTitleForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(s)(DepartmentTitleForm);
