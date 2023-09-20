import React from 'react';
import * as Yup from 'yup';
import { AutoComplete, Icon } from 'antd';
import { taskManagementPriorityType } from '../../utils/taskManagment';

const { Option } = AutoComplete;

const renderOptions = (item, setSelectedEmployee) => (
  <Option
    key={item.levantId}
    text={item.fullName}
    value={item.levantId}
    onClick={() => {
      setSelectedEmployee(item);
    }}
  >
    <div className="global-search-item">
      <span className="global-search-item-desc">{item.fullName}</span>
    </div>
  </Option>
);

export const schema = (
  onFilePreview,
  customRequest,
  searchEmployeeHandler,
  searchEmployeeResult,
  selectedEmployee,
  setSelectedEmployee,
  isSelectDueDateChange,
  setIsSelectDueDateChange,
  defaultFileList,
  hasDefault,
) => {
  const form = [
    {
      name: 'assigneeLevantId',
      type: 'autocomplete',
      label: 'کار را محول کن به:',
      validation: Yup.string().required('این فیلد اجباری است'),
      onSearch: searchEmployeeHandler,
      dataSource: searchEmployeeResult.map(item =>
        renderOptions(item, setSelectedEmployee),
      ),
      suffix: <Icon type="search" />,
      hasDescription: selectedEmployee?.fullName,
      descriptionProp: [
        { title: 'نام و نام خانوادگی', value: selectedEmployee?.fullName },
      ],
      config: {
        visible: true,
        required: true,
        placeholder: 'جستجو...',
        grid: 24,
      },
    },
    {
      name: 'title',
      type: 'input',
      label: 'عنوان کار',
      validation: Yup.string().required('این فیلد اجباری است'),
      config: {
        required: true,
        placeholder: 'عنوان کار را اینجا بنویسید',
        grid: 12,
      },
    },
    {
      name: 'taskManagementPriority',
      label: 'اولویت',
      validation: Yup.string().required('این فیلد اجباری است'),
      type: 'select',
      data: taskManagementPriorityType?.map(type => ({
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
      name: 'description',
      type: 'textarea',
      label: 'توضیح',
      validation: Yup.string().required('این فیلد اجباری است'),
      config: {
        required: false,
        placeholder: 'جزئیات تماس را اینجا بنویسید',
        grid: 24,
      },
    },
  ];
  form.push(
    {
      name: 'dueConvertedDate',
      label: 'تاریخ مهلت انجام',
      type: 'date',
      onChange: setIsSelectDueDateChange,
      validation: Yup.string().required('این فیلد اجباری است'),
      config: {
        required: true,
        grid: 12,
        placeholder: 'انتخاب تاریخ',
      },
    },
    {
      name: 'dueTime',
      label: 'زمان مهلت انجام',
      type: 'time',
      validation: Yup.string(),
      config: {
        required: false,
        grid: 12,
        disabled: !isSelectDueDateChange,
        placeholder: 'انتخاب زمان',
      },
    },
  );

  form.push({
    name: 'attachmentUrl',
    type: 'file',
    uploadLabel: 'افزودن فایل ضمیمه',
    onPreview: onFilePreview,
    customRequest,
    defaultFileList,
    hasDefault,
    config: {
      grid: 24,
      listType: 'picture',
      multiple: false,
    },
  });
  return form;
};
