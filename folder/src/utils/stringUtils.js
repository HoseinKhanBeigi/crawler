import moment from 'moment';
import { ObjectUtils } from './objectUtils';

export class StringUtils {
  static clearAndUpper(text) {
    return text.replace(/([_-]+)/, ' ').toUpperCase();
  }

  static isItFilled(...values) {
    return values.every(
      value => ObjectUtils.checkIfItsFilled(value) && value !== '',
    );
  }

  static nameToTitle(prefix, name, ...suffixes) {
    return `${prefix && prefix !== '' ? `${prefix} ` : ''}${name.replace(
      /(^\w|[-_]+\w)/g,
      this.clearAndUpper,
    )}${
      ObjectUtils.checkIfItsFilled(suffixes) ? ` ${suffixes.join(' ')}` : ''
    }`;
  }

  static generateDurationTime(time) {
    const date = new Date(time).getTime();
    const today = new Date().getTime();
    const durationTime = today - date;
    if (moment.duration(durationTime).days() !== 0) {
      return `${moment.duration(durationTime).days()} روز پیش `;
    } else if (
      moment.duration(durationTime).days() === 0 &&
      moment.duration(durationTime).hours() !== 0
    ) {
      return `${moment.duration(durationTime).hours()} ساعت پیش`;
    } else if (
      moment.duration(durationTime).hours() === 0 &&
      moment.duration(durationTime).minutes() !== 0
    ) {
      return `${moment.duration(durationTime).minutes()} دقیقه پیش`;
    } else if (
      moment.duration(durationTime).minutes() === 0 &&
      moment.duration(durationTime).seconds() !== 0
    ) {
      return `${moment.duration(durationTime).seconds()} ثانیه پیش`;
    } else if (
      moment.duration(durationTime).seconds() === 0 &&
      moment.duration(durationTime).milliseconds() !== 0
    ) {
      return `هم‌اکنون`;
    }
    return '';
  }
}
