const toCommaSeparatedNumber = (value, removeCommas) => {
  if (value && (typeof value === 'string' || typeof value === 'number')) {
    const toStringValue = value.toString();
    const removeComma = () => toStringValue.split(',').join('');
    if (removeCommas) {
      return removeComma();
    }
    return removeComma().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return value;
};
export default toCommaSeparatedNumber;
