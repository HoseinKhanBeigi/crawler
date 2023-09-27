const statusType = [
  {
    value: 'PLANNED',
    text: 'برنامه ریزی شده',
  },
  {
    value: 'HELD',
    text: 'برگزار شده',
  },
  {
    value: 'NOT_HELD',
    text: 'لغو شده',
  },
];
export const searchData = (
  templates,
  crmUsers,
  handleAttendeesSearch,
  attendeesList,
  handleSessionForSearch,
  sessionForUsersList,
) => [
  {
    name: 'name',
    title: 'عنوان جلسه',
    type: 'input',
  },
  {
    name: 'sessionForLevantIds',
    title: 'مدعوین جلسه (مشتریان)',
    type: 'select',
    mode: 'multiple',
    onSearch: handleSessionForSearch,
    data: sessionForUsersList?.map(u => ({
      label: `${u.firstName || '---'} ${u.lastName || '---'}`,
      value: u.levantId,
    })),
  },
  {
    name: 'sessionTypeId',
    title: 'نوع جلسه',
    type: 'dropDown',
    data: templates.map(d => ({
      value: d.id,
      text: d.title,
    })),
  },
  {
    name: 'plannerLevantId',
    title: 'برگزار کننده (کارشناس فروش)',
    type: 'dropDown',
    data: crmUsers?.map(a => ({
      text: `${a.firstName} ${a.lastName}`,
      value: a.levantId,
    })),
  },
  {
    name: 'sessionStatus',
    title: 'وضعیت',
    type: 'dropDown',
    data: statusType.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'date',
    title: 'تاریخ جلسه',
    type: 'date',
    pickTime: false,
  },
  {
    name: 'attendeesLevantIds',
    title: 'شرکت کنندگان (اعضای سازمان)',
    type: 'select',
    mode: 'multiple',
    onSearch: handleAttendeesSearch,
    data: attendeesList?.map(u => ({
      label: `${u.firstName || '---'} ${u.lastName || '---'}`,
      value: u.levantId,
    })),
  },
];
