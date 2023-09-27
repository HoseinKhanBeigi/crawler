import React, { lazy } from 'react';
import { Icon } from '@mdi/react';
import { mdiBullseyeArrow, mdiDatabaseOutline } from '@mdi/js';
import chartReportServices from '../../../service/chartReportService';
import {
  dateFilterOptions,
  filterFormFieldsName,
  transformSaleFunnelReportResponse,
  transformSaleOpportunityDateBasedReportResponse,
  transformSaleOpportunityStatesResponse,
  transformTotalSaleReportResponse,
} from '../../../helpers/chartReportServiceHelpers';

const DateBasedXYChart = lazy(() =>
  import(
    '../../../components/ChartsRoot/Charts/DateBasedXYChart/DateBasedXYChart'
  ),
);
const PieChart = lazy(() =>
  import('../../../components/ChartsRoot/Charts/PieChart/PieChart'),
);
const FunnelChart = lazy(() =>
  import('../../../components/ChartsRoot/Charts/FunnelChart/FunnelChart'),
);
const StackedXYChart = lazy(() =>
  import('../../../components/ChartsRoot/Charts/StackedXYChart/StackedXYChart'),
);

export default [
  {
    title: 'فروش',
    icon: <Icon path={mdiDatabaseOutline} size="16px" />,
    name: 'sale',
    charts: [
      {
        name: 'کل فروش',
        title: 'گزارش فروش (ماهانه)',
        component: StackedXYChart,
        service: chartReportServices.getTotalSaleReport,
        prepareDataForChartCallback: transformTotalSaleReportResponse,
        filterFields: [
          filterFormFieldsName.users,
          filterFormFieldsName.saleProducts,
          filterFormFieldsName.date,
        ],
        defaultDateFilter: dateFilterOptions.CURRENT_YEAR,
        dateFilterOptions: [
          dateFilterOptions.CURRENT_YEAR,
          dateFilterOptions.PAST_SIX_MONTHS,
          dateFilterOptions.LAST_YEAR,
          dateFilterOptions.SELECT_RANGE,
        ],
      },
      {
        name: 'قیف فروش',
        title: 'گزارش قیف فروش',
        component: FunnelChart,
        service: chartReportServices.getSaleFunnelReport,
        prepareDataForChartCallback: transformSaleFunnelReportResponse,
        filterFields: [filterFormFieldsName.date],
        defaultDateFilter: dateFilterOptions.CURRENT_YEAR,
        dateFilterOptions: [
          dateFilterOptions.CURRENT_YEAR,
          dateFilterOptions.PAST_SIX_MONTHS,
          dateFilterOptions.LAST_YEAR,
          dateFilterOptions.SELECT_RANGE,
        ],
      },
    ],
  },
  {
    title: 'فرصت فروش',
    icon: <Icon path={mdiBullseyeArrow} size="16px" />,
    name: 'saleOpportunity',
    charts: [
      {
        name: 'فراوانی',
        title: 'گزارش فراوانی فرصت های فروش',
        component: DateBasedXYChart,
        chartOptions: {
          sortDate: true,
          withScrollbarY: true,
        },
        service: chartReportServices.getSaleOpportunityFrequencyReport,
        prepareDataForChartCallback: transformSaleOpportunityDateBasedReportResponse(
          'count_id',
          'forecastDateShamsi_date_field',
        ),
        filterFields: [
          filterFormFieldsName.users,
          filterFormFieldsName.saleProducts,
          filterFormFieldsName.date,
          filterFormFieldsName.saleState,
        ],
        defaultDateFilter: dateFilterOptions.CURRENT_YEAR,
        dateFilterOptions: [
          dateFilterOptions.CURRENT_YEAR,
          dateFilterOptions.PAST_SIX_MONTHS,
          dateFilterOptions.LAST_YEAR,
          dateFilterOptions.SELECT_RANGE,
        ],
      },
      {
        name: 'مرحله فروش',
        title: 'گزارش فراوانی مراحل فرصت های فروش',
        component: PieChart,
        service: chartReportServices.getSaleOpportunityStatesReport,
        prepareDataForChartCallback: transformSaleOpportunityStatesResponse,
        filterFields: [
          filterFormFieldsName.users,
          filterFormFieldsName.saleProducts,
        ],
      },
      {
        name: 'پیش بینی فروش',
        title: 'گزارش پیش بینی درآمد (ماهانه)',
        component: DateBasedXYChart,
        chartOptions: {
          sortDate: true,
        },
        service: chartReportServices.getSaleOpportunityForecastReport,
        prepareDataForChartCallback: transformSaleOpportunityDateBasedReportResponse(
          'sum_expectedBudgetprobability',
          'forecastDateShamsi_date_field',
        ),
        filterFields: [
          filterFormFieldsName.users,
          filterFormFieldsName.saleProducts,
          filterFormFieldsName.date,
        ],
        defaultDateFilter: dateFilterOptions.CURRENT_YEAR,
        dateFilterOptions: [
          dateFilterOptions.NEXT_YEAR,
          dateFilterOptions.CURRENT_YEAR,
          dateFilterOptions.NEXT_SIX_MONTHS,
          dateFilterOptions.SELECT_RANGE,
        ],
      },
    ],
  },
];
