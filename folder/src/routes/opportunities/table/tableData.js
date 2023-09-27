import React from 'react';
import { Icon, Tooltip, Typography, Tag } from 'antd';
import LinkToProfile from '../../../components/KianTable/renderer/LinkToProfile';
import {
  MODAL_FOR_REJECTION_REASON,
  MODAL_FOR_SHOW_MEETING_DETAILS,
} from '../../../components/ModalRoot/repository';
import convertToJalaliDate from '../../../utils/date';
import Link from '../../../components/Link';
import OpportunityActionButtons from '../../../components/KianTable/renderer/OpportunityActionButtons';

const { Text } = Typography;
export const columns = (
  showModalAction,
  pipelines = [],
  actionHandler,
  selectedProduct,
) => {
  const cols = [
    {
      title: 'شناسه لوانت',
      dataIndex: 'levantId',
      render: LinkToProfile,
      sorter: false,
      ellipsis: true,
    },
    {
      title: 'نام',
      dataIndex: 'firstName',
      sorter: false,
      render: (text, record) => (
        <span>
          {record.rejected && (
            <Tooltip title="ریجکت شده">
              <Icon
                style={{ color: 'red', cursor: 'pointer', paddingLeft: 5 }}
                type="stop"
                onClick={e => {
                  e.stopPropagation();
                  showModalAction({
                    type: MODAL_FOR_REJECTION_REASON,
                    props: {
                      data: record,
                    },
                  });
                }}
              />
            </Tooltip>
          )}
          {record.meetingSet && (
            <Tooltip title="نمایش جزئیات قرار ملاقات">
              <Icon
                style={{
                  paddingLeft: '5px',
                  fontSize: '14px',
                  verticalAlign: 'middle',
                }}
                type="schedule"
                theme="twoTone"
                onClick={e => {
                  e.stopPropagation();
                  showModalAction({
                    type: MODAL_FOR_SHOW_MEETING_DETAILS,
                    props: {
                      currentUser: record,
                    },
                  });
                }}
              />
            </Tooltip>
          )}
          {text}
        </span>
      ),
      ellipsis: true,
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'lastName',
      sorter: false,
      render: (text, record) =>
        record?.startOnboardingFor === 'PARENTS' ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {text}
            <Tooltip title="مشاهده حساب کاربری ولی">
              <Link to={`/lead/${record?.authorizedLevantId}`} target>
                <b>
                  <Icon
                    type="team"
                    style={{ color: '#0086ff', cursor: 'pointer' }}
                  />
                </b>
              </Link>{' '}
            </Tooltip>
          </div>
        ) : (
          text
        ),
      ellipsis: true,
    },
    {
      title: 'نام محصول',
      dataIndex: 'requestedProductGroupTitle',
      render: value =>
        value ? <Tag style={{ margin: '0' }}>{value}</Tag> : '---',
      sorter: false,
      ellipsis: true,
    },
    {
      title: 'عملیات',
      dataIndex: 'actions',
      width: 100,
      sorter: false,
      render: (actions, opportunity) => (
        <OpportunityActionButtons
          actions={actions}
          opportunity={opportunity}
          actionHandler={actionHandler}
        />
      ),
      ellipsis: true,
    },
    {
      title: 'شماره همراه',
      dataIndex: 'authorizedMobile',
      render: value => (value ? <Text copyable>{value}</Text> : '---'),
      sorter: false,
      ellipsis: true,
    },
    {
      title: 'کد ملی',
      dataIndex: 'nationalCode',
      sorter: false,
      ellipsis: true,
    },
    {
      title: 'اپراتور',
      dataIndex: 'ownerFullName',
      sorter: false,
      render: value =>
        value || <span style={{ color: '#cecece' }}>فاقد نام اپراتور</span>,
      ellipsis: true,
    },
    {
      title: 'تاریخ ایجاد',
      dataIndex: 'createdDate',
      render: date => convertToJalaliDate(date),
      ellipsis: true,
    },
    {
      title: 'تاریخ ویرایش',
      dataIndex: 'lastModifiedDate',
      render: date => convertToJalaliDate(date),
      ellipsis: true,
    },
    {
      title: 'مدت زمان',
      dataIndex: 'elapsedDate',
      sorter: false,
      render: date => (
        <span>
          {date?.day > 0 && `${date?.day} روز`}
          {date?.hour > 0 && date?.day > 0 && ' و '}
          {date?.hour > 0 && `${date?.hour} ساعت `}
        </span>
      ),
      ellipsis: true,
    },
    {
      title: 'وضعیت',
      dataIndex: 'opportunityStatus',
      sorter: false,
      ellipsis: true,
    },
    {
      title: 'پایپ لاین',
      dataIndex: 'pipelineId',
      sorter: false,
      fixed: 'right',
      width: 100,
      render: id => {
        const pipeline = pipelines.find(p => p.value === id);
        return (
          <div>
            {pipeline ? (
              <Link to={`/opportunities/${pipeline.value}/${pipeline.text}`}>
                {pipeline.text}
              </Link>
            ) : (
              'نا مشخص'
            )}
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: 'مرحله',
      dataIndex: 'currentStageTitle',
      sorter: false,
      fixed: 'right',
      width: 100,
      render: stage => <div>{stage || '-'}</div>,
      ellipsis: true,
    },
  ];

  if (selectedProduct === 'KIAN_BUSINESS')
    cols.splice(0, 1, {
      title: 'نام کسب‌و‌کار',
      dataIndex: 'businessInfo',
      render: v => v.name || '---',
      sorter: false,
      ellipsis: true,
    });
  if (selectedProduct === 'IRANCR_MEMBERSHIP')
    cols.splice(5, 1, {
      title: 'نام نهاد',
      dataIndex: 'company',
      render: v => v.name || '---',
      sorter: false,
      ellipsis: true,
    });

  return cols;
};

export const searchData = (pipelines = []) => [
  {
    name: 'from',
    title: 'از تاریخ ایجاد',
    type: 'fromDateTime',
  },
  {
    title: 'تا تاریخ ایجاد',
    name: 'to',
    type: 'toDateTime',
  },
  {
    name: 'levantId',
    title: 'شناسه لوانت',
    type: 'select',
  },
  {
    name: 'firstName',
    title: 'نام',
    type: 'select',
  },
  {
    name: 'lastName',
    title: 'نام خانوادگی',
    type: 'select',
  },
  {
    name: 'phoneNO',
    title: 'شماره موبایل',
    type: 'select',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'select',
  },
  {
    name: 'pipelineId',
    title: 'پایپ لاین',
    type: 'dropDown',
    data: pipelines.map(p => ({
      key: p.value,
      text: p.text,
      value: p.value,
    })),
  },
  {
    name: 'rejected',
    title: 'بر اساس ریجکت شده',
    type: 'dropDown',
    data: [
      {
        key: 1,
        text: 'ریجکت شده',
        value: true,
      },
      {
        key: 2,
        text: 'ریجکت نشده',
        value: false,
      },
    ],
  },
];
