import React from 'react';
import { Tag } from 'antd';
import convertToJalaliDate from '../../../utils/date';
import MoreList from '../../../components/MoreList';

// here is list of role enum

const sessionStatus = {
  PLANNED: 'برنامه ریزی شده',
  HELD: 'برگزار شده',
  NOT_HELD: 'لغو شده',
};
export const columns = [
  {
    title: 'عنوان جلسه',
    dataIndex: 'name',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'مدعوین جلسه (مشتریان)',
    dataIndex: 'sessionFors',
    render: list =>
      list?.map((item, index) =>
        index < 2 ? (
          <Tag
            color="#f9f9f9"
            style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
          >{`${item?.firstName || '---'} ${item?.lastName || '---'}`}</Tag>
        ) : (
          <MoreList
            list={list}
            index={index}
            renderContent={value => `${value.firstName} ${value.lastName}`}
          />
        ),
      ),
    ellipsis: true,
  },
  {
    title: 'نوع جلسه',
    dataIndex: 'sessionTypeTitle',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'sessionStatus',
    render: value =>
      value ? <Tag color="blue">{sessionStatus[value]}</Tag> : '---',
    ellipsis: true,
  },
  {
    title: 'برگزار کننده (کارشناس فروش)',
    dataIndex: 'planners',
    render: list =>
      list?.map((item, index) =>
        index < 2 ? (
          <Tag
            color="#f9f9f9"
            style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
          >{`${item?.firstName || '---'} ${item?.lastName || '---'}`}</Tag>
        ) : (
          <MoreList
            list={list}
            index={index}
            renderContent={value => `${value.firstName} ${value.lastName}`}
          />
        ),
      ),
    ellipsis: true,
  },
  {
    title: 'شرکت کنندگان (اعضای سازمان)',
    dataIndex: 'attendees',
    render: list =>
      list?.map((item, index) =>
        index < 2 ? (
          <Tag
            color="#f9f9f9"
            style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
          >{`${item?.firstName || '---'} ${item?.lastName || '---'}`}</Tag>
        ) : (
          <MoreList
            list={list}
            index={index}
            renderContent={value => `${value.firstName} ${value.lastName}`}
          />
        ),
      ),
    ellipsis: true,
  },
  {
    title: 'تاریخ برگزاری',
    dataIndex: 'startDate',
    render: value => convertToJalaliDate(value) || '---',
  },
  {
    title: 'ساعت برگزاری',
    dataIndex: 'endDate',
    render: (value, record) =>
      `${convertToJalaliDate(record?.startDate, 'HH:mm')}~${convertToJalaliDate(
        record?.endDate,
        'HH:mm',
      )}` || '---',
    ellipsis: true,
  },
];
