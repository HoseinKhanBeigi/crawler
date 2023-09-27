import React from 'react';
import { Icon, Tooltip } from 'antd';
import TruncateString from '../../components/KianTable/renderer/TruncateString';
import MessageStatus from './messageStatus/messageStatus';

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
export const sectionTemplateRender = section => {
  if (section === 'ONBOARDING') {
    return 'آنبوردینگ';
  }
  return 'سی آر ام';
};
export const renderMessageStatus = status => <MessageStatus status={status} />;

export const columns = [
  {
    title: 'کد قالب',
    dataIndex: 'code',
    render: value => TruncateString(value),
  },
  {
    title: 'موضوع',
    dataIndex: 'title',
    render: (value, data) => (
      <span>
        {' '}
        {!!data.attachmentToken && (
          <Tooltip title="بهمراه فایل">
            <Icon
              style={{
                color: '#9A9A9A',
                paddingLeft: 3,
              }}
              type="file"
            />
          </Tooltip>
        )}{' '}
        {TruncateString(value)}{' '}
      </span>
    ),
  },
  {
    title: 'متن',
    dataIndex: 'content',
    render: value => TruncateString(value),
  },
  {
    title: 'مرجع',
    dataIndex: 'templateSection',
    render: sectionTemplateRender,
  },
  {
    title: 'نوع',
    dataIndex: 'type',
    render: messageType,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: renderMessageStatus,
    width: 60,
  },
];

export const searchData = [
  {
    name: 'templateSection',
    title: 'مرجع',
    type: 'dropDown',
    data: [
      {
        value: 'CRM',
        text: 'سی آر ام',
      },
      {
        value: 'ONBOARDING',
        text: 'آنبوردینگ',
      },
    ],
  },
  {
    name: 'title',
    title: 'موضوع',
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
