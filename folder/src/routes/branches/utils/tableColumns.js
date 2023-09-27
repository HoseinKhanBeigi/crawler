import React from 'react';
import { Tag } from 'antd';
import Link from '../../../components/Link';
import MoreList from '../../../components/MoreList';
import convertToJalaliDate from '../../../utils/date';
import UnitStatusTag from '../../../components/Unit/components/UnitStatusTag/UnitStatusTag';

const localizedOperationTypeNames = {
  OPERATIONAL: 'عملیاتی',
  NON_OPERATIONAL: 'غیر عملیاتی',
};

export const localizeOperationTypeName = val =>
  localizedOperationTypeNames[val];

export const tableColumns = [
  {
    title: 'نام شعبه',
    dataIndex: 'name',
  },
  {
    title: 'کد شعبه',
    dataIndex: 'code',
  },
  {
    title: 'شهر',
    dataIndex: 'contactDTO.cityName',
  },
  {
    title: 'نوع شعبه',
    dataIndex: 'operationType',
    render: localizeOperationTypeName,
  },
  {
    title: 'محصولات',
    dataIndex: 'productsDTO',
    render: list =>
      list?.map((item, index) =>
        index < 2 ? (
          <Tag
            color="#f9f9f9"
            style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
          >{`${item?.title || '---'}`}</Tag>
        ) : (
          <MoreList
            list={list}
            index={index}
            renderContent={value => `${value?.title || '---'}`}
          />
        ),
      ),
  },
  {
    title: 'مسئول شعبه',
    dataIndex: 'managerFullName',
    render: (value, row) =>
      value ? (
        <Link target to={`lead/${row.managerLevantId}`}>
          {value}
        </Link>
      ) : (
        '---'
      ),
  },
  {
    title: 'شماره تماس',
    dataIndex: 'contactDTO.tel',
    render: value =>
      value?.replace(/\d/g, (num, index) => (index === 3 ? `-${num}` : num)),
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: value => <UnitStatusTag status={value} />,
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createDateTime',
    render: value => convertToJalaliDate(value) || '---',
  },
];

// ellipsis: true,
