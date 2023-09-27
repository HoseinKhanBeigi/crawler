import {
  taskManagementPriorityType,
  taskManagementStatusType,
} from '../../utils/taskManagment';

function renderCrmUserInfo(crmUsers) {
  return crmUsers?.map(a => ({
    key: a.id,
    text: `${a.fullName}`,
    value: a.levantId,
  }));
}

const searchData = (crmUsers, tags) => [
  {
    name: 'createdDateFrom',
    title: 'از تاریخ',
    type: 'fromDateTime',
  },
  {
    name: 'createdDateTo',
    title: 'تا تاریخ',
    type: 'toDateTime',
  },
  {
    name: 'dueDateFrom',
    title: 'مهلت انجام از',
    type: 'fromDateTime',
  },
  {
    name: 'dueDateTo',
    title: 'مهلت انجام تا',
    type: 'toDateTime',
  },
  {
    name: 'code',
    title: 'کد تسک',
    type: 'input',
  },
  {
    name: 'creatorLevantId',
    title: 'ایجاد کننده',
    type: 'dropDown',
    data: renderCrmUserInfo(crmUsers)?.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'assigneeLevantId',
    title: 'محول شده به',
    type: 'dropDown',
    data: renderCrmUserInfo(crmUsers)?.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'title',
    title: 'عنوان تسک',
    type: 'input',
  },
  {
    name: 'taskManagementPriority',
    title: 'اولویت',
    type: 'dropDown',
    data: taskManagementPriorityType,
  },
  {
    name: 'tagIds',
    title: 'برچسب',
    type: 'select',
    data: tags?.map(tag => ({
      label: tag?.name,
      value: tag?.id,
    })),
    mode: 'multiple',
  },
  {
    name: 'taskManagementStatus',
    title: 'وضعیت',
    type: 'dropDown',
    data: taskManagementStatusType,
  },
];

export default searchData;
