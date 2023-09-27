import React from 'react';
import LinkToProfile from '../../components/KianTable/renderer/LinkToProfile';
import RenderStatus from './components/RenderStatus/RenderStatus';
import RenderStatusTag from './components/RenderStatusTag';
import convertToJalaliDate from '../../utils/date';

export const columns = ({ aggregate, kycType }) => [
  {
    title: 'شناسه لوانت',
    dataIndex: 'levantId',
    render: LinkToProfile,
    ellipsis: true,
  },
  {
    title: 'نام و نام خانوادگی',
    dataIndex: 'lastName',
    render: (f, record) =>
      `${record.firstName || '---'} ${record.lastName || '---'}`,
    ellipsis: true,
  },
  {
    title: 'تلفن تماس',
    dataIndex: 'mobilePhone',
    render: value => value || '---',
    ellipsis: true,
  },
  ...(kycType === 'sejam'
    ? [
        {
          title: 'کد ۱۰ رقمی سجام',
          dataIndex: 'traceCodeSejami',
          render: value => value || '---',
          ellipsis: true,
        },
        {
          title: 'محصول',
          dataIndex: 'productName',
          render: value => value || '---',
          ellipsis: true,
        },
        {
          title: 'زمان باقی مانده',
          dataIndex: 'customIndex',
          render: (_, row) => {
            const secsPassedSinceCreatedDate = Math.floor(
              (new Date().getTime() - new Date(row.createdDate).getTime()) /
                1000,
            );
            const dayInSeconds = 24 * 60 * 60;

            const timeRemaining = dayInSeconds - secsPassedSinceCreatedDate;

            const isLessThanADay = timeRemaining > 0;
            const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = Math.floor(timeRemaining % 60);
            const isLessThanAHour = hours < 1;
            const time = [hours, minutes, seconds];
            return isLessThanADay ? (
              <p style={{ color: isLessThanAHour ? '#ff5252' : '#f48d25' }}>
                {time.map(num => `${num}`.padStart(2, '0')).join(':')}
              </p>
            ) : (
              '---'
            );
          },
          ellipsis: true,
        },
      ]
    : []),
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'نتیجه بررسی هوش مصنوعی',
    dataIndex: 'kycVideoResult',
    render: f => <RenderStatus videoKycResult={f} />,
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: value => <RenderStatusTag status={value} />,
    ellipsis: true,
  },
  {
    title: 'تاریخ ثبت',
    dataIndex: 'startDate',
    render: value =>
      `${convertToJalaliDate(value, 'HH:mm:ss')} | ${convertToJalaliDate(
        value,
      )} `,
    ellipsis: true,
  },
  ...(aggregate
    ? [
        {
          title: 'تعداد تلاش',
          dataIndex: 'tryCount',
          render: value => value || '---',
        },
      ]
    : []),
];
