import { getActionOption } from '../../utils/getActivityOptions';
import convertToJalaliDate from '../../utils/date';

export const searchData = actionTypes => [
  {
    name: 'from',
    title: 'از تاریخ',
    type: 'fromDateTime',
  },
  {
    name: 'to',
    title: 'تا تاریخ',
    type: 'toDateTime',
  },
  {
    name: 'actions',
    title: 'فعالیت',
    type: 'dropDown',
    mode: 'multiple',
    data: actionTypes ? getActionOption(actionTypes) : null,
  },
  {
    name: 'applicationName',
    title: 'نام محصول',
    type: 'input',
  },
  {
    name: 'productName',
    title: 'نام محصول',
    type: 'input',
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createdDateTime',
    render: date => convertToJalaliDate(date),
  },
];
