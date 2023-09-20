import React from 'react';
import * as Yup from 'yup';
import { AutoComplete, Icon } from 'antd';
import CPToolTip from '../CP/CPTooltip';
import toCommaSeparatedNumber from '../../utils/toCommaSeparatedNumber';

const { Option } = AutoComplete;

const nameInputMaxChar = 32;
const descriptionMaxChar = 800;

const renderOptions = (item, setSelectedLead) => (
  <Option
    key={item.leadId}
    text={`${item.firstName || '---'} ${item.lastName || '---'}`}
    value={`${item.leadId}`}
    onClick={() => {
      setSelectedLead(item);
    }}
  >
    <div className="global-search-item">
      <span className="global-search-item-desc">
        {`${item.firstName || '---'} ${item.lastName || '---'}`}
      </span>
    </div>
  </Option>
);

const showCloseDate = selectedSaleState =>
  selectedSaleState === 'WON' || selectedSaleState === 'LOST';

export const schema = ({
  searchLeadHandler,
  searchLeadResult,
  selectedLead,
  setSelectedLead,
  productsList,
  saleStates,
  selectedSaleState,
  setSelectedSaleState,
  editMode,
  withLeadSearch,
}) => [
  {
    name: 'name',
    type: 'input',
    label: 'نام فرصت',
    suffix: (
      <CPToolTip title={`حداکثر ${nameInputMaxChar} کارکتر`}>
        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
      </CPToolTip>
    ),
    validation: Yup.string()
      .max(nameInputMaxChar, 'حداکثر ۳۲ کاراکتر مجاز است')
      .required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'نام فرصت را وارد کنید',
      grid: 24,
    },
  },
  {
    name: 'leadId',
    type: 'autocomplete',
    label: 'حساب (سرنخ)',
    validation:
      !editMode && withLeadSearch
        ? Yup.string().required('این فیلد اجباری است')
        : undefined,
    onSearch: searchLeadHandler,
    dataSource: searchLeadResult.map(item =>
      renderOptions(item, setSelectedLead),
    ),
    suffix: <Icon type="search" />,
    hasDescription: selectedLead,
    descriptionProp: [
      { title: 'شماره تماس', value: selectedLead?.mobilePhone },
      { title: 'کد ملی', value: selectedLead?.nationalCode },
    ],
    config: {
      visible: !editMode && withLeadSearch,
      required: true,
      placeholder: 'نام سرنخ را جستوجو کنید',
      grid: 24,
    },
  },
  {
    name: 'saleProduct',
    label: 'محصول',
    type: 'select',
    validation: !editMode
      ? Yup.string().required('این فیلد اجباری است')
      : undefined,
    data:
      productsList &&
      productsList?.map(a => ({
        value: a.id,
        label: a.name,
      })),
    config: {
      visible: !editMode,
      required: true,
      grid: 12,
      placeholder: 'نام محصول را انتخاب کنید',
    },
  },
  {
    name: 'forecastDate',
    label: 'تاریخ پیش بینی فروش',
    type: 'date',
    validation: Yup.string()
      .required('این فیلد اجباری است')
      .nullable(),
    config: {
      required: true,
      grid: 12,
      placeholder: 'تاریخ پیش بینی فروش را مشخص کنید',
    },
  },
  {
    name: 'expectedBudget',
    type: 'input',
    label: 'مبلغ مورد انتظار',
    suffix: (
      <p style={{ fontWeight: 'bold', fontSize: 12, color: '#262626' }}>ریال</p>
    ),
    validation: Yup.string()
      .matches(/^[0-9,]*$/, 'لطفا عدد وارد کنید')
      .nullable()
      .required('این فیلد اجباری است'),
    formatValue: toCommaSeparatedNumber,
    config: {
      required: true,
      placeholder: 'مبلغ مورد انتظار را وارد کنید',
      grid: 12,
    },
  },
  {
    name: 'probability',
    type: 'input',
    label: 'احتمال موفقیت',
    suffix: <Icon type="percentage" style={{ color: '#262626' }} />,
    validation: Yup.number()
      .typeError('لطفا عدد وارد کنید')
      .integer('لطفا عدد صحیح وارد کنید')
      .min(0, 'لطفا عدد بین صفر تا صد انتخاب کنید')
      .max(100, 'لطفا عدد بین صفر تا صد انتخاب کنید')
      .nullable()
      .required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'احتمال موفقیت را وارد کنید',
      grid: 12,
    },
  },
  {
    name: 'saleState',
    label: 'مرحله فروش',
    type: 'select',
    onChange: setSelectedSaleState,
    validation: Yup.string().required('این فیلد اجباری است'),
    data: saleStates?.map(a => ({
      value: a.code,
      label: a.name,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'مرحله فروش را مشخص کنید',
    },
  },
  {
    name: 'closeDate',
    label: 'تاریخ وضعیت قطعی',
    type: 'date',
    validation: showCloseDate(selectedSaleState)
      ? Yup.string()
          .required('این فیلد اجباری است')
          .nullable()
      : undefined,
    config: {
      visible: showCloseDate(selectedSaleState),
      required: true,
      grid: 12,
      placeholder: 'تاریخ وضعیت قطعی را مشخص کنید',
    },
  },
  {
    name: 'description',
    label: 'توضیحات',
    type: 'textarea',
    validation: Yup.string()
      .max(descriptionMaxChar, 'حداکثر ۸۰۰ کارکتر')
      .nullable(),

    suffix: (
      <CPToolTip title={`حداکثر ${descriptionMaxChar} کارکتر`}>
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
];
