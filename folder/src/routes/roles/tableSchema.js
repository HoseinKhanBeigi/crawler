import React from 'react';
import { Tag } from 'antd';
import convertToJalaliDate from '../../utils/date';
import aclUnitTypes from '../access-control/constants/aclUnitTypes';

export const columns = [
  {
    title: 'نام دسترسی',
    dataIndex: 'title',
    render: value => value || '---',
  },
  {
    title: 'مرتبه سازمانی',
    dataIndex: 'unitTypes',
    render: list =>
      list?.map(item => (
        <Tag
          color="#f9f9f9"
          style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
        >{`${aclUnitTypes[item] || '---'}`}</Tag>
      )),
  },
  {
    title: 'آخرین تغییرات',
    dataIndex: 'lastModifiedDateTime',
    render: value => convertToJalaliDate(value) || '---',
  },
];
