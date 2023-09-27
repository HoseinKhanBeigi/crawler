import convertToJalaliDate from '../../utils/date';
import LinkToProfile from '../../components/KianTable/renderer/LinkToProfile';

export const columns = [
  {
    title: 'شناسه لوانت',
    dataIndex: 'levantId',
    render: value => LinkToProfile(value),
    ellipsis: true,
  },
  {
    title: 'نام و نام خانوادگی',
    dataIndex: 'fullName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'وضعیت فعالیت',
    dataIndex: 'employeeDailyStatus',
    render: value =>
      value === 'OFFWORK' ? 'مرخصی' : value === 'ONDUTY' ? 'آماده کار' : '---',
    ellipsis: true,
  },
  {
    title: 'وضعیت در واحد',
    dataIndex: 'unitEmployeeStatus',
    render: value => (value === 'ACTIVE' ? 'فعال ' : 'غیر فعال '),
    ellipsis: true,
  },
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'نقش',
    dataIndex: 'aclGroupTitle',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'کد سازمانی',
    dataIndex: 'unitCode',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'شهر',
    dataIndex: 'contact.cityName',
    render: value => value || '---',
    ellipsis: true,
  },
  {
    title: 'تاریخ ایجاد کارمند',
    dataIndex: 'createDateTime',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: true,
  },
];
