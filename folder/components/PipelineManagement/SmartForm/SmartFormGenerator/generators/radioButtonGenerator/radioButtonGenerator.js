import React from 'react';
import { RadioButtonWrapper } from '../../../../widgets';

function generateRadioButton(
  fieldItem,
  { field: { value, onChange, onBlur, ref } },
  readOnly,
) {
  const options = fieldItem.properties?.options.map(option => ({
    value: option,
    label: option,
  }));
  const props = {
    title: fieldItem.properties?.label || 'عنوان فیلد',
    options,
    onChange,
    onBlur,
    value,
    ref,
    isRequired: fieldItem.properties.required || false,
    readOnly,
  };
  return <RadioButtonWrapper {...props} />;
}

export default generateRadioButton;
