/* eslint-disable no-bitwise,prettier/prettier */

import moment from 'moment-jalaali';
import provinces from './provinces';
import cities from './cities';

moment.locale('fa');
moment.loadPersian({
  dialect: 'persian-modern',
  usePersianDigits: false,
});

export function setCookie(name, value, hours) {
  if (process.env.BROWSER) {
    // let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      // expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}; path=/; secure;`;
  } else {
    // console.log('You are not supposed to set a cookie at server');
  }
}

export function readCookieFrom(cookies, name) {
  const nameEQ = `${name}=`;
  const ca = cookies.split(';');
  let i = 0;
  const { length } = ca;
  for (; i < length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

export function deleteCookie(name) {
  setCookie(name, '', -1);
}

export function getCookie(name) {
  if (process.env.BROWSER) {
    return readCookieFrom(document.cookie, name);
  }
  return null;
}

export function getHeaderCookie(name, cookie) {
  if (cookie) {
    return readCookieFrom(cookie, name);
  }
  return null;
}

export function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function getCityName(id) {
  if (id) {
    const city = cities.find(item => item.value === parseInt(id, 10));
    if (city && city.text) {
      return city.text;
    }
  }
  return '---';
}

export function getCityCode(name) {
  const city = cities.find(item => item.text === parseInt(name, 10));
  if (city) {
    return city.value;
  }
  return '---';
}

export function getCitiesByProvince(province) {
  return cities.filter(item => item.province_id === province);
}

export function getProvinceName(id) {
  const province = provinces.find(item => item.value === parseInt(id, 10));
  const defaultValue = provinces.find(item => item.value === 108);
  if (province) {
    return province.text;
  }
  return defaultValue.text;
}

export function formatToPersian(englishNumber) {
  const strInput = englishNumber.toString();
  const strArray = strInput.split('');

  const numMap = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
  };
  let output = '';

  strArray.forEach(str => {
    if (numMap[str]) {
      output += numMap[str];
    } else {
      output += str;
    }
  });

  return output;
}

//convert Persian numbers to English ones
export const persianNumToEnglishNum = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

// convert fa number to en or reverse
export function formatNumbers(text, enToFa = false) {
  let numbers = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };

  if (!enToFa) {
    numbers = Object.keys(numbers).reduce(
      (obj, key) => Object.assign({}, obj, { [numbers[key]]: key }),
      {},
    );
  }
  const textSplited = text.split('');
  const persianItems = [];

  Object.values(textSplited).forEach(key => {
    if (numbers[key]) {
      persianItems.push(numbers[key]);
    } else {
      persianItems.push(key);
    }
  });

  return persianItems.join('');
}

// TODO unixToDate helper
// day: "01"
// month: "12"
// date: "1372/12/01"
// fullText: "یک‌شنبه 1 اسفند 1372 "
// text: "یک‌شنبه 1372/12/1"
// year: "1372"
// time: "03:30"
/**
 * unixToDate
 * @param timestamp
 * @returns {*}
 */
export function unixToDate(timestamp) {
  const m = moment(timestamp);

  if (!m.isValid()) {
    return {};
  }

  const momentArray = m.format('jYYYY/jMM/jDD').split('/');
  return {
    year: momentArray[0],
    month: momentArray[1],
    day: momentArray[2],
    time: m.format('HH:mm'),
    date: m.format('jYYYY/jMM/jDD'),
    text: m.format('dddd jYYYY/jM/jD'),
    fullText: m.format('dddd jD jMMMM jYYYY '),
  };
}

// filter special numbers between numbers
export function filterNumbers(numbers, values) {
  const mapNumbers = [...Array(numbers).keys()].map(x => x + 1);
  return mapNumbers?.filter(value => !values?.includes(value));
}

// Advanced Search function in pages
export async function onSearch(value, data, action, product) {
  let params;
  if (product) {
    params = `${product}?page=0&size=${data.size}&${value}`;
  } else {
    params = `page=0&size=${data.size}&${value}`;
  }
  await action(params);
}
// mask data
export function maskCharacters(text) {
  let masked = new Array(text?.length - 3).join('*');
  masked += text.substring(text.length - 3);
  return masked;
}

// Pagination function to navigate in pages
export async function changePage(page, pageSize, action, data) {
  const params = data
    ? `page=${page - 1}&size=${pageSize}&${data}`
    : `page=${page - 1}&size=${pageSize}`;
  await action(params);
}

// This method returns address
export function returnAddress(state, city, street) {
  const stateValue = state !== null && state !== 0 ? `${getProvinceName(state)}،` : '---';
  const cityValue =  city !== null && city !== 0 ? `${getCityName(city)}،` : null;
  const streetValue = street ? `${street}` : null;

  if (!stateValue && !cityValue && !streetValue) {
    return null;
  }

  return `${stateValue} ${cityValue} ${streetValue}`;
}

export function getDaysAgeTimeStamp(days) {
  return +new Date() - days * 24 * 60 * 60 * 1000;
}

export function getTimeStamp(date = '') {
  if (date === '') {
    return +new Date();
  }
  return +new Date(date);
}

export const fullName = user => `${user.firstName} ${user.lastName}`.trim();

// TODO: find a better way! with regex...
export const replaceArabicCharactersWithPersian = str =>
  str
    .replace(/ي/g, 'ی')
    .replace(/ى/g, 'ی')
    .replace(/ك/g, 'ک')
    .trim();
