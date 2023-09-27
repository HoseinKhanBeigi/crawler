import { AutoComplete } from 'antd';
import React from 'react';
import { unitTypeNames } from './unitHelpers';

const unitStatus = [
  {
    value: 'ACTIVE',
    title: 'فعال',
  },
  {
    value: 'INACTIVE',
    title: 'غیر فعال',
  },
];

const unitSearchSchema = ({
  unitType,
  cities = [],
  provinces = [],
  searchLeadResult = [],
  onSearchLead,
  onFilterCities,
}) => [
  {
    name: 'example.name',
    title: `نام ${unitTypeNames[unitType]}`,
    type: 'input',
    placeholder: `نام ${unitTypeNames[unitType]} را وارد کنید`,
  },
  {
    name: 'example.code',
    title: `کد ${unitTypeNames[unitType]}`,
    type: 'input',
    placeholder: `کد ${unitTypeNames[unitType]} را وارد کنید`,
  },
  {
    name: 'example.contactDTO.provinceClassificationId',
    title: 'استان',
    type: 'dropDown',
    placeholder: 'استان را انتخاب کنید',
    onChange: onFilterCities,
    data: provinces?.map(item => ({
      text: item.text,
      value: item.id,
    })),
  },
  {
    name: 'example.contactDTO.cityClassificationId',
    title: 'شهر',
    type: 'dropDown',
    placeholder: 'شهر را انتخاب کنید',
    data: cities?.map(item => ({
      text: item.text,
      value: item.id,
    })),
  },
  // {
  //   name: 'example.productsDTO[0].id',
  //   title: 'محصولات',
  //   type: 'dropDown',
  //   placeholder: 'انتخاب کنید',
  //   data: products?.map(type => ({
  //     text: type.title,
  //     value: type.id,
  //   })),
  // },
  {
    name: 'example.managerLevantId',
    title: 'مسئول کارگزار',
    type: 'autocomplete',
    onSearch: onSearchLead,
    placeholder: 'مسئول کارگزار را جستجو کنید',
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
    name: 'example.contactDTO.tel',
    title: 'شماره تماس',
    type: 'input',
    placeholder: `شماره تماس ${unitTypeNames[unitType]} را وارد کنید`,
  },
  {
    title: 'وضعیت',
    name: 'example.status',
    type: 'dropDown',
    placeholder: 'انتخاب کنید',
    data: unitStatus?.map(t => ({
      value: t.value,
      text: t.title,
    })),
    mode: 'default',
  },
];

export default unitSearchSchema;
