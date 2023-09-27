import {
  getActionOption,
  getActivitySourceOption,
} from '../../utils/getActivityOptions';

export const crmSearchData = (actionTypes, isUserActivityList, crmUsers) => {
  const activitiesInProfileSearchData = [
    // {
    //   name: 'followUp',
    //   title: 'نیاز به پیگیری',
    //   type: 'dropDown',
    //   data: getFollowUpSourcesOption(),
    // },
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
      name: 'activitySource',
      title: 'سامانه مرجع',
      type: 'dropDown',
      data: actionTypes ? getActivitySourceOption() : null,
    },
  ];
  if (!isUserActivityList) {
    return commonSearchData;
  }
  return commonSearchData.concat(activitiesInProfileSearchData);
};
export const userActivitiesSearchData = actionTypes => [
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
    name: 'activitySource',
    title: 'سامانه مرجع',
    type: 'dropDown',
    data: actionTypes ? getActivitySourceOption() : null,
  },
];
