import convertToJalaliDate from '../../../../../utils/date';

const sessionTypeList = [
  {
    value: 'PLANNED',
    name: 'برنامه ریزی شده',
  },
  {
    value: 'HELD',
    name: 'برگزار شده',
  },
  {
    value: 'NOT_HELD',
    name: 'لغو شده',
  },
];

export const itemsList = sessionData => [
  {
    title: 'عنوان جلسه',
    data: sessionData?.name,
    type: 'string',
  },
  {
    title: 'مدعوین جلسه (مشتریان)',
    data: sessionData?.sessionFors?.map(d => `${d.firstName} ${d.lastName}`),
    type: 'tag',
  },
  {
    title: 'نوع جلسه',
    data: sessionData?.sessionTypeTitle,
    type: 'string',
  },
  {
    title: 'وضعیت',
    data: sessionTypeList.reduce(
      (status, type) =>
        type.value === sessionData?.sessionStatus ? type.name : status,
      '',
    ),
    type: 'string',
  },
  {
    title: 'برگزار کننده (کارشناس فروش)',
    data: `${sessionData?.planners[0].firstName} ${sessionData?.planners[0].lastName}`,
    type: 'string',
  },
  {
    title: 'ایجاد کننده',
    data: `${sessionData?.creator.firstName} ${sessionData?.creator.lastName}`,
    type: 'string',
  },
  {
    title: 'تاریخ برگزاری',
    data: convertToJalaliDate(sessionData?.startDate),
    type: 'string',
  },
  {
    title: 'ساعت برگزاری',
    data: `${convertToJalaliDate(
      sessionData?.endDate,
      'HH:mm',
    )} ~ ${convertToJalaliDate(sessionData?.startDate, 'HH:mm')}`,
    type: 'string',
  },
  {
    title: 'شرکت ‌کنندگان (اعضای سازمان)',
    data: sessionData?.attendees.map(d => `${d.firstName} ${d.lastName}`),
    type: 'tag',
  },
  {
    title: 'اطلاع رسانی',
    data: sessionData?.attendeesNotify ? 'اطلاع رسانی شده' : 'اطلاع رسانی نشده',
    type: 'string',
  },
  {
    title: 'توضیحات',
    data: sessionData?.description,
    type: 'string',
  },
];
