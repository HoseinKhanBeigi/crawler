import {
  caseStatusTranslatedType,
  casePriorityTranslatedType,
} from '../../utils/caseTypes';

export const schema = (
  caseStatusType,
  casePriorityType,
  channel,
  caseType,
  caseAssignee,
  description,
) => [
  {
    name: 'caseStatusType',
    label: 'وضعیت',
    type: 'input',
    value: caseStatusTranslatedType[caseStatusType],
    config: {
      grid: 12,
      disabled: true,
    },
  },
  {
    name: 'casePriorityType',
    label: 'اولویت',
    type: 'input',
    value: casePriorityTranslatedType[casePriorityType],
    config: {
      grid: 12,
      disabled: true,
    },
  },
  {
    name: 'caseType',
    label: 'نوع',
    type: 'input',
    value: caseType?.title,
    config: {
      grid: 24,
      disabled: true,
    },
  },
  {
    name: 'caseAssignFullName',
    label: 'تخصیص داده شده به',
    type: 'input',
    value: caseAssignee,
    config: {
      grid: 12,
      disabled: true,
    },
  },
  {
    name: 'channel',
    label: 'کانال ورودی',
    type: 'input',
    value: channel?.title,
    config: {
      grid: 12,
      disabled: true,
    },
  },
  {
    name: 'description',
    label: 'توضیحات',
    type: 'textarea',
    value: description,
    config: {
      grid: 24,
      disabled: true,
    },
  },
];
