import * as Yup from 'yup';

export const inputType = [
  {
    key: 1,
    value: 'INPUT',
    text: 'input',
  },
  {
    key: 2,
    value: 'DROPDOWN',
    text: 'drop down',
  },
  {
    key: 3,
    value: 'MULTIVALUE',
    text: 'multi value',
  },
  {
    key: 4,
    value: 'CHECKBOX',
    text: 'check box',
  },
  {
    key: 5,
    value: 'RADIOBOX',
    text: 'radio box',
  },
  {
    key: 6,
    value: 'DATEPICKER',
    text: 'date picker',
  },
  {
    key: 8,
    value: 'CURRENCY',
    text: 'currency',
  },
];

export const mask = [
  {
    key: 1,
    text: 'ماسک شده',
    value: true,
  },
  {
    key: 2,
    text: 'آنماسک',
    value: false,
  },
];

export const informationClass = [
  {
    key: 1,
    text: 'کم',
    value: 'LEVEL1',
  },
  {
    key: 2,
    text: 'متوسط',
    value: 'LEVEL2',
  },
  {
    key: 3,
    text: 'زیاد',
    value: 'LEVEL3',
  },
];

export const dataType = [
  {
    key: 1,
    text: 'متن',
    value: 'TEXT',
  },
  {
    key: 2,
    text: 'عدد',
    value: 'NUMBER',
  },
  {
    key: 3,
    text: 'تاریخ',
    value: 'DATE',
  },
  {
    key: 4,
    text: 'بولین',
    value: 'BOOLEAN',
  },
];

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('ستون (فیلد) الزامی می باشد.')
    .test('url', 'لطفا از کاراکتر های فارسی استفاده نمایید.', val => {
      const pattern = /^[\u0600-\u06FF\s]+$/;
      if (val) {
        return pattern.test(val);
      }
      return true;
    }),
  defaultValues: Yup.string().test('', value => {
    const splitValue = value.split(',');
    return splitValue.every(
      num => splitValue.indexOf(num) === splitValue.lastIndexOf(num),
    );
  }),
});
