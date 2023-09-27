import momentJalaali from 'moment-jalaali';

momentJalaali.loadPersian({ dialect: 'persian-modern' });

export function generateFieldValue(data, field) {
  const fieldType = field?.fieldType?.name;
  if (['short-text', 'long-text', 'radio'].includes(fieldType)) {
    return data;
  } else if (fieldType === 'check-box') {
    if (data instanceof Array) {
      return data.join(', ');
    }
    return data;
  } else if (fieldType === 'date') {
    return momentJalaali(data).format('jYYYY/jM/jD');
  }
  return '';
}

export function generateFieldValueByFields(data, fields, fieldId) {
  return generateFieldValue(
    data,
    fields.find(item => item.id === fieldId),
  );
}
