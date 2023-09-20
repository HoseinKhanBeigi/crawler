export const BANK_DENIED_FOR_INVALID_ACCOUNT_NUMBER =
  'BANK_DENIED_FOR_INVALID_ACCOUNT_NUMBER';
export const BANK_DENIED_FOR_NO_MATCH_SHEBA_NO_WITH_USERINFO =
  'BANK_DENIED_FOR_NO_MATCH_SHEBA_NO_WITH_USERINFO';
export const BANK_DENIED_FOR_OTHER_REASON = 'BANK_DENIED_FOR_OTHER_REASON';

export const verificationStatus = [
  {
    value: true,
    name: 'تایید',
  },
  {
    value: false,
    name: 'رد',
  },
];

export const deniedOptions = [
  {
    value: BANK_DENIED_FOR_INVALID_ACCOUNT_NUMBER,
    name: 'شماره حساب نامعتبر',
  },
  {
    value: BANK_DENIED_FOR_NO_MATCH_SHEBA_NO_WITH_USERINFO,
    name: 'عدم تطابق شماره شبا با مشخصات فرد ارای اکانت',
  },
  {
    value: BANK_DENIED_FOR_OTHER_REASON,
    name: 'دیگر موارد',
  },
];

export const banks = [
  {
    text: 'بانک سامان',
    value: '746',
  },
  {
    text: 'بانک ملت',
    value: '101',
  },
];
