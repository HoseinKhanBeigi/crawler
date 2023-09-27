import React from 'react';
import { CheckBoxWrapper } from '../../../../widgets';

function generateCheckbox(
  fieldItem,
  { field: { value, onChange, onBlur, ref } },
  readOnly,
) {
  const customOnChange = e => {
    if (e.target.checked) {
      onChange([...(value || []), e.target.value]);
    } else {
      onChange(value.filter(item => item !== e.target.value));
    }
  };
  const options = fieldItem.properties?.options || [];
  const props = {
    title: fieldItem.properties?.label || 'عنوان فیلد',
    options,
    onChange: customOnChange,
    onBlur,
    value,
    ref,
    isRequired: fieldItem.properties.required || false,
    readOnly,
  };
  return <CheckBoxWrapper {...props} />;
}

export default generateCheckbox;
