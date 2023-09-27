const stateTypes = [
  {
    value: 'PENDING',
    text: 'در انتظار تایید',
  },
  {
    value: 'HELD',
    text: 'لغو شده',
  },
  {
    value: 'NOT_HELD',
    text: 'انجام شده',
  },
  {
    value: 'ABORT',
    text: 'ناموفق',
  },
];
export const searchDataETF = [
  {
    name: 'receiptId',
    title: 'شماره سفارش',
    type: 'input',
  },
  {
    name: 'type',
    title: 'نوع درخواست',
    type: 'dropDown',
    data: stateTypes.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'numberOfShares',
    title: 'مبلغ',
    type: 'input',
  },
  {
    name: 'state',
    title: 'وضعیت',
    type: 'dropDown',
    data: stateTypes.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'clientKey',
    title: 'مبدا',
    type: 'dropDown',
    data: stateTypes.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'date',
    title: 'تاریخ درخواست',
    type: 'date',
    pickTime: false,
  },
  {
    name: 'mobile',
    title: 'مبلغ معادل (ریال)',
    type: 'input',
  },
  {
    name: 'tradedAmount',
    title: 'قیمت واحد (ریال)',
    type: 'input',
  },
];

export const searchDataNoneETF = [
  {
    name: 'receiptId',
    title: 'شماره سفارش',
    type: 'input',
  },
  {
    name: 'type',
    title: 'نوع درخواست',
    type: 'dropDown',
    data: stateTypes.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'state',
    title: 'وضعیت',
    type: 'dropDown',
    data: stateTypes.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'mobile',
    title: 'مبلغ معادل (ریال)',
    type: 'input',
  },
  {
    name: 'date',
    title: 'تاریخ درخواست',
    type: 'date',
    pickTime: false,
  },
];
