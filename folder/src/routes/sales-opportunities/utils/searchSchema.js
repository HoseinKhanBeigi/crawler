import React from 'react';
import { AutoComplete, Icon } from 'antd';

export const searchData = ({
  onSearchLead,
  searchLeadResult,
  products,
  saleStates,
  crmUsers,
  onSearchMultipleSelect,
}) => [
  {
    name: 'name',
    title: 'عنوان جلسه',
    type: 'input',
  },
  {
    name: 'leadIds',
    title: 'حساب سرنخ',
    type: 'autocomplete',
    onSearch: onSearchLead,
    dataSource: searchLeadResult?.map(item => (
      <AutoComplete.Option
        key={item.leadId}
        text={`${item.firstName || '---'} ${item.lastName || '---'}`}
        value={`${item.leadId}`}
      >
        <div className="global-search-item">
          <span className="global-search-item-desc">
            {`${item.firstName || '---'} ${item.lastName || '---'}`}
          </span>
        </div>
      </AutoComplete.Option>
    )),
  },
  {
    name: 'forecastDateFrom',
    title: 'پیش بینی فروش (از تاریخ)',
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
    name: 'forecastDateTo',
    title: 'پیش بینی فروش (تا تاریخ)',
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
    name: 'saleProductIds',
    title: 'محصول',
    type: 'select',
    mode: 'multiple',
    onSearch: e => {
      onSearchMultipleSelect(e, products);
    },
    data: products.map(p => ({ value: p.id.toString(), label: p.name })),
  },
  {
    name: 'expectedBudget',
    title: 'مبلغ مورد انتظار',
    type: 'input',
    suffix: (
      <p style={{ fontWeight: 'bold', fontSize: 12, color: '#262626' }}>ریال</p>
    ),
  },
  {
    name: 'probability',
    title: 'احتمال موفقیت',
    type: 'input',
    suffix: <Icon type="percentage" style={{ color: '#262626' }} />,
  },
  {
    name: 'saleStates',
    title: 'مرحله فروش',
    type: 'dropDown',
    multipleSelect: true,
    data: saleStates.map(p => ({ value: p.code, text: p.name })),
  },
  {
    name: 'assigneeLevantIds',
    title: 'نام مسئول',
    type: 'select',
    mode: 'multiple',
    onSearch: e => {
      onSearchMultipleSelect(e, crmUsers);
    },
    data: crmUsers?.map(u => ({
      label: `${u.fullName}`,
      value: u.levantId,
    })),
  },
  {
    name: 'closeDateFrom',
    title: 'وضعیت قطعی (از تاریخ)',
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
    name: 'closeDateTo',
    title: 'وضعیت قطعی (تا تاریخ)',
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
];
