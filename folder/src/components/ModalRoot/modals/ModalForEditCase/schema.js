import * as Yup from 'yup';

import { caseStatusType, casePriorityType } from '../../../../utils/caseTypes';

export const caseSystem = (crmUsers, callTypes) => [
  {
    name: 'caseAssignLevantId',
    label: 'کاربر',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: crmUsers?.map(user => ({
      value: user.levantId,
      label: `${user.fullName}`,
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
    data: caseStatusType?.map(type => ({
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
    name: 'casePriorityType',
    label: 'اولویت',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
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
    name: 'caseType',
    label: 'نوع',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
    data: callTypes?.map(type => ({
      value: type.code,
      label: type.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
];

export const caseManual = (
  callTypes,
  applications,
  crmUsers,
  onFilePreview,
  customRequest,
  defaultFileList,
  hasDefault = false,
) => [
  {
    name: 'subject',
    label: 'موضوع درخواست',
    type: 'input',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      placeholder: 'عنوان درخواست را اینجا بنویسید : ',
      grid: 12,
    },
  },
  {
    name: 'channel',
    label: 'کانال ورودی',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: applications?.map(type => ({
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
    name: 'caseStatusType',
    label: 'وضعیت',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
    data: caseStatusType?.map(type => ({
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
    name: 'caseAssignLevantId',
    label: 'اپراتور',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
    data: crmUsers?.map(user => ({
      value: user.levantId,
      label: `${user.fullName}`,
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
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
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
    name: 'caseType',
    label: 'دلیل درخواست',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: callTypes?.map(type => ({
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
    name: 'description',
    label: 'توضیحات',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'textarea',
    config: {
      required: true,
      grid: 24,
      placeholder: 'جزئیات درخواست را اینجا بنویسید',
    },
  },
  {
    name: 'attachmentUrl',
    type: 'file',
    uploadLabel: 'انتخاب فایل',
    onPreview: onFilePreview,
    hasDefault,
    customRequest,
    defaultFileList,
    config: {
      grid: 24,
      listType: 'picture',
      multiple: false,
    },
  },
];
