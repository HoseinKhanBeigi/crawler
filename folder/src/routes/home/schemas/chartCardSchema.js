import { lazy } from 'react';
import chartReportServices from '../../../service/chartReportService';
import {
  dateFilterOptions,
  filterFormFieldsName,
  transformKycReportsResponse,
  transformSaleOpportunityDateBasedReportResponse,
} from '../../../helpers/chartReportServiceHelpers';
import { Actions } from '../../../utils/aclActions';

const DateBasedXYChart = lazy(() =>
  import(
    '../../../components/ChartsRoot/Charts/DateBasedXYChart/DateBasedXYChart'
  ),
);

const PieChart = lazy(() =>
  import('../../../components/ChartsRoot/Charts/PieChart/PieChart'),
);
// const FunnelChart = lazy(() =>
//   import('../../../components/ChartsRoot/Charts/FunnelChart/FunnelChart'),
// );
// const StackedXYChart = lazy(() =>
//   import('../../../components/ChartsRoot/Charts/StackedXYChart/StackedXYChart'),
// );

export default [
  // {
  //   title: 'قیف بازاریابی',
  //   name: 'marketingFunnelChart',
  //   chart: FunnelChart,
  //   service: chartReportServices.getSaleFunnelReport,
  //   prepareDataForChartCallback: transformSaleFunnelReportResponse,
  //   filterFields: [filterFormFieldsName.product],
  //   defaultFilter: {
  //     [filterFormFieldsName.product]: 'ALL',
  //   },
  // },
  // {
  //   title: 'مجموع کل فروش',
  //   name: 'totalSaleReportsChart',
  //   chart: StackedXYChart,
  //   service: chartReportServices.getTotalSaleReport,
  //   prepareDataForChartCallback: transformTotalSaleReportResponse,
  //   filterFields: [filterFormFieldsName.product, filterFormFieldsName.date],
  //   defaultFilter: {
  //     [filterFormFieldsName.date]: dateFilterOptions.CURRENT_YEAR,
  //     [filterFormFieldsName.product]: 'ALL',
  //   },
  //   dateFilterOptions: [
  //     dateFilterOptions.CURRENT_YEAR,
  //     dateFilterOptions.PAST_SIX_MONTHS,
  //     dateFilterOptions.LAST_YEAR,
  //   ],
  // },
  {
    title: 'فراوانی کل فرصت ها',
    name: 'opportunitiesSumChart',
    chart: DateBasedXYChart,
    service: chartReportServices.getOpportunitiesFrequencyReport,
    aclCode: undefined, // TODO: add this later
    prepareDataForChartCallback: transformSaleOpportunityDateBasedReportResponse(
      'count',
      'createdDateShamsi',
    ),
    chartOptions: {
      sortDate: true,
      timeInterval: 'day',
    },
    filterFields: [filterFormFieldsName.product, filterFormFieldsName.date],
    defaultFilter: {
      [filterFormFieldsName.date]: dateFilterOptions.CURRENT_YEAR,
      [filterFormFieldsName.product]: '',
    },
    dateFilterOptions: [
      dateFilterOptions.CURRENT_YEAR,
      dateFilterOptions.PAST_SIX_MONTHS,
      dateFilterOptions.LAST_YEAR,
    ],
  },
  {
    title: 'فراوانی کل سرنخ ها',
    name: 'leadsSumChart',
    chart: DateBasedXYChart,
    service: chartReportServices.getLeadsFrequencyReport,
    aclCode: Actions.generalReportRead,
    prepareDataForChartCallback: transformSaleOpportunityDateBasedReportResponse(
      'count',
      'createdDate',
    ),
    chartOptions: {
      lineColor: '#ff9e5d',
      timeInterval: 'day',
    },
    filterFields: [filterFormFieldsName.date],
    defaultFilter: {
      [filterFormFieldsName.date]: dateFilterOptions.CURRENT_YEAR,
    },
    dateFilterOptions: [
      dateFilterOptions.CURRENT_YEAR,
      dateFilterOptions.PAST_SIX_MONTHS,
      dateFilterOptions.LAST_YEAR,
    ],
  },
  {
    title: 'احراز هویت',
    name: 'kycRecordChart',
    chart: PieChart,
    service: chartReportServices.getKycReport,
    aclCode: Actions.generalReportRead,
    prepareDataForChartCallback: transformKycReportsResponse,
  },
];
