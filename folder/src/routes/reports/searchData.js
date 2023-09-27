import { getActionOption } from '../../utils/getActivityOptions';

export const searchData = (cities, provinces, actionTypes) => [
  {
    name: 'from',
    title: 'از تاریخ',
    type: 'fromDateTime',
    isRequired: true,
    divider: {
      position: 'TOP',
      name: 'لطفا بازه فعالیت های مورد نظر خود را انتخاب نمایید',
    },
  },
  {
    name: 'to',
    title: 'تا تاریخ',
    type: 'toDateTime',
    isRequired: true,
  },
  {
    name: 'actions',
    title: 'فعالیت',
    type: 'dropDown',
    mode: 'multiple',
    divider: {
      position: 'TOP',
      name: 'مشخصات فردی',
    },
    data: actionTypes ? getActionOption(actionTypes) : null,
  },
  {
    name: 'firstName',
    title: 'نام',
    type: 'input',
  },
  {
    name: 'lastName',
    title: 'نام خانوادگی',
    type: 'input',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'input',
  },
  {
    name: 'mobilePhone',
    title: 'موبایل',
    type: 'input',
  },
  {
    name: 'levantId',
    title: 'شناسه لوانت',
    type: 'input',
    divider: {
      position: 'BOTTOM',
      name: 'مشخصات بانکی',
    },
  },
  {
    name: 'bankName',
    title: 'نام بانک',
    type: 'input',
  },
  {
    name: 'bankBranchName',
    title: 'نام شعبه ',
    type: 'input',
  },
  {
    name: 'bankAccountNumber',
    title: 'شماره حساب',
    type: 'input',
  },
  {
    name: 'iban',
    title: 'شماره شبا',
    type: 'input',
    divider: {
      position: 'BOTTOM',
      name: 'مشخصات تماس',
    },
  },
  {
    name: 'province',
    title: 'استان محل سکونت',
    type: 'dropDown',
    data: provinces,
  },
  {
    name: 'livingCity',
    title: 'شهر محل سکونت',
    type: 'dropDown',
    data: cities,
  },
  {
    name: 'issueLocation',
    title: 'شهر محل ملاقات',
    type: 'dropDown',
    data: cities,
  },
  {
    name: 'workProvince',
    title: 'استان محل اشتغال',
    type: 'dropDown',
    data: provinces,
  },
  {
    name: 'workCity',
    title: 'شهر محل اشتغال',
    type: 'dropDown',
    data: cities,
  },
  {
    name: 'email',
    title: 'ایمیل',
    type: 'input',
  },
  {
    name: 'workEmail',
    title: 'ایمیل کاری',
    type: 'input',
  },
];
