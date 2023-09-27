import React from 'react';
import UnitStatusTag from '../../../../components/Unit/components/UnitStatusTag/UnitStatusTag';
import convertToJalaliDate from '../../../../utils/date';

const operationManagementTableSchema = [
  {
    title: 'نام شعبه',
    dataIndex: 'name',
  },
  {
    title: 'کد شعبه',
    dataIndex: 'code',
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: status => <UnitStatusTag status={status} />,
  },
  {
    title: 'آخرین تغییرات',
    dataIndex: 'lastModifiedDateTime',
    render: date => convertToJalaliDate(date) || '---',
  },
];

export default operationManagementTableSchema;
