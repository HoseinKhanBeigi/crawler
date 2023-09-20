import React, { useState } from 'react';
import InlineEdit from '@atlaskit/inline-edit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import styles from './GenerateStartFormFields.scss';
import {
  ButtonWrapper,
  InputWrapper,
  RadioButtonWrapper,
  TextAreaWrapper,
  DatePickerWrapper,
} from '../widgets';
import Edit from '../icons/edit';
import generateCheckbox from '../SmartForm/SmartFormGenerator/generators/checkboxGenerator/checkboxGenerator';
import { generateFieldValue } from '../../../utils/pipelineFieldValueGenerator';

const GenerateStartFormFields = ({
  values,
  cardId,
  startFormFields,
  editFields,
  field,
}) => {
  const [isFieldEditing, setIsFieldEditing] = useState(false);

  function onConfirmHandler(value) {
    setIsFieldEditing(false);
    editFields(value, cardId);
  }

  function renderInputView(id, fieldProps) {
    const startFormFieldType = startFormFields.find(
      startField => startField.id === id,
    );

    if (startFormFieldType.fieldType?.name === 'short-text') {
      return <InputWrapper {...fieldProps} autoFocus />;
    } else if (startFormFieldType.fieldType?.name === 'long-text') {
      // TODO: use generators
      // return generateLongText(startFormFieldType, { field: fieldProps }, false);
      return <TextAreaWrapper {...fieldProps} autoFocus />;
    } else if (startFormFieldType.fieldType?.name === 'check-box') {
      return generateCheckbox(startFormFieldType, { field: fieldProps }, false);
    } else if (startFormFieldType.fieldType?.name === 'radio') {
      const options = startFormFieldType.properties?.options.map(option => ({
        value: option,
        label: option,
      }));
      return <RadioButtonWrapper options={options} {...fieldProps} />;
    } else if (startFormFieldType.fieldType?.name === 'date') {
      return <DatePickerWrapper {...fieldProps} />;
    }
    return <InputWrapper {...fieldProps} autoFocus />;
  }

  function renderDefaultValue() {
    const defaultValue = (
      <div
        className={styles.emptyValue}
        onClick={() => setIsFieldEditing(true)}
        role="presentation"
      >
        برای افزودن متن کلیک کنید
      </div>
    );
    return generateFieldValue(values, field) || defaultValue;
  }

  function renderFieldTitle() {
    const title = field.properties?.label;
    const isRequired = field.properties?.required || false;
    return (
      <>
        <span className={styles.formFieldTitleText}>
          {isRequired ? '*' : ''}
          {title}
          <ButtonWrapper
            onClick={() => setIsFieldEditing(true)}
            appearance="subtle"
            className={styles.editTitleButton}
          >
            {values && <Edit />}
          </ButtonWrapper>
        </span>
      </>
    );
  }
  return (
    <div>
      <div className={styles.formFieldTitle}>{renderFieldTitle()}</div>
      <div className={styles.formFieldValue}>
        <InlineEdit
          defaultValue={values}
          editView={({ errorMessage, ...fieldProps }) =>
            renderInputView(cardId, fieldProps)
          }
          isEditing={isFieldEditing}
          onCancel={() => setIsFieldEditing(false)}
          readView={() => (
            <div data-testid="read-view">{renderDefaultValue()}</div>
          )}
          onConfirm={value => onConfirmHandler(value)}
        />
      </div>
    </div>
  );
};

GenerateStartFormFields.propTypes = {
  values: PropTypes.any.isRequired,
  cardId: PropTypes.string.isRequired,
  startFormFields: PropTypes.object.isRequired,
  editFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenerateStartFormFields);
