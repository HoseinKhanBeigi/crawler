import React from 'react';
import convertToJalaliDate from '../../../../../utils/date';
import Link from '../../../../../components/Link';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';

export const itemsList = (data, saleStates) => [
  {
    title: 'نام فرصت',
    data: data?.name,
    type: 'string',
  },
  {
    title: 'حساب (سرنخ)',
    data: (
      <Link to={`/lead/${data?.accountLevantId}`} target>
        {data?.accountFullName}
      </Link>
    ),
    type: 'node',
  },
  {
    title: 'محصول',
    data: data?.saleProduct.name,
    type: 'tag',
  },
  {
    title: 'مرحله فروش',
    data: saleStates.reduce(
      (s, d) => (d.code === data?.saleState ? d.name : s),
      '---',
    ),
    type: 'tag',
    tagColor: saleStates.reduce(
      (s, d) => (d.code === data?.saleState ? d.color : s),
      '---',
    ),
  },
  {
    title: 'تاریخ وضعیت قطعی',
    data: data?.closeDate ? convertToJalaliDate(data?.closeDate) : '---',
    type: 'string',
  },
  {
    title: 'مبلغ مورد انتظار',
    data: data?.expectedBudget
      ? `${toCommaSeparatedNumber(data?.expectedBudget)} ریال`
      : '---',
    type: 'string',
  },
  {
    title: 'احتمال موفقیت',
    data: data?.probability ? `${data?.probability}%` : '---',
    type: 'string',
  },
  {
    title: 'تاریخ پیش بینی فروش',
    data: data?.forecastDate
      ? `${convertToJalaliDate(data?.forecastDate)}`
      : '---',
    type: 'string',
  },
  {
    title: 'نام مسئول',
    data: data?.assigneeFullName,
    type: 'string',
  },
  {
    title: 'آخرین ویرایش',
    data: data?.lastModifiedDate
      ? `${convertToJalaliDate(data?.lastModifiedDate)}`
      : '---',
    type: 'string',
  },
  {
    title: 'توضیحات',
    data: data?.description,
    type: 'string',
  },
];
