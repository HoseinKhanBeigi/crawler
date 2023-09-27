import React from 'react';
import mapDataToActions from '../../../../components/ModalForEntityActivityTabMoreDetail/helper';
import Row from '../../../../components/CrmActivityTable/tableDataComponents/Row';
import DateTime from '../../../../components/CrmActivityTable/tableDataComponents/DateTime';
import {
  getActionOption,
  getAppSourceOption,
  getActivitySourceOption,
  getFollowUpSourcesOption,
} from '../../../../utils/getActivityOptions';

const status = {
  SUCCESSFUL: 'موفق',
  FAILED: 'ناموفق',
  UNSUCCESSFUL: 'ناموفق',
};

const moreDetails = data => {
  if (!data) {
    return '';
  }
  const model = mapDataToActions.find(
    item => item.action === data?.activityDto?.action,
  );
  return model?.content.map(item => {
    if (item.code === 'dateTime') {
      return '';
    }
    const key = item.faName;
    return <Row label={key} item={item} data={data} key={key} />;
  });
};

export const crmSearchData = (actionTypes, crmUsers) => {
  const activitiesInProfileSearchData = [
    {
      name: 'followUp',
      title: 'نیاز به پیگیری',
      type: 'dropDown',
      data: getFollowUpSourcesOption(),
    },
    {
      name: 'sourceActor',
      title: 'ایجاد کننده',
      type: 'dropDown',
      data: crmUsers?.map(user => ({
        value: user.levantId,
        text: `${user.fullName}`,
      })),
    },
  ];

  const commonSearchData = [
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
      name: 'actions',
      title: 'فعالیت',
      type: 'dropDown',
      mode: 'multiple',
      data: actionTypes ? getActionOption(actionTypes) : null,
    },
    {
      name: 'applicationName',
      title: 'نام برنامه',
      type: 'dropDown',
      data: actionTypes ? getAppSourceOption() : null,
    },
    {
      name: 'activitySource',
      title: 'سامانه مرجع',
      type: 'dropDown',
      data: actionTypes ? getActivitySourceOption() : null,
    },
  ];
  return commonSearchData.concat(activitiesInProfileSearchData);
};

export const generateCrmColumns = actions => [
  {
    title: 'نوع فعالیت',
    dataIndex: 'activityDto.action',
    render: action => (actions !== null ? actions[action] : action),
    ellipsis: true,
  },
  {
    title: 'سامانه مرجع',
    dataIndex: 'activityDto.activitySource',
    ellipsis: true,
  },
  {
    title: 'تاریخ',
    dataIndex: 'activityDto.dateTime',
    render: text => <DateTime text={text} /> || '---',
    ellipsis: true,
  },
  {
    title: 'نام ایجاد کننده',
    dataIndex: 'actorFamilyName',
    render: (text, record) =>
      record.actorName ? (
        <span>{`${record.actorName || '---'} ${record.actorFamilyName ||
          '---'}`}</span>
      ) : (
        'سیستمی'
      ),
    ellipsis: true,
  },
  {
    title: 'جزییات بیشتر',
    dataIndex: 'activityDto.id',
    render: (text, record) => moreDetails(record),
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'activityDto.activityResult',
    render: text => (text ? <span>{status[text]}</span> : '---'),
    ellipsis: true,
  },
];

export const searchData = actionTypes => [
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
    name: 'actions',
    title: 'فعالیت',
    type: 'dropDown',
    mode: 'multiple',
    data: getActionOption(actionTypes),
  },
  {
    name: 'applicationName',
    title: 'نام برنامه',
    type: 'dropDown',
    data: getAppSourceOption(),
  },
  {
    name: 'activitySource',
    title: 'سامانه مرجع',
    type: 'dropDown',
    data: getActivitySourceOption(),
  },
];
