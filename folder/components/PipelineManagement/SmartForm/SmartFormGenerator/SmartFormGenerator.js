import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SmartFormGenerator.scss';
import generateShortText from './generators/shortTextGenerator/shortTextGenerator';
import generateLongText from './generators/longTextGenerator/longTextGenerator';
import generateCheckbox from './generators/checkboxGenerator/checkboxGenerator';
import generateRadioButton from './generators/radioButtonGenerator/radioButtonGenerator';
import generateDate from './generators/dateGenerator/dateGenerator';
import FieldMoreAction from '../../FieldMoreAction/FieldMoreAction';
import { ObjectUtils } from '../../../../utils/objectUtils';
import { getPipelineFieldTypes } from '../../../../store/pipelineFieldType/pipelineFieldType.actions';

const SmartFormGenerator = ({
  fields,
  cleanForm,
  children,
  readOnly,
  onSubmit,
  showFieldAction,
  onFormStateChange,
  values,
  removeField,
  moveField,
  fieldTypes,
  getFieldTypes,
}) => {
  const { control, handleSubmit, reset, formState } = useForm();

  useEffect(() => {
    if (!ObjectUtils.isEmpty(values)) {
      reset(values);
    }
  }, [values]);

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange(formState);
    }
  }, [formState]);

  useEffect(() => {
    if (!fieldTypes || fieldTypes?.length === 0) {
      getFieldTypes();
    }
  }, []);

  const fieldTypesMap = useMemo(() => {
    const map = {};
    fieldTypes.forEach(item => {
      map[item.id] = item;
    });
    return map;
  }, [fieldTypes]);

  useEffect(() => {
    if (cleanForm) {
      reset();
    }
  }, [cleanForm]);

  async function submitForm(data) {
    if (onSubmit) {
      try {
        await onSubmit(data);
        reset(data);
      } catch (e) {
        // TODO: handle error
      }
    }
  }

  function getFieldType(item) {
    if (typeof item === 'string') {
      return fieldTypesMap[item].name;
    }
    return item.name;
  }

  function renderField(fieldItem) {
    return controller => {
      if (getFieldType(fieldItem.fieldType) === 'short-text') {
        return generateShortText(fieldItem, controller, readOnly);
      } else if (getFieldType(fieldItem.fieldType) === 'long-text') {
        return generateLongText(fieldItem, controller, readOnly);
      } else if (getFieldType(fieldItem.fieldType) === 'check-box') {
        return generateCheckbox(fieldItem, controller, readOnly);
      } else if (getFieldType(fieldItem.fieldType) === 'radio') {
        return generateRadioButton(fieldItem, controller, readOnly);
      } else if (getFieldType(fieldItem.fieldType) === 'date') {
        return generateDate(fieldItem, controller, readOnly);
      }
      return <></>;
    };
  }

  function handleOnRemove(id) {
    if (removeField) {
      removeField(id);
    }
  }

  function handleOnMove(index, direction) {
    if (moveField) {
      moveField(index, direction);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={styles.formContainer}>
        {fields?.map((fieldItem, fieldItemNumber) => (
          <div className={styles.itemWrapper}>
            <Controller
              control={control}
              name={fieldItem.id}
              render={renderField(fieldItem)}
            />
            {showFieldAction && (
              <div className={styles.moreActionWrapper}>
                <FieldMoreAction
                  onRemove={handleOnRemove}
                  field={fieldItem}
                  onMove={handleOnMove}
                  fieldNumber={fieldItemNumber}
                  lastFieldNumber={fields.length - 1}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {children}
    </form>
  );
};

SmartFormGenerator.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cleanForm: PropTypes.bool,
  children: PropTypes.element,
  readOnly: PropTypes.bool,
  showFieldAction: PropTypes.bool,
  removeField: PropTypes.func,
  moveField: PropTypes.func,
  onFormStateChange: PropTypes.func,
  getFieldTypes: PropTypes.func.isRequired,
  values: PropTypes.object,
  fieldTypes: PropTypes.array.isRequired,
};

SmartFormGenerator.defaultProps = {
  cleanForm: false,
  children: <></>,
  readOnly: false,
  showFieldAction: false,
  removeField: () => {},
  moveField: () => {},
  onFormStateChange: () => {},
  values: {},
};

const stateMap = store => ({
  fieldTypes: store.pipelineFieldType.data,
});

const dispatchMap = {
  getFieldTypes: getPipelineFieldTypes,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(SmartFormGenerator));
