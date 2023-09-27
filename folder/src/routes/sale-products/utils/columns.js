import convertToJalaliDate from '../../../utils/date';
import toCommaSeparatedNumber from '../../../utils/toCommaSeparatedNumber';

const columns = [
  {
    title: 'شناسه محصول',
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: 'نام محصول',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'بهای محصول (ریال)',
    dataIndex: 'productPrice',
    render: value => toCommaSeparatedNumber(value) || '---',
    ellipsis: true,
  },
  {
    title: 'تاریخ آخرین ویرایش',
    dataIndex: 'lastModifiedDate',
    render: value => (value ? convertToJalaliDate(value) : '---'),
    ellipsis: true,
  },
];
export default columns;
