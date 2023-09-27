import React from 'react';
import { Icon, Tooltip, Typography } from 'antd';
import {
  MODAL_FOR_REJECTION_REASON,
  MODAL_FOR_SHOW_MEETING_DETAILS,
} from '../../components/ModalRoot/repository';
import LinkToProfile from '../../components/KianTable/renderer/LinkToProfile';
import OpportunityActionButtons from '../../components/KianTable/renderer/OpportunityActionButtons';
import convertToJalaliDate from '../../utils/date';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import Link from '../../components/Link';

const { Text } = Typography;
export const columns = (actionHandler, showModalAction) => [
  {
    title: 'شناسه لوانت',
    dataIndex: 'levantId',
    key: 'levantId',
    render: LinkToProfile,
    sorter: false,
    ellipsis: true,
  },
  {
    title: 'نام',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: false,
    render: (text, record) => (
      <span>
        {record.rejected && (
          <Tooltip title="ریجکت شده">
            <Icon
              style={{ color: 'red', cursor: 'pointer' }}
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
        )}{' '}
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
    key: 'lastName',
    sorter: false,
    render: (text, record) =>
      record.startOnboardingFor === 'PARENTS' ? (
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
    title: 'عملیات',
    dataIndex: 'levantId',
    key: 'actions',
    width: 100,
    sorter: false,
    render: (action, opportunity) => {
      const { actions } = opportunity;
      const allActions = [...actions];
      const isLastPipeline = actions.find(
        item => item.code === 'VISITING_USER',
      );
      if (isLastPipeline) {
        allActions.push({
          id: 999,
          name: 'چاپ مجدد فرم',
          code: 'PRINT_FORM',
          description: null,
        });
      }
      return (
        <OpportunityActionButtons
          actions={allActions}
          opportunity={opportunity}
          actionHandler={actionHandler}
        />
      );
    },
    ellipsis: true,
  },
  ...(resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'IRANCR'
    ? [
        {
          title: 'نام نهاد',
          dataIndex: 'company',
          render: value => value?.name || '---',
          sorter: false,
          ellipsis: true,
        },
      ]
    : []),
  {
    title: 'شماره همراه',
    dataIndex: 'authorizedMobile',
    key: 'authorizedMobile',
    render: value => (value ? <Text copyable>{value}</Text> : '---'),
    sorter: false,
    ellipsis: true,
  },
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
    key: 'nationalCode',
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
    render: date => (
      <span>
        {date?.day > 0 && `${date?.day} روز`}
        {date?.hour > 0 && date?.day > 0 && ' و '}
        {date?.hour > 0 && `${date?.hour} ساعت `}
      </span>
    ),
    sorter: false,
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'opportunityStatus',
    key: 'opportunityStatus',
    sorter: false,
    ellipsis: true,
  },
];

export const searchData = [
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
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'select',
  },
  {
    name: 'phoneNO',
    title: 'شماره موبایل',
    type: 'select',
  },
  {
    name: 'levantId',
    title: 'شناسه لوانت',
    type: 'select',
  },
];
