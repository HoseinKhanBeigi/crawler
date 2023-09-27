import React from 'react';
import Link from '../../components/Link';

export const columns = [
  {
    title: 'شناسه لوانت',
    dataIndex: 'levantId',
    key: 'levantId',
    render: levantId => (
      <Link
        to={`/lead/${levantId}`}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {levantId}
      </Link>
    ),
    ellipsis: true,
  },
  {
    title: 'نام',
    dataIndex: 'firstName',
    key: 'firstName',
    ellipsis: true,
  },
  {
    title: 'نام خانوادکی',
    dataIndex: 'lastName',
    key: 'lastName',
    ellipsis: true,
  },
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
    key: 'nationalCode',
    ellipsis: true,
  },
  {
    title: 'موبایل',
    dataIndex: 'mobile',
    key: 'mobile',
    ellipsis: true,
  },
  {
    title: 'شماره شناسنامه',
    dataIndex: 'birthCertificateId',
    key: 'birthCertificateId',
    ellipsis: true,
  },
  {
    title: 'سریال شناسنامه',
    dataIndex: 'birthCertificateSerialNumber',
    key: 'birthCertificateSerialNumber',
    ellipsis: true,
  },
  {
    title: 'سری حرفی و عددی شناسنامه',
    dataIndex: 'birthCertificateSeriesNumber',
    key: 'birthCertificateSeriesNumber',
    ellipsis: true,
  },
  {
    title: 'نام پدر',
    dataIndex: 'fatherName',
    key: 'fatherName',
    ellipsis: true,
  },
  {
    title: 'جنسیت',
    dataIndex: 'gender',
    key: 'gender',
    render: value =>
      value === 'MALE' ? 'مرد' : value === 'FEMALE' ? 'زن' : 'بدون عنوان',
    ellipsis: true,
  },
  {
    title: 'شهر محل ملاقات',
    dataIndex: 'issueLocation',
    key: 'issueLocation',
    ellipsis: true,
  },
  {
    title: 'استان محل سکونت',
    dataIndex: 'province',
    key: 'province',
    ellipsis: true,
  },
  {
    title: 'شهر محل سکونت',
    dataIndex: 'livingCity',
    key: 'livingCity',
    ellipsis: true,
  },
  {
    title: 'ایمیل',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
  {
    title: 'استان محل اشتغال',
    dataIndex: 'workProvince',
    key: 'workProvince',
    ellipsis: true,
  },
  {
    title: 'شهر محل اشتغال',
    dataIndex: 'workCity',
    key: 'workCity',
    ellipsis: true,
  },
  {
    title: 'نشانی پستی محل اشتغال',
    dataIndex: 'workAddress',
    key: 'workAddress',
    ellipsis: true,
  },
  {
    title: 'ایمیل کاری',
    dataIndex: 'workEmail',
    key: 'workEmail',
    ellipsis: true,
  },
  {
    title: 'نام بانک اول',
    dataIndex: 'bankName1',
    key: 'bankName1',
    ellipsis: true,
  },
  {
    title: 'نام شعبه اول',
    dataIndex: 'bankBranchName1',
    key: 'bankBranchName1',
    ellipsis: true,
  },
  {
    title: 'شماره حساب اول',
    dataIndex: 'bankAccountNumber1',
    key: 'bankAccountNumber1',
    ellipsis: true,
  },
  {
    title: 'شماره شبا اول',
    dataIndex: 'iban1',
    key: 'iban1',
    ellipsis: true,
  },
  {
    title: 'نام بانک دوم',
    dataIndex: 'bankName2',
    key: 'bankName2',
    ellipsis: true,
  },
  {
    title: 'نام شعبه دوم',
    dataIndex: 'bankBranchName2',
    key: 'bankBranchName2',
    ellipsis: true,
  },
  {
    title: 'شماره حساب دوم',
    dataIndex: 'bankAccountNumber2',
    key: 'bankAccountNumber2',
    ellipsis: true,
  },
  {
    title: 'شماره شبا دوم',
    dataIndex: 'iban2',
    key: 'iban2',
    ellipsis: true,
  },
];
