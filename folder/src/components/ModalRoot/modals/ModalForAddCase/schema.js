import * as Yup from 'yup';
import { casePriorityType, caseStatusType } from '../../../../utils/caseTypes';

export const schema = (
  applications,
  crmLeadUsers,
  onFilePreview,
  customRequest,
  templates,
) => {
  const form = [
    {
      name: 'subject',
      type: 'input',
      label: 'عنوان درخواست',
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
        required: true,
        placeholder: 'عنوان تماس را اینجا بنویسید',
        grid: 12,
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
        label: `${a.fullName}`,
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
      onPreview: onFilePreview,
      customRequest,
      config: {
        grid: 24,
        listType: 'picture',
        multiple: false,
      },
    },
  ];
  return form;
};
