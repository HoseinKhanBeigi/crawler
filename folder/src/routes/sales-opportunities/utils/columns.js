import React from 'react';
import { Tag } from 'antd';
import Link from '../../../components/Link/Link';
import toCommaSeparatedNumber from '../../../utils/toCommaSeparatedNumber';
import convertToJalaliDate from '../../../utils/date';

export const columns = ({ saleStates }) => [
  {
    title: 'نام فرصت',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'حساب (سرنخ)',
    dataIndex: 'accountFullName',
    render: (value, record) => (
      <Link to={`/lead/${record.accountLevantId}`} target>
        {value}
      </Link>
    ),
    ellipsis: true,
  },
  {
    title: 'محصول',
    dataIndex: 'saleProduct',
    render: value => <Tag>{value.name || '---'}</Tag>,
    ellipsis: true,
  },
  {
    title: 'مبلغ مورد انتظار (ریال)',
    dataIndex: 'expectedBudget',
    render: value => toCommaSeparatedNumber(value) || '---',
    ellipsis: true,
  },
  {
    title: 'احتمال موفقیت',
    dataIndex: 'probability',
    render: value => (value ? `${value}%` : '---'),
    ellipsis: true,
  },
  {
    title: 'مرحله فروش',
    dataIndex: 'saleState',
    render: value =>
      (
        <Tag
          color={saleStates?.reduce(
            (s, d) => (d.code === value ? d.color : s),
            '',
          )}
        >
          {saleStates?.reduce((s, d) => (d.code === value ? d.name : s), '')}
        </Tag>
      ) || '---',
    ellipsis: true,
  },
  {
    title: 'تاریخ پیش بینی',
    dataIndex: 'forecastDate',
    render: value => (value ? convertToJalaliDate(value) : '---'),
    ellipsis: true,
  },
  {
    title: 'تاریخ وضعیت قطعی',
    dataIndex: 'closeDate',
    render: value => (value ? convertToJalaliDate(value) : '---'),
    ellipsis: true,
  },
  {
    title: 'نام مسئول',
    dataIndex: 'assigneeFullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'آخرین ویرایش',
    dataIndex: 'lastModifiedDate',
    render: value => (value ? convertToJalaliDate(value) : '---'),
    ellipsis: true,
  },
];
