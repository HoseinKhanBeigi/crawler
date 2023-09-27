import React from 'react';
import convertToJalaliDate from '../../utils/date';
import toCommaSeparatedNumber from '../../utils/toCommaSeparatedNumber';
import FacilityItemStatus from '../../components/FacilityItemStatus/FacilityItemStatus';
import ItemsWithPopUp from '../../components/ItemsWithPopUp/ItemsWithPopUp';

const addRialString = value => (value ? `${value} ریال` : '---');

const renderGuarantorList = value => {
  if (!(value instanceof Array)) {
    return '---';
  }
  const names = value.map(item => ({
    title: `${item.firstName} ${item.lastName}`,
    id: item?.applicationInfoId,
  }));
  return <ItemsWithPopUp items={names} showCount={2} />;
};

export const columns = [
  {
    title: 'تاریخ درخواست',
    dataIndex: 'requestDate',
    render: date => (date ? convertToJalaliDate(date) : '---'),
    ellipsis: false,
  },
  {
    title: 'مبلغ درخواست',
    dataIndex: 'facilityDetail.requestedAmount',
    render: value => addRialString(toCommaSeparatedNumber(value, false)),
    ellipsis: false,
  },
  {
    title: 'محصول',
    dataIndex: 'facilityDetail.facilityType',
    render: value => value || '---',
    ellipsis: false,
  },
  {
    title: 'تعداد اقساط',
    dataIndex: 'facilityDetail.numberOfPayments',
    render: value => value || '---',
    ellipsis: false,
  },
  {
    title: 'مبلغ هر قسط',
    dataIndex: 'facilityDetail.loanFinancialDetails.payment',
    render: value => addRialString(toCommaSeparatedNumber(value, false)),
    ellipsis: false,
  },
  {
    title: 'ضامنین',
    dataIndex: 'guarantors',
    render: value => renderGuarantorList(value || []),
    ellipsis: true,
  },
  {
    title: 'وضعیت',
    dataIndex: 'facilityStatusTitle',
    render: value => <FacilityItemStatus status={value} />,
    ellipsis: false,
  },
];
