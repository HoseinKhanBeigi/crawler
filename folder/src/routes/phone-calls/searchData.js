import { voipStatus } from '../../utils/voipTypes';

export const callTypeEnum = [
  {
    key: 1,
    text: 'خروجی',
    value: 'OUTGOING',
  },
  {
    key: 2,
    text: 'ورودی',
    value: 'INCOMING',
  },
];

const searchData = () => [
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
    name: 'voipCallId',
    title: 'کد تماس',
    type: 'input',
  },
  {
    name: 'phoneNumber',
    title: 'شماره موبایل',
    type: 'input',
  },
  {
    name: 'callerLevantId',
    title: 'شناسه لوانت',
    type: 'input',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'input',
  },
  {
    name: 'voipStatusType',
    title: 'وضعیت تماس',
    type: 'dropDown',
    data: voipStatus.map(type => ({
      value: type.value,
      text: type.text,
    })),
    mode: 'default',
  },
  {
    name: 'callType',
    title: 'نوع تماس',
    type: 'dropDown',
    data: callTypeEnum.map(type => ({
      value: type.value,
      text: type.text,
    })),
  },
];

export default searchData;
