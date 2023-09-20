import { voipStatus } from '../../utils/voipTypes';

const searchData = messagesData => [
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
    name: 'type',
    title: 'نوع',
    type: 'dropDown',
    data: messagesData(),
  },
  {
    name: 'levantId',
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
    data: messagesData(),
  },
];

export default searchData;
