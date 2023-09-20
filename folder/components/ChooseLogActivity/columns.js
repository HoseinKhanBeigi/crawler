import convertToJalaliDate from '../../utils/date';
import { voipStatusType } from '../../utils/voipTypes';

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
    dataIndex: 'statusType',
    render: value => voipStatusType[value],
    ellipsis: true,
  },
  {
    title: 'نوع تماس',
    dataIndex: 'type',
    ellipsis: true,
  },
  {
    title: 'موضوع تماس',
    dataIndex: 'subject',
    ellipsis: true,
  },
  {
    title: 'زمان',
    dataIndex: 'timeDate',
    render: date => convertToJalaliDate(date),
    ellipsis: true,
  },
];
