import React from 'react';
import { Tag } from 'antd';
import convertToJalaliDate from '../../utils/date';
import { taskManagementStatus } from '../../utils/taskManagment';
import RenderStatusTag from './components/RenderStatusTag';
import MoreList from '../../components/MoreList';

export const columns = [
  {
    title: 'کد کار',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    title: 'زمان ایجاد',
    dataIndex: 'createdDate',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: true,
  },
  {
    title: 'ایجاد کننده',
    dataIndex: 'creatorFirstName',
    render: (creatorFirstName, record) =>
      `${creatorFirstName} ${record.creatorLastName}`,
    ellipsis: true,
  },
  {
    title: 'محول شده به',
    dataIndex: 'assigneeFirstName',
    render: (assigneeFirstName, record) =>
      `${assigneeFirstName} ${record.assigneeLastName}`,
    ellipsis: true,
  },
  {
    title: 'عنوان کار',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: 'اولویت',
    dataIndex: 'taskManagementPriority',
    render: value => <RenderStatusTag status={value} />,
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'taskManagementStatus',
    render: value => taskManagementStatus[value] || '---',
    ellipsis: true,
  },
  {
    title: 'مهلت انجام',
    dataIndex: 'dueDate',
    render: dueDate =>
      dueDate ? convertToJalaliDate(dueDate, 'HH:mm - jYYYY/jMM/jDD ') : '---',
    ellipsis: true,
  },
  {
    title: 'برچسب',
    dataIndex: 'tags',
    render: value =>
      value?.map((item, index) => {
        if (index < 2) {
          return (
            <Tag
              color="#f9f9f9"
              style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
            >
              {item.name}
            </Tag>
          );
        }
        return (
          <MoreList
            style={{ backgroundColor: 'red', border: '1px solid #d9d9d9' }}
            list={value}
            index={index}
            renderContent={tag => (
              <Tag
                color="#f9f9f9"
                style={{
                  color: '#6e6e6e',
                  border: '1px solid #d9d9d9',
                  marginBottom: '3px',
                }}
              >
                {tag.name}
              </Tag>
            )}
          />
        );
      }),
    ellipsis: true,
  },
];
