import jalaliMoment from 'moment-jalaali';
import saleOpportunityStates from '../utils/saleOpportunityStates';

export const filterFormFieldsName = {
  product: 'PRODUCTS',
  saleProducts: 'SALE_PRODUCTS',
  users: 'USERS',
  saleState: 'SALE_STATE',
  date: 'DATE',
  dateFrom: 'DATE_FROM',
  dateTo: 'DATE_TO',
};

export const filterFormFieldsNameTranslate = {
  [filterFormFieldsName.product]: 'محصول',
  [filterFormFieldsName.saleProducts]: 'محصولات فروش',
  [filterFormFieldsName.users]: 'کاربران',
  [filterFormFieldsName.saleState]: 'مراحل فروش',
  [filterFormFieldsName.date]: 'بازه زمانی',
  [filterFormFieldsName.dateFrom]: 'از تاریخ',
  [filterFormFieldsName.dateTo]: 'تا تاریخ',
};

export const dateFilterOptions = {
  SELECT_RANGE: 'انتخاب بازه زمانی',
  PAST_SIX_MONTHS: 'شش ماه گذشته',
  LAST_YEAR: 'سال گذشته',
  NEXT_YEAR: 'سال آینده',
  NEXT_SIX_MONTHS: 'شش ماه آینده',
  CURRENT_YEAR: 'سال جاری',
};

export const FunnelSaleFields = {
  Lead_count: 'تعداد سرنخ ها',
  SaleOpportunity_count: 'تعداد فرصت ها',
  Customer_count: 'تعداد مشتریان',
};

export const KycStatusesInfo = {
  APPROVED: { title: 'احراز هویت موفق', color: '#00b4ad' },
  REJECTED: {
    title: 'احراز هویت رد شده',
    color: '#ff5252',
  },
  SUBMITTED: {
    title: 'در انتظار احراز هویت',
    color: '#7e93bb',
  },
};

export const transformTotalSaleReportResponse = data => {
  const sortedData = data.sort(
    (a, b) =>
      new Date(jalaliMoment(a.forecastDateShamsi_date_field, 'jYYYY/jMM')) -
      new Date(jalaliMoment(b.forecastDateShamsi_date_field, 'jYYYY/jMM')),
  );
  const hashMap = {};
  for (let i = 0; i < sortedData.length; i += 1) {
    const id = sortedData[i].forecastDateShamsi_date_field;
    if (!hashMap[id]) hashMap[id] = {};
    if (!hashMap[id].date)
      hashMap[id].date = jalaliMoment(id, 'jYYYY/jMM').format('jMMMM');
    hashMap[id][sortedData[i].saleProduct_name] =
      sortedData[i].sum_expectedBudget;
  }
  return Object.values(hashMap);
};

// const transformSaleFunnelReportResponse = stringData => {
//   const jsonData = JSON.parse(stringData);
//   return (
//     Array.isArray(jsonData) &&
//     jsonData?.map(item => ({
//       ...item,
//       name: FunnelSaleFields[item.name],
//     }))
//   );
// };

export const transformSaleFunnelReportResponse = data =>
  Array.isArray(data) &&
  Object.entries(FunnelSaleFields).map(([item, name]) => ({
    count: data.find(v => v.name === item)?.count || 0, // TODO: Backend should handle this, change this later to commented Code above
    name,
  }));

export const transformSaleOpportunityDateBasedReportResponse = (
  valueName,
  dateName,
) => data =>
  Array.isArray(data) &&
  data?.map(item => ({
    count: item[valueName],
    date: new Date(
      jalaliMoment(`${item[dateName]}/29`, 'jYYYY/jMM/jDD').format(
        'YYYY/MM/DD',
      ),
    ).getTime(),
  }));

export const transformSaleOpportunityStatesResponse = data =>
  Array.isArray(data) &&
  data?.map(item => ({
    count: item.count_id,
    title: saleOpportunityStates[item.saleState],
  }));

export const transformKycReportsResponse = data =>
  Array.isArray(data) &&
  data?.map(item => ({
    count: item.count,
    title: KycStatusesInfo[item.status].title,
    color: KycStatusesInfo[item.status].color,
  }));

const getFilterObject = (field, opt, value) => ({ field, opt, value });

const timeFormat = 'jYYYY/jMM/jDD';

const MomentDateRangeProps = {
  [dateFilterOptions.PAST_SIX_MONTHS]: {
    dateFrom: jalaliMoment().subtract(6, 'jMonth'),
    dateTo: jalaliMoment(),
  },
  [dateFilterOptions.LAST_YEAR]: {
    dateFrom: jalaliMoment().subtract(1, 'jYear'),
    dateTo: jalaliMoment(),
  },
  [dateFilterOptions.NEXT_YEAR]: {
    dateFrom: jalaliMoment(),
    dateTo: jalaliMoment().add(1, 'jYear'),
  },
  [dateFilterOptions.NEXT_SIX_MONTHS]: {
    dateFrom: jalaliMoment(),
    dateTo: jalaliMoment().add(6, 'jMonth'),
  },
  [dateFilterOptions.CURRENT_YEAR]: {
    dateFrom: jalaliMoment().startOf('jYear'),
    dateTo: jalaliMoment().endOf('jYear'),
  },
};

const generateDateRange = type => {
  const dateRanges = MomentDateRangeProps[type];
  return [
    getFilterObject(
      'forecastDateShamsi',
      '>=',
      dateRanges.dateFrom.format(timeFormat),
    ),
    getFilterObject(
      'forecastDateShamsi',
      '<=',
      dateRanges.dateTo.format(timeFormat),
    ),
  ];
};

const generateFilterFields = (key, value) => {
  switch (key) {
    case filterFormFieldsName.users:
      return (
        value.length &&
        getFilterObject('lead.assigneeLevantId', 'in', value.join(','))
      );
    case filterFormFieldsName.saleProducts:
      return (
        value.length && getFilterObject('saleProduct.id', 'in', value.join(','))
      );
    case filterFormFieldsName.product:
      return value && getFilterObject('product', '=', value);
    case filterFormFieldsName.date:
      return value && value !== dateFilterOptions.SELECT_RANGE
        ? generateDateRange(value)
        : null;
    case filterFormFieldsName.dateFrom:
      return (
        value &&
        getFilterObject(
          'forecastDateShamsi',
          '>=',
          jalaliMoment(value).format(timeFormat),
        )
      );
    case filterFormFieldsName.dateTo:
      return (
        value &&
        getFilterObject(
          'forecastDateShamsi',
          '<=',
          jalaliMoment(value).format(timeFormat),
        )
      );
    case filterFormFieldsName.saleState:
      return value.length && getFilterObject('saleState', '=', value.join(','));
    default:
      return null;
  }
};

export const prepareFiltersForRequest = filters =>
  filters
    ? Object.entries(filters)
        .map(([key, value]) => generateFilterFields(key, value))
        .flat()
        .filter(Boolean)
    : [];
