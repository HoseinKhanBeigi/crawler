export class ObjectUtils {
  static isEmpty(obj) {
    return this.checkIfItsFilled(obj) ? Object.keys(obj).length === 0 : false;
  }

  static checkIfItsFilled(...values) {
    return values.every(
      value => value !== null && typeof value !== 'undefined',
    );
  }

  static checkIfItsFilledAndNotAnEmptyObject(...values) {
    return values.every(
      value =>
        value !== null &&
        typeof value !== 'undefined' &&
        this.checkIfItsNotAnEmptyObject(value),
    );
  }

  static checkIfItsNotAnEmptyObject(value) {
    if (typeof value === 'object' && !(value instanceof Array)) {
      if (Object.keys(value).length === 0) {
        return false;
      }
    }
    return true;
  }
}
