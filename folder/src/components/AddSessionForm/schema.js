import React from 'react';
import * as Yup from 'yup';
import { AutoComplete, Icon } from 'antd';
import CPToolTip from '../CP/CPTooltip';
import downloadFile from '../../routes/sessions/utils/downloadFile';

const sessionTypeList = [
  {
    value: 'PLANNED',
    label: 'برنامه ریزی شده',
  },
  {
    value: 'HELD',
    label: 'برگزار شده',
  },
  {
    value: 'NOT_HELD',
    label: 'لغو شده',
  },
];

export const rejectionDescription = [
  {
    value: 'true',
    label: 'اطلاع‌رسانی به شرکت‌کنندگان',
  },
];
const { Option } = AutoComplete;

const renderOptions = (item, setSearchDetail) => (
  <Option
    key={item.levantId}
    text={item.fullName}
    value={item.levantId}
    onClick={() => {
      setSearchDetail(item);
    }}
  >
    <div className="global-search-item">
      <span className="global-search-item-desc">{item.fullName}</span>
    </div>
  </Option>
);

export const schema = (
  sessionForUsersList,
  handleSearch,
  sessionTypeTemplates,
  crmFilteredUsers,
  searchDetail,
  setSearchDetail,
  customRequest,
  customRequestProceeding,
  handleSessionSearchFor,
  attendeesList,
  handleAttendeesSearch,
  disabled,
  defaultFileList,
  onRemoveFile,
  withSessionFor,
) => [
  {
    name: 'name',
    type: 'input',
    label: 'عنوان جلسه',
    suffix: (
      <CPToolTip title="حداکثر ۳۲ کارکتر">
        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
      </CPToolTip>
    ),
    validation: Yup.string().required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'عنوان جلسه را وارد کنید',
      grid: 24,
    },
  },
  {
    name: 'sessionStatus',
    label: 'وضعیت',
    validation: Yup.string().required('این فیلد اجباری است'),
    type: 'radio',
    data: sessionTypeList,
    config: {
      required: true,
      grid: 24,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'sessionFors',
    label: 'مدعوین جلسه (مشتریان)',
    type: 'select',
    onSearch: handleSessionSearchFor,
    showSearch: true,
    labelInValue: true,
    suffixIcon: <Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />,
    filterOption: false,
    mode: 'multiple',
    validation: withSessionFor
      ? Yup.string().required('این فیلد اجباری است')
      : undefined,
    data: sessionForUsersList?.map(u => ({
      label: `${u.firstName || '---'} ${u.lastName || '---'}`,
      value: u.levantId,
    })),
    config: {
      visible: withSessionFor,
      required: true,
      grid: 24,
      placeholder: 'نام افراد را جستجو کنید',
    },
  },
  {
    name: 'sessionTypeId',
    label: 'نوع جلسه',
    type: 'select',
    validation: Yup.string().required('این فیلد اجباری است'),
    data: sessionTypeTemplates?.map(a => ({
      value: a.id,
      label: a.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'نوع جلسه را انتخاب کنید',
    },
  },
  {
    name: 'planners',
    label: 'برگزار کننده (کارشناس فروش)',
    type: 'autocomplete',
    suffix: <Icon type="search" />,
    validation: Yup.string().required('این فیلد اجباری است'),
    onSearch: handleSearch,
    dataSource: crmFilteredUsers?.map(a => renderOptions(a, setSearchDetail)),
    selectedDebounce: 300,
    config: {
      required: true,
      grid: 12,
      placeholder: 'برگزار کننده را انتخاب کنید',
    },
  },
  {
    name: 'attendees',
    label: 'شرکت کنندگان (اعضای سازمان)',
    type: 'select',
    mode: 'multiple',
    showSearch: true,
    labelInValue: true,
    filterOption: false,
    onSearch: handleAttendeesSearch,
    validation: Yup.string().required('این فیلد اجباری است'),
    data: attendeesList?.map(u => ({
      label: `${u.firstName} ${u.lastName}`,
      value: u.levantId,
    })),
    config: {
      required: true,
      grid: 24,
      placeholder: 'اعضای سازمانی را انتخاب کنید',
    },
  },
  {
    name: 'attendeesNotify',
    type: 'checkbox',
    options: rejectionDescription,
    config: {
      required: false,
      grid: 24,
    },
  },
  {
    name: 'sessionDate',
    label: 'تاریخ جلسه',
    type: 'date',
    config: {
      required: true,
      grid: 8,
      placeholder: 'تاریخ را انتخاب کنید',
    },
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'ساعت شروع',
    validation: Yup.string().required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'دقیقه : ساعت',
      grid: 8,
    },
  },
  {
    name: 'endTime',
    type: 'time',
    label: 'ساعت پایان',
    validation: Yup.string().required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'دقیقه : ساعت',
      grid: 8,
    },
  },
  {
    name: 'description',
    label: 'توضیحات',
    type: 'textarea',
    validation: Yup.string()
      .max(800, 'حداکثر حرف مجاز ۸۰۰ کاراکتر است')
      .nullable(),
    suffix: (
      <CPToolTip title="حداکثر ۸۰۰ کارکتر">
        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
      </CPToolTip>
    ),
    config: {
      rows: 4,
      placeholder: 'متن توضیحات...',
      required: false,
      grid: 24,
    },
  },
  {
    name: 'customRequestProceeding',
    type: 'file',
    uploadLabel: 'افزودن صورت جلسه',
    disabled,
    customRequest: customRequestProceeding,
    defaultFileList: defaultFileList
      ? defaultFileList.filter(file => file.proceeding)
      : undefined,
    onRemove: onRemoveFile,
    onPreview: downloadFile,
    config: {
      grid: 24,
      listType: 'picture',
      multiple: false,
    },
  },
  {
    name: 'customRequest',
    type: 'file',
    uploadLabel: 'افزودن پیوست',
    defaultFileList: defaultFileList
      ? defaultFileList.filter(file => !file.proceeding)
      : undefined,
    onRemove: onRemoveFile,
    onPreview: downloadFile,
    customRequest,
    config: {
      grid: 24,
      listType: 'picture',
      multiple: false,
    },
  },
];
