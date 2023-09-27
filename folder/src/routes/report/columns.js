import React from 'react';
import DateTime from '../../components/CrmActivityTable/tableDataComponents/DateTime';

export const reportColumns = actionTypes => [
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'activityDto.dateTime',
    key: 'createdDate',
    render: date => <DateTime text={date} />,
    ellipsis: true,
  },
  {
    title: 'فعالیت (فارسی)',
    dataIndex: 'activityDto.action',
    key: 'actionFa',
    render: action => (actionTypes !== null ? actionTypes[action] : action),
    ellipsis: true,
  },
  {
    title: 'فعالیت (انگلیسی)',
    dataIndex: 'activityDto.action',
    key: 'actionEn',
    ellipsis: true,
  },
  {
    title: 'نام محصول',
    dataIndex: 'activityDto.applicationName',
    key: 'applicationName',
    ellipsis: true,
  },
];
