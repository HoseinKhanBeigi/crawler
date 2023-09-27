import convertToJalaliDate from '../../utils/date';
import {
  caseStatusTranslatedType,
  casePriorityTranslatedType,
} from '../../utils/caseTypes';

export const columns = [
  {
    title: 'مبدا',
    dataIndex: 'caseInputType',
    render: type =>
      type === 'MANUAL' ? 'دستی' : type === 'SYSTEM' ? 'سیستمی' : '---',
    ellipsis: true,
  },
  {
    title: 'کد درخواست',
    dataIndex: 'caseCode',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'عنوان',
    dataIndex: 'subject',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'caseStatusType',
    render: value => caseStatusTranslatedType[value] || '---',
    ellipsis: true,
  },
  {
    title: 'اولویت',
    dataIndex: 'casePriorityType',
    render: value => casePriorityTranslatedType[value] || '---',
    ellipsis: true,
  },
  {
    title: 'مشتری',
    dataIndex: 'caseOwnerFullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'کاربر',
    dataIndex: 'caseAssignFullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'گزارش دهنده',
    dataIndex: 'caseReporterFullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'timeDate',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: true,
  },
];
