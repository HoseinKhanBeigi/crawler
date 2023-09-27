import React from 'react';
import convertToJalaliDate from '../../../../../utils/date';
import StatusChip from './components/StatusChip';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';

const reciepNoneEtfType = {
  SELL: 'فروش',
  BUY: 'خرید',
};
const reciepEtfType = {
  SELL: 'ابطال',
  BUY: 'صدور',
};
export const schemaETF = [
  {
    title: 'شماره سفارش',
    dataIndex: 'receiptId',
    render: value => value || '---',
  },
  {
    title: 'نوع درخواست',
    dataIndex: 'type',
    render: value => reciepNoneEtfType[value] || '---',
  },
  {
    title: 'تعداد واحد',
    dataIndex: 'numberOfShares',
    render: value => value || '---',
  },
  {
    title: 'قیمت واحد (ریال)',
    dataIndex: 'unitPrice',
    render: value => toCommaSeparatedNumber(value) || '---',
  },
  {
    title: 'مبلغ معادل (ریال)',
    dataIndex: 'tradedAmount',
    render: value => toCommaSeparatedNumber(value) || '---',
  },
  {
    title: 'وضعیت',
    dataIndex: 'state',
    render: value => <StatusChip status={value} />,
  },
  {
    title: 'مبدا',
    dataIndex: 'clientKey',
    render: value => value || '---',
  },
  {
    title: 'تاریخ درخواست',
    dataIndex: 'date',
    render: value =>
      value
        ? `${convertToJalaliDate(value, 'HH:mm:ss')} | ${convertToJalaliDate(
            value,
          )} `
        : '---',
  },
  {
    title: 'تاریخ تعیین وضعیت',
    dataIndex: 'dueDate',
    render: value => (value ? convertToJalaliDate(value) : '---'),
  },
];

export const schemaNoneETF = [
  {
    title: 'شماره سفارش',
    dataIndex: 'receiptId',
    render: value => value || '---',
  },
  {
    title: 'نوع درخواست',
    dataIndex: 'type',
    render: value => reciepEtfType[value] || '---',
  },
  {
    title: 'مبلغ معادل (ریال)',
    dataIndex: 'orderAmount',
    render: value => toCommaSeparatedNumber(value) || '---',
  },
  {
    title: 'وضعیت',
    dataIndex: 'state',
    render: value => <StatusChip status={value} />,
  },
  {
    title: 'تاریخ درخواست',
    dataIndex: 'date',
    render: value =>
      value
        ? `${convertToJalaliDate(value, 'HH:mm:ss')} | ${convertToJalaliDate(
            value,
          )} `
        : '---',
  },
];
