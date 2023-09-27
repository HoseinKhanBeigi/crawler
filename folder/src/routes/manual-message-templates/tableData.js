import React from 'react';
import { Icon, Tooltip, Typography } from 'antd';
import convertToJalaliDate from '../../utils/date';
import TruncateString from '../../components/KianTable/renderer/TruncateString';

const { Text } = Typography;

const messageStatus = status =>
  status === 'ACTIVE' ? (
    <Text strong>فعال</Text>
  ) : (
    <Text disabled> غیرفعال </Text>
  );

export const MessageTypeEnum = {
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  EMAIL: 'EMAIL',
  CALL: 'CALL',
  CASE: 'CASE',
  SESSION: 'SESSION',
};

export const messageType = type => {
  switch (type) {
    case MessageTypeEnum.SMS:
      return 'پیامک';
    case MessageTypeEnum.WHATSAPP:
      return 'واتس‌اپ';
    case MessageTypeEnum.EMAIL:
      return 'ایمیل';
    case MessageTypeEnum.CALL:
      return 'تماس';
    case MessageTypeEnum.CASE:
      return 'درخواست';
    case MessageTypeEnum.SESSION:
      return 'جلسه';
    default:
      return 'نامشخص';
  }
};

export const columns = [
  {
    title: 'موضوع',
    dataIndex: 'title',
    render: (value, data) => (
      <span>
        {!!data.attachmentToken && (
          <Tooltip title="بهمراه فایل">
            <Icon style={{ color: '#9A9A9A', paddingLeft: 3 }} type="file" />
          </Tooltip>
        )}
        {TruncateString(value)}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: 'متن',
    dataIndex: 'content',
    render: value => TruncateString(value),
    ellipsis: true,
  },
  {
    title: 'نوع',
    dataIndex: 'type',
    render: messageType,
    ellipsis: true,
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'createdDateTime',
    render: date => convertToJalaliDate(date),
    ellipsis: true,
  },
  {
    title: 'ایجاد کننده',
    dataIndex: 'createdByName',
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: messageStatus,
    width: 60,
    ellipsis: true,
  },
];

export const searchData = [
  {
    name: 'title',
    title: 'موضوع',
    type: 'select',
  },
  {
    name: 'content',
    title: 'متن',
    type: 'select',
  },
  {
    name: 'type',
    title: 'نوع',
    type: 'dropDown',
    data: [
      {
        value: MessageTypeEnum.EMAIL,
        text: 'ایمیل',
      },
      {
        value: MessageTypeEnum.SMS,
        text: 'پیامک',
      },
      {
        value: MessageTypeEnum.WHATSAPP,
        text: 'واتس‌اپ',
      },
      {
        value: MessageTypeEnum.CALL,
        text: 'تماس',
      },
      {
        value: MessageTypeEnum.CASE,
        text: 'درخواست',
      },
      {
        value: MessageTypeEnum.SESSION,
        text: 'جلسات',
      },
    ],
  },
  {
    name: 'status',
    title: 'وضعیت',
    type: 'dropDown',
    data: [
      {
        value: 'ACTIVE',
        text: 'فعال',
      },
      {
        value: 'DEACTIVE',
        text: 'غیرفعال',
      },
    ],
  },
];
