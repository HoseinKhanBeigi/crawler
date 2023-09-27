import React from 'react';
import TruncateString from '../../components/KianTable/renderer/TruncateString';

export const ResultTypeEnum = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const resultType = type => {
  switch (type) {
    case ResultTypeEnum.SUCCESS:
      return 'موفق';
    case ResultTypeEnum.FAILED:
      return 'ناموفق';
    default:
      return 'نامشخص';
  }
};

export const renderMessageStatus = active =>
  active ? <div strong>فعال</div> : <div disabled> غیرفعال </div>;

export const columns = [
  {
    title: 'محصول',
    dataIndex: 'productTitle',
    render: value => TruncateString(value),
  },
  {
    title: 'عملیات',
    dataIndex: 'actionStageTitle',
    render: value => TruncateString(value),
  },
  {
    title: 'نتیجه عملیات',
    dataIndex: 'resultType',
    render: value => resultType(value),
  },
  {
    title: 'کد قالب',
    dataIndex: 'notificationTemplateCode',
    render: value => <span>{TruncateString(value)}</span>,
  },
  {
    title: 'وضعیت',
    dataIndex: 'active',
    render: renderMessageStatus,
    width: 60,
  },
];

export const searchData = ({
  availableProducts,
  pipelineTypes,
  actionTypes,
  onSearchProducts,
  onSearchPipelines,
}) => [
  {
    name: 'productId',
    title: 'محصول',
    type: 'dropDown',
    onChange: onSearchProducts,
    data: availableProducts,
  },
  {
    name: 'piplineId',
    title: 'پایپ‌لاین',
    type: 'dropDown',
    onChange: onSearchPipelines,
    data: pipelineTypes,
  },
  {
    name: 'actionStageId',
    title: 'عملیات',
    type: 'dropDown',
    data: actionTypes,
  },
];
