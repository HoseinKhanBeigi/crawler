import React, { useCallback, useEffect, useRef } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Form, Row } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import s from './FormBuilder.scss';

import renderSelectInput from './renderer/renderSelectInput';
import renderRadioInput from './renderer/renderRadioInput';
import renderTextInput from './renderer/renderTextInput';
import renderFileUpload from './renderer/renderFileUploade';
import renderLabel from './renderer/renderLabel';
import SubmitForm from './components/SubmitForm';
import renderDatePicker from './renderer/renderDatePicker';
import renderCheckbox from './renderer/renderCheckbox';
import renderTimePicker from './renderer/renderTimePicker';
import renderAutoComplete from './renderer/renderAutoComplete/renderAutoComplete';
import renderToggleButton from './renderer/renderToggleButton';

const FormBuilder = props => {
  const {
    enableReinitialize,
    bindFormikProps,
    disableSubmit,
    initialValues,
    submitLabel,
    cancelLabel,
    hideSubmit,
    onSubmit,
    onChange,
    onCancel,
    loading,
    schema,
    layout,
    okType,
  } = props;

  const renderFields = formProps =>
    schema.map(f => {
      const field = { field: f, ...formProps };
      switch (f.type) {
        case 'input':
        case 'textarea':
          return renderTextInput(field);
        case 'radio':
          return renderRadioInput(field);
        case 'toggle':
          return renderToggleButton(field);
        case 'select':
          return renderSelectInput(field);
        case 'date':
          return renderDatePicker(field);
        case 'file':
          return renderFileUpload(field);
        case 'label':
          return renderLabel(field);
        case 'checkbox':
          return renderCheckbox(field);
        case 'time':
          return renderTimePicker(field);
        case 'autocomplete':
          return renderAutoComplete(field);
        default:
          return renderTextInput(field);
      }
    });

  const validationSchema = useCallback(() => {
    const validationShape = {};
    schema.forEach(v => {
      validationShape[v.name] = v.validation;
    });
    return Yup.object().shape(validationShape);
  }, [schema]);

  const valuesRef = useRef(initialValues);
  useEffect(() => {
    valuesRef.current = initialValues;
  }, [initialValues]);

  const handleOnChange = values => {
    if (JSON.stringify(values) !== JSON.stringify(valuesRef.current)) {
      valuesRef.current = values;
      onChange(values);
    }
  };

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema()}
    >
      {formikProps => {
        const { handleSubmit } = formikProps;
        bindFormikProps(formikProps);
        if (typeof onChange === 'function') {
          handleOnChange(formikProps.values);
        }
        return (
          <Form
            onSubmit={handleSubmit}
            className={s.formBuilder}
            layout={layout}
            colon={false}
          >
            <Row gutter={[8, 12]} type="flex">
              {renderFields(formikProps)}
            </Row>
            {!hideSubmit && (
              <SubmitForm
                okType={okType}
                submitLabel={submitLabel}
                cancelLabel={cancelLabel}
                loading={loading}
                disabled={disableSubmit}
                onCancel={onCancel}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
FormBuilder.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      validation: PropTypes.object,
      type: PropTypes.oneOf([
        'date',
        'input',
        'radio',
        'select',
        'file',
        'textarea',
        'simpleDatePicker',
      ]).isRequired,
      onChange: PropTypes.func,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
          ]),
          value: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
          ]),
        }),
      ),
      config: PropTypes.shape({
        grid: PropTypes.oneOfType([
          PropTypes.shape({
            xs: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number,
            xxl: PropTypes.number,
          }),
          PropTypes.number,
          PropTypes.string, // for example: 'auto'
        ]),
        required: PropTypes.bool,
        readonly: PropTypes.bool,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
      }),
    }),
  ).isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  disableSubmit: PropTypes.bool,
  enableReinitialize: PropTypes.bool,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
  hideSubmit: PropTypes.bool,
  bindFormikProps: PropTypes.func,
  okType: PropTypes.string,
};

FormBuilder.defaultProps = {
  initialValues: {},
  onSubmit: () => {},
  onChange: undefined,
  onCancel: null,
  submitLabel: 'ثبت',
  cancelLabel: 'انصراف',
  loading: false,
  layout: 'horizontal',
  hideSubmit: false,
  okType: 'primary',
  disableSubmit: false,
  enableReinitialize: false,
  bindFormikProps: () => {},
};

export default withStyles(s)(FormBuilder);
