import convertToJalaliDate from '../../../../../utils/date';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';

export const itemsList = data => [
  {
    title: 'نام محصول',
    data: data?.name,
    type: 'string',
  },
  {
    title: 'شناسه محصول',
    data: data?.id,
    type: 'string',
  },
  {
    title: 'بهای محصول',
    data: data?.productPrice
      ? `${toCommaSeparatedNumber(data?.productPrice)} ریال`
      : '---',
    type: 'string',
  },
  {
    title: 'تاریخ آخرین ویرایش',
    data: data?.lastModifiedDate
      ? convertToJalaliDate(data?.lastModifiedDate)
      : '---',
    type: 'string',
  },
  {
    title: 'توضیحات',
    data: data?.description,
    type: 'string',
  },
];
