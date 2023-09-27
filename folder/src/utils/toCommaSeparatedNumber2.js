const toCommaSeparatedNumber = value => {
  if (value && (typeof value === 'string' || typeof value === 'number')) {
    const toStringValue = value.toString();
    const removeComma = () => toStringValue.split(',').join('');

    return removeComma().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return value;
};
export default toCommaSeparatedNumber;
