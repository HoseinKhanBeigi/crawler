import React from 'react';
import { Tag } from 'antd';
import convertToJalaliDate from '../../utils/date';
import MoreList from '../../components/MoreList';
import UnitStatusTag from '../../components/Unit/components/UnitStatusTag/UnitStatusTag';

export const columns = [
  {
    title: 'نام نمایندگی',
    dataIndex: 'name',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'کد نمایندگی',
    dataIndex: 'code',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'شهر',
    dataIndex: 'contactDTO.cityName',
    render: value => value || '---',
    ellipsis: true,
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
    ellipsis: true,
  },
  {
    title: 'مسئول نمایندگی',
    dataIndex: 'managerFullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'شماره تماس',
    dataIndex: 'contactDTO.tel',
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: value => <UnitStatusTag status={value} />,
    ellipsis: true,
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createDateTime',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: true,
  },
];
