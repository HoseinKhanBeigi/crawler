import { casePriorityType, caseStatusType } from '../../utils/caseTypes';

function renderCrmUserInfo(crmLeadUsers) {
  return crmLeadUsers.map(a => ({
    key: a.id,
    text: `${a.fullName}`,
    value: a.levantId,
  }));
}

const searchData = (applications, crmLeadUsers, templates) => [
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
    name: 'caseCode',
    title: 'کد درخواست',
    type: 'input',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'input',
  },
  {
    name: 'mobile',
    title: 'موبایل',
    type: 'input',
  },
  {
    name: 'caseOwnerLevantId',
    title: 'شناسه لوانت',
    type: 'input',
  },
  {
    name: 'casePriorityType',
    title: 'اولویت',
    type: 'dropDown',
    data: casePriorityType.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'caseStatusType',
    title: 'وضعیت',
    type: 'dropDown',
    data: caseStatusType.map(type => ({
      text: type.text,
      value: type.value,
    })),
  },
  {
    name: 'caseType',
    title: 'نوع درخواست',
    type: 'dropDown',
    data: templates?.map(type => ({
      text: type.title,
      value: type.code,
    })),
  },
  {
    name: 'caseAssignLevantId',
    title: 'کاربر',
    type: 'dropDown',
    data: renderCrmUserInfo(crmLeadUsers),
  },
  {
    name: 'caseReporterLevantId',
    title: 'گزارش دهنده',
    type: 'dropDown',
    data: renderCrmUserInfo(crmLeadUsers),
  },
  {
    name: 'channel',
    title: 'کانال ورودی',
    type: 'dropDown',
    data: applications.map(a => ({
      key: a.id,
      text: a.title,
      value: a.code,
    })),
  },
];

export default searchData;
