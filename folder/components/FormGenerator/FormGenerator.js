import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Row } from 'antd';
import cs from 'classnames';
import s from './FormGenerator.scss';
import CPInput from '../CP/CPInput';
import CPSwitch from '../CP/CPSwitch';
import CPSelect from '../CP/CPSelect';
import CPRadio from '../CP/CPRadio';
import CPMultiSelect from '../CP/CPMultiSelect';
import CPCheckbox from '../CP/CPCheckbox';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import CPEmpty from '../CP/CPEmpty';

const FormGenerator = props => {
  const {
    className,
    isSubmitting,
    onSubmit,
    submitText,
    inputPerRow,
    fields,
    initialValues,
  } = props;
  const [fieldsValues, setFieldsValues] = useState(initialValues || []);

  const onChange = id => value => {
    const changedData = fieldsValues?.map(item => {
      if (item.id === id) {
        return {
          ...item,
          value,
        };
      }

      return item;
    });
    setFieldsValues(changedData);
  };

  const getValue = id => fieldsValues?.find(item => item.id === id)?.value;

  const CPSelectOnChange = (value, option) => {
    const changedData = fieldsValues?.map(item => {
      if (item.id === parseInt(option.key, 10)) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    setFieldsValues(changedData);
  };

  // return CPInput
  const createInput = item => (
    <Col span={24 / inputPerRow} key={item.id}>
      <small>{item.name}</small>
      <CPInput
        placeholder={item.name}
        onChange={onChange(item.id)}
        value={getValue(item.id)}
        name={item.code}
        faToEn
        type={
          item.code === 'NATIONALCODE' || item.code === 'MOBILE'
            ? 'tel'
            : 'text'
        }
      />
    </Col>
  );

  // return DropDown
  const createDropDown = item => {
    const dataSource = item.defaultValues?.map(option => ({
      value: option,
      text: option,
      ...item,
    }));
    return (
      <Col span={24 / inputPerRow} key={item.key}>
        <small>{item.name}</small>
        <CPSelect
          defaultValue="لطفا انتخاب کنید"
          dataSource={dataSource}
          onChange={CPSelectOnChange}
          showSearch
        />
      </Col>
    );
  };

  // return CPSwitch
  const createSwitch = item => (
    <Col span={24 / inputPerRow} key={item.key}>
      <small>{item.name}</small>
      <CPSwitch
        size="small"
        checked=""
        onChange={value => {
          onChange(item.key, value);
        }}
      />
    </Col>
  );

  // return CPRadio
  const createRadio = item => (
    <Col span={24 / inputPerRow} key={item.key}>
      <small>{item.name}</small>
      <CPRadio
        size="small"
        checked=""
        onChange={value => {
          onChange(item.key, value);
        }}
      />
    </Col>
  );

  // return CPMultiSelect
  const createMultiSelect = item => (
    <Col span={24 / inputPerRow} key={item.key}>
      <small>{item.name}</small>
      <CPMultiSelect
        name={item.key}
        dataSource={item.data}
        onChange={value => {
          onChange(item.key, value);
        }}
      />
    </Col>
  );

  // return CPMultiSelect
  const createCheckbox = item => (
    <Col span={24 / inputPerRow} key={item.key}>
      <small>{item.name}</small>
      <CPCheckbox
        options={item.data}
        value=""
        onChange={value => {
          onChange(item.key, value);
        }}
      />
    </Col>
  );

  // return true if required input fields are empty
  const checkDisabled = () => {
    const filter = fieldsValues?.filter(item => item.value);
    return !filter?.length;
  };

  const cleanData = () => fieldsValues?.map(({ id, value }) => ({ id, value }));

  const renderFields = () => {
    if (fields?.length) {
      return fields.map(item => {
        switch (item.inputType) {
          case 'INPUT':
            return createInput(item);
          case 'SWITCH':
            return createSwitch(item);
          case 'RADIO':
            return createRadio(item);
          case 'DROPDOWN':
            return createDropDown(item);
          case 'MULTISELECT':
            return createMultiSelect(item);
          case 'CHECKBOX':
            return createCheckbox(item);
          default:
            return null;
        }
      });
    }
    return <CPEmpty description="تاکنون فرمی ایجاد نشده است." />;
  };

  useEffect(() => {
    const finalFieldsValues = fields?.map(({ id, columnCategory }) => ({
      id,
      value: initialValues?.find(val => val.id === id)?.value,
      isRequired: columnCategory === 'MAIN',
    }));
    setFieldsValues(finalFieldsValues);
  }, [initialValues]);

  return (
    <div className={cs(s.formGenerator, 'col-md-12', className)}>
      <Row type="flex" gutter={[16, 8]}>
        {renderFields()}
      </Row>
      <CPDivider />
      <Row type="flex">
        <Col span={24} className="text-left">
          <CPButton
            type="primary"
            onClick={onSubmit(cleanData())}
            loading={isSubmitting}
            htmlType="submit"
            disabled={checkDisabled()}
          >
            {submitText}
          </CPButton>
        </Col>
      </Row>
    </div>
  );
};

FormGenerator.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.array,
  inputPerRow: PropTypes.number,
  isSubmitting: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  initialValues: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
};

FormGenerator.defaultProps = {
  className: null,
  inputPerRow: 4,
  initialValues: [],
  fields: [],
  submitText: 'ثبت',
  isSubmitting: false,
};

export default withStyles(s)(FormGenerator);
export const FormGeneratorTest = FormGenerator;
