import React from 'react';
import { voipStatusType } from '../../utils/voipTypes';
import DateTime from '../../components/CrmActivityTable/tableDataComponents/DateTime';

export const followUp = [
  {
    key: 1,
    text: 'دارد',
    value: true,
  },
  {
    key: 2,
    text: 'ندارد',
    value: 'false',
  },
];

export const columns = [
  {
    title: 'شناسه',
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: 'مبدا',
    dataIndex: 'source',
    render: value =>
      value === 'manual' ? 'دستی' : value === 'voip' ? 'سیستمی' : '---',
    ellipsis: true,
  },
  {
    title: 'نوع',
    dataIndex: 'callType',
    render: type => (type === 'INCOMING' ? 'ورودی' : 'خروجی'),
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'voipStatusType',
    render: value => voipStatusType[value],
    ellipsis: true,
  },
  {
    title: 'شماره',
    dataIndex: 'callNumber',
    data: value => value || 'ندارد',
    ellipsis: true,
  },
  {
    title: 'نام و نام خانوادگی',
    dataIndex: 'callerFullName',
    render: value => (!value?.includes('null') ? value : '---'),
    ellipsis: true,
  },
  {
    title: 'پاسخگو',
    dataIndex: 'operatorFullName',
    data: value => value || 'ندارد',
    ellipsis: true,
  },
  {
    title: 'نوع تماس',
    dataIndex: 'type',
    data: value => value || 'ندارد',
    ellipsis: true,
  },
  {
    title: 'موضوع تماس',
    dataIndex: 'subject',
    data: value => value || 'ندارد',
    ellipsis: true,
  },
  {
    title: 'زمان',
    dataIndex: 'timeDate',
    data: value => value || 'ندارد',
    render: text => <DateTime text={text} />,
    ellipsis: true,
  },
  {
    title: 'مدت (ثانیه)',
    dataIndex: 'duration',
    render: value => (value !== 'UNKNOWN' ? value : '---'),
    ellipsis: true,
  },
  {
    title: 'نیاز به پیگیری',
    dataIndex: 'followUp',
    render: value => (value === true ? 'دارد' : 'ندارد'),
    ellipsis: true,
  },
];
