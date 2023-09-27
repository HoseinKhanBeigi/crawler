import React from 'react';
import LinkToProfile from '../renderer/LinkToProfile';
import convertToJalaliDate from '../../../utils/date';
import Tags from '../renderer/Tags';

const renderer = col => (text, record) => {
  switch (col.code) {
    case 'levantId': {
      return <LinkToProfile levantId={record.levantId} />;
    }
    case 'createdDate': {
      return convertToJalaliDate(record.createdDate) || 'تاریخ ندارد';
    }
    case 'assignedTags': {
      return (
        <Tags
          data={{ permission: col.permission, type: col.type, ...record }}
        />
      );
    }
    default:
      return text;
  }
};

export default function createDynamicColumns(columns) {
  return columns.map(col => ({
    dataIndex: col.code,
    title: col.name,
    render: renderer(col),
  }));
}
