import React from 'react';
import LinkToProfile from '../../components/KianTable/renderer/LinkToProfile';
import convertToJalaliDate from '../../utils/date';
import ItemsWithPopUp from '../../components/ItemsWithPopUp/ItemsWithPopUp';

const status = {
  KYC: {
    title: 'احراز هویت شده',
  },
  ACTIVE: {
    title: 'فعال',
  },
};

export const stats = [
  {
    key: 1,
    text: 'احراز هویت شده',
    value: 'KYC',
  },
  {
    key: 2,
    text: 'فعال',
    value: 'ACTIVE',
  },
];

const productFilterType = [
  {
    value: 'EXACT_PRODUCTS',
    text: 'فقط دارای محصول (های)',
  },
  {
    value: 'MINIMUM_PRODUCTS',
    text: 'حداقل دارای محصول (های)',
  },
  {
    value: 'OPTIONAL_PRODUCTS',
    text: 'حداقل یکی از محصولات',
  },
];

export const genderTypes = [
  {
    text: 'مرد',
    value: 'MALE',
  },
  {
    text: 'زن',
    value: 'FEMALE',
  },
];
export const searchData = products => [
  {
    name: 'from',
    title: 'از تاریخ',
    type: 'fromDateTime',
    divider: {
      position: 'TOP',
      name: 'محصولات',
    },
  },
  {
    name: 'to',
    title: 'تا تاریخ',
    type: 'toDateTime',
  },
  {
    title: 'شرط نمایش',
    name: 'productFilterType',
    type: 'dropDown',
    data: productFilterType?.map(type => ({
      value: type.value,
      text: type.text,
    })),
    mode: 'default',
  },
  {
    title: 'محصولات',
    name: 'productIds',
    type: 'select',
    data: products?.map(product => ({
      value: product?.id,
      label: product?.groupName,
    })),
    mode: 'multiple',
  },
  {
    name: 'firstName',
    title: 'نام',
    type: 'input',
    divider: {
      position: 'TOP',
      name: 'اطلاعات فردی',
    },
  },
  {
    name: 'lastName',
    title: 'نام خانوادگی',
    type: 'input',
  },
  {
    name: 'levantId',
    title: 'شناسه لوانت',
    type: 'input',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'input',
  },
  {
    name: 'birthRegisterDateFrom',
    title: 'روز تولد از تاریخ',
    type: 'fromDateTime',
  },
  {
    name: 'birthRegisterDateTo',
    title: 'روز تولد تا تاریخ',
    type: 'toDateTime',
  },
  {
    name: 'status',
    title: 'وضعیت',
    type: 'dropDown',
    data: stats,
    divider: {
      position: 'TOP',
      name: 'دیگر',
    },
  },
];

export const columns = [
  {
    title: 'شناسه لوانت',
    dataIndex: 'levantId',
    render: LinkToProfile || '---',
    ellipsis: true,
  },
  {
    title: 'نام',
    dataIndex: 'name',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: t => status[t]?.title || '---',
    ellipsis: true,
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createdDateEpoch',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: true,
  },
  {
    title: 'نام محصولات',
    dataIndex: 'products',
    render: text =>
      text ? <ItemsWithPopUp items={text} showCount={3} /> : '---',
    ellipsis: true,
  },
];
