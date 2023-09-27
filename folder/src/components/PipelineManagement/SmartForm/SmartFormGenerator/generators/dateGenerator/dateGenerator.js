import React from 'react';
import momentJalaali from 'moment-jalaali';
import { DatePickerWrapper } from '../../../../widgets';

momentJalaali.loadPersian({ dialect: 'persian-modern' });
function DatePickerGenerator(
  fieldItem,
  { field: { value: dateValue, onChange, ref } },
  readOnly,
) {
  const props = {
    label: fieldItem.properties?.label || 'عنوان فیلد',
    onChange,
    ref,
    dateValue,
    isRequired: fieldItem.properties.required || false,
    readOnly,
  };

  return <DatePickerWrapper {...props} />;
}

export default DatePickerGenerator;
