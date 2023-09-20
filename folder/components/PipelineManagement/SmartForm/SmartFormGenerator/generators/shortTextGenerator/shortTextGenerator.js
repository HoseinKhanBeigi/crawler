import React from 'react';
import { InputWrapper } from '../../../../widgets';

function generateShortText(
  fieldItem,
  { field: { value, onChange, onBlur, ref } },
  readOnly,
) {
  const props = {
    name: fieldItem.name,
    label: fieldItem.properties?.label || 'عنوان فیلد',
    onChange: event => onChange(event.target.value),
    onBlur,
    description: fieldItem.properties?.description || '',
    placeholder: fieldItem.properties?.placeholder,
    value,
    ref,
    isRequired: fieldItem.properties.required || false,
    readOnly,
  };
  return <InputWrapper {...props} />;
}

export default generateShortText;
