const kycStatuses = [
  { text: 'دریافت اطلاعات', value: 'PERSONAL_INFO' },
  { text: 'ارسال سلفی', value: 'IMAGE' },
  { text: 'ارسال ویدیو', value: 'VIDEO' },
  { text: 'ارسال امضا', value: 'SIGNATURE' },
  { text: 'در انتظار بررسی', value: 'SUBMITTED' },
  { text: 'تایید شده', value: 'APPROVED' },
  { text: 'رد شده', value: 'REJECTED' },
];

const searchSchema = ({ products, kycType }) => [
  {
    name: 'createDateFrom',
    title: 'تاریخ ثبت (از تاریخ)',
    type: 'date',
    pickTime: false,
    grid: {
      xl: 3,
      lg: 3,
      md: 4,
      sm: 6,
      xs: 12,
    },
  },
  {
    name: 'createDateTo',
    title: 'تاریخ ثبت (تا تاریخ)',
    type: 'date',
    pickTime: false,
    grid: {
      xl: 3,
      lg: 3,
      md: 4,
      sm: 6,
      xs: 12,
    },
  },
  ...(kycType === 'sejam'
    ? [
        {
          name: 'traceCodeSejami',
          title: 'کد ۱۰ رقمی سجام',
          type: 'input',
          placeholder: 'کد ۱۰ رقمی سجام را وارد کنید',
        },
        {
          name: 'productCode',
          title: 'محصول',
          type: 'select',
          data: products?.map(p => ({ value: p.code, text: p.title })),
        },
      ]
    : []),
  {
    name: 'firstName',
    title: 'نام',
    type: 'input',
    placeholder: 'نام را وارد کنید',
  },
  {
    name: 'lastName',
    title: 'نام خانوادگی',
    type: 'input',
    placeholder: 'نام خانوادگی را وارد کنید',
  },
  {
    name: 'mobilePhone',
    title: 'شماره تماس',
    type: 'input',
    placeholder: 'شماره تماس را وارد کنید',
  },
  {
    name: 'nationalCode',
    title: 'کد ملی',
    type: 'input',
    placeholder: 'کد ملی را وارد کنید',
  },
  {
    name: 'tryCount',
    title: 'تعداد تلاش',
    type: 'input',
    placeholder: 'تعداد تلاش را وارد کنید',
  },
  {
    name: 'levantId',
    title: 'شناسه لوانت',
    type: 'input',
    placeholder: 'شناسه لوانت را وارد کنید',
  },
  {
    name: 'status',
    title: 'وضعیت',
    type: 'dropDown',
    data: kycStatuses,
  },
];

export default searchSchema;
