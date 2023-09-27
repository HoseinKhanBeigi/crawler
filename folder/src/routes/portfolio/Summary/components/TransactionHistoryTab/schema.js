import React from 'react';
import convertToJalaliDate from '../../../../../utils/date';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';

export const schema = [
  {
    title: 'عنوان',
    dataIndex: 'description',
    render: value => value || '---',
  },
  {
    title: 'مبلغ',
    dataIndex: 'amount',
    render: value =>
      (
        <p style={{ direction: 'ltr', negative: '"- "' }}>
          {toCommaSeparatedNumber(value)}
        </p>
      ) || '---',
  },
  {
    title: 'تاریخ',
    dataIndex: 'date',
    render: value =>
      value
        ? `${convertToJalaliDate(value, 'HH:mm:ss')} | ${convertToJalaliDate(
            value,
          )} `
        : '---',
  },
];
