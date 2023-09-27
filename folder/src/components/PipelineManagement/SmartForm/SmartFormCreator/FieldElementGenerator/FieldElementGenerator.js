import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TextArea from '@atlaskit/textarea';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FieldElementGenerator.scss';
import { ButtonWrapper, InputWrapper, SwitchWrapper } from '../../../widgets';
import RecycleBin from '../../../icons/recycleBin';
import AddIcon from '../../../icons/addIcon';
import { ObjectUtils } from '../../../../../utils/objectUtils';

function FieldElementGenerator({ fieldType, submitFields, loading }) {
  const [elementsValues, setElementsValue] = useState({});
  const [options, setOptions] = useState(['', '']);

  function validateFieldElement() {
    if (fieldType.name === 'check-box' || fieldType.name === 'radio') {
      return ObjectUtils.checkIfItsFilled(elementsValues.options);
    }
    return true;
  }
  function submit() {
    if (validateFieldElement()) {
      submitFields(elementsValues);
    }
  }

  const onChange = (e, element) => {
    const newElementValue = { [element]: e.target.value };
    const newElementValues = elementsValues;
    Object.assign(newElementValues, newElementValue);
    setElementsValue({ ...newElementValues });
  };

  const switchBoxOnchange = element => {
    const newValue = !elementsValues[element];
    const newElementValue = { [element]: newValue };
    const newElementValues = elementsValues;
    Object.assign(newElementValues, newElementValue);
    setElementsValue({ ...newElementValues });
  };
  const addOption = () => {
    const newOptions = options;
    newOptions.push('');
    setOptions([...newOptions]);
  };
  const removeOption = (optionNumber, id) => {
    const newOptions = options.filter(
      (option, index) => index !== optionNumber,
    );
    elementsValues[id] = newOptions;
    setElementsValue(elementsValues);
    setOptions(newOptions);
  };

  const checkboxOnChange = (value, element, optionIndex) => {
    const newOptions = options;
    newOptions[optionIndex] = value;
    const newElementValue = { [element]: newOptions };
    const newElementValues = elementsValues;
    Object.assign(newElementValues, newElementValue);
    setElementsValue({ ...newElementValues });
    setOptions([...newOptions]);
  };

  const renderElements = useMemo(
    () => (
      <div>
        {fieldType?.fieldElements.map(element => {
          if (element === 'label') {
            return (
              <div key={element}>
                <InputWrapper
                  onChange={e => onChange(e, element)}
                  value={elementsValues[element]}
                  label="عنوان فیلد"
                  placeholder="عنوان یک متن کوتاه"
                />
              </div>
            );
          } else if (element === 'description') {
            return (
              <div key={element} className={styles.descriptionWrapper}>
                <div className={styles.selectHeader}>
                  <span>توضیحات بیشتر</span>
                </div>
                <div>
                  <TextArea
                    value={elementsValues[element]}
                    minimumRows={5}
                    onChange={e => onChange(e, element)}
                    placeholder="توضیحات خود را در این مکان بنویسید..."
                  />
                </div>
              </div>
            );
          } else if (element === 'options') {
            return (
              <div className={styles.optionContainer}>
                <div className={styles.optionTitleWrapper}>
                  <div className={styles.optionTitle}>افزودن گزینه‌ها</div>
                  <ButtonWrapper
                    appearance="link"
                    onClick={addOption}
                    className={styles.addOptionButton}
                  >
                    <AddIcon />
                  </ButtonWrapper>
                </div>
                {options.map((option, index) => (
                  <div className={styles.optionWrapper}>
                    <span>{index + 1}</span>
                    <InputWrapper
                      onChange={event =>
                        checkboxOnChange(event?.target?.value, element, index)
                      }
                      value={option}
                      className={styles.optionInput}
                    />
                    <ButtonWrapper
                      appearance="link"
                      onClick={() => removeOption(index, element)}
                      className={styles.recycleBinButton}
                    >
                      <RecycleBin />
                    </ButtonWrapper>
                  </div>
                ))}
              </div>
            );
          } else if (element === 'required') {
            return (
              <div className={styles.switchElementWrapper}>
                <SwitchWrapper
                  onChange={() => switchBoxOnchange(element)}
                  label="نشان شده به عنوان فیلد ضروری"
                  isChecked={elementsValues[element]}
                />
              </div>
            );
          }
          return <></>;
        })}
      </div>
    ),
    [options, fieldType, elementsValues],
  );

  return (
    <div className={styles.FieldElementGenerator}>
      <div className={styles.DataTypeHeader}>
        <div className={styles.elementName}>{fieldType?.title}</div>
        <div className={styles.elementDesc}>{fieldType?.description}</div>
      </div>
      <div className={styles.elementsWrapper}>{renderElements}</div>
      <div className={styles.submitButtonWrapper}>
        <ButtonWrapper appearance="primary" onClick={submit} loading={loading}>
          ذخیره
        </ButtonWrapper>
      </div>
    </div>
  );
}

FieldElementGenerator.propTypes = {
  fieldType: PropTypes.object.isRequired,
  submitFields: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
FieldElementGenerator.defaultProps = {
  loading: false,
};

export default withStyles(styles)(FieldElementGenerator);
