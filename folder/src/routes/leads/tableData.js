export const stat = [
  {
    key: 1,
    text: 'جدید',
    value: 'NEW',
  },
  {
    key: 2,
    text: 'باز',
    value: 'OPEN',
  },
  {
    key: 3,
    text: 'متصل',
    value: 'CONNECTED',
  },
  {
    key: 4,
    text: 'دور انداختنی',
    value: 'JUNK',
  },
  {
    key: 5,
    text: 'واجد شرایط',
    value: 'QUALIFIED',
  },
  {
    key: 6,
    text: 'فاقد صلاحیت',
    value: 'UNQUALIFIED',
  },
];

export const type = [
  {
    key: 1,
    text: 'شخص',
    value: 'PERSON',
  },
  {
    key: 2,
    text: 'شرکت',
    value: 'BUSINESS',
  },
];

export const leadChannelType = [
  {
    key: 1,
    text: 'اپلیکیشن',
    value: 'APPLICATION',
  },
  {
    key: 2,
    text: 'وارد کردن سرنخ بصورت دستی',
    value: 'IMPORT',
  },
  {
    key: 3,
    text: 'ورود سرنخ بصورت گروهی با فایل اکسل',
    value: 'IMPORT_WITH_EXCEL',
  },
  {
    key: 4,
    text: 'ورود سیستمی ویپ',
    value: 'SYSTEM_VOIP',
  },
  {
    key: 5,
    text: 'ورود دستی ویپ',
    value: 'MANUAL_VOIP',
  },
];
export const searchData = (allUsers, tags) => [
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
    title: 'نوع',
    name: 'leadType',
    type: 'dropDown',
    data: type,
    mode: 'default',
  },
  {
    title: 'نوع ثبت',
    name: 'leadGenerationChannel',
    type: 'dropDown',
    data: leadChannelType,
    mode: 'default',
  },
  {
    title: 'وضعیت',
    name: 'leadStatus',
    type: 'dropDown',
    data: stat,
    mode: 'default',
  },
  {
    title: 'برچسب',
    name: 'tagId',
    type: 'dropDown',
    data: tags.map(tag => ({
      value: tag.id,
      text: tag.name,
    })),
    mode: 'default',
  },
  {
    title: 'اختصاص داده شده به',
    name: 'assignTo',
    type: 'dropDown',
    data: allUsers?.map(user => ({
      value: user.levantId,
      text: `${user.firstName} ${user.lastName}`,
    })),
    mode: 'multiple',
  },
];
