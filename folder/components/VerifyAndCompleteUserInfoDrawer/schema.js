import * as Yup from 'yup';

export const form = [
  {
    name: 'firstName',
    type: 'label',
    label: 'نام',
    value: 'شروین ',
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'lastName',
    type: 'label',
    label: 'نام خانوادگی',
    value: ' شاهسون',
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'nationalCode',
    type: 'label',
    label: 'کد ملی',
    value: '4660085619',
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'fathername',
    type: 'label',
    label: 'نام پدر',
    value: 'علی',
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'email',
    type: 'label',
    label: 'پست الکترونیکی',
    value: 'b.roozdar@kian.digital',
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'certificateNumber',
    label: 'شماره شناسنامه',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'input',
    config: {
      required: true,
      grid: 24,
      placeholder: 'شماره شناسنامه را وارد کنید',
    },
  },
  {
    name: 'caseType',
    label: 'دلیل درخواست',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
    data: templates?.map(type => ({
      value: type.code,
      label: type.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'casePriorityType',
    label: 'اولویت',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: casePriorityType?.map(type => ({
      value: type.value,
      label: type.text,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'caseStatusType',
    label: 'وضعیت',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: caseStatusType?.map(a => ({
      value: a.value,
      label: a.text,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'channel',
    label: 'کانال ورودی',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: applications?.map(a => ({
      value: a.code,
      label: a.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'caseAssignLevantId',
    label: 'اپراتور',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: crmLeadUsers.map(a => ({
      label: `${a.firstName} ${a.lastName}`,
      value: a.levantId,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'توضیحات',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: false,
      placeholder: 'جزئیات تماس را اینجا بنویسید',
      grid: 24,
    },
  },
  {
    name: 'attachmentUrl',
    type: 'file',
    uploadLabel: 'آپلود فایل ضمیمه',
    customRequest,
    defaultFileList,
    config: {
      grid: 24,
      listType: 'picture-card',
      multiple: false,
    },
  },
];
