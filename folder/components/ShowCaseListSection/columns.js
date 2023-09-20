import {
  caseStatusTranslatedType,
  casePriorityTranslatedType,
} from '../../utils/caseTypes';

export const columns = [
  {
    title: 'عنوان',
    dataIndex: 'subject',
  },
  {
    title: 'وضعیت',
    dataIndex: 'caseStatusType',
    render: value => caseStatusTranslatedType[value] || '---',
  },
  {
    title: 'اولویت',
    dataIndex: 'casePriorityType',
    render: value => casePriorityTranslatedType[value] || '---',
  },
];
