import React from 'react';
import { filters } from './filtersSchema';
import {
  groupByFilters,
  groupByLevelOptionsNames,
  groupByTypeOptionsNames,
} from './groupBySchema';
import DatabaseChartContainer from '../components/DatabaseChartContainer/DatabaseChartContainer';
import AggregateChartContainer from '../components/AggregateChartContainer/AggregateChartContainer';

const panelsConfig = {
  BUSINESS: {
    AGGREGATE: {
      filters: [
        filters.DATE,
        filters.PRODUCTS,
        filters.PROVIDERS,
        filters.SALE_CHANNELS,
      ],
      groupBy: [
        {
          name: groupByFilters.LEVEL,
          options: [groupByLevelOptionsNames.PRODUCTS],
        },
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PRODUCTS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <AggregateChartContainer />,
    },
    TIMEBASE: {
      filters: [
        filters.DATE,
        filters.PRODUCTS,
        filters.PROVIDERS,
        filters.SALE_CHANNELS,
      ],
      groupBy: [
        {
          name: groupByFilters.LEVEL,
          options: [
            groupByLevelOptionsNames.PRODUCTS,
            groupByLevelOptionsNames.PROVIDERS,
            groupByLevelOptionsNames.SALE_CHANNELS,
          ],
        },
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PROVIDERS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <DatabaseChartContainer />,
    },
  },
  PROVIDER: {
    AGGREGATE: {
      filters: [filters.DATE, filters.PRODUCTS, filters.SALE_CHANNELS],
      groupBy: [
        {
          name: groupByFilters.LEVEL,
          options: [
            groupByLevelOptionsNames.PRODUCTS,
            groupByLevelOptionsNames.SALE_CHANNELS,
          ],
        },
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PRODUCTS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <AggregateChartContainer />,
    },
    TIMEBASE: {
      filters: [filters.DATE, filters.PRODUCTS, filters.SALE_CHANNELS],
      groupBy: [
        {
          name: groupByFilters.LEVEL,
          options: [
            groupByLevelOptionsNames.PRODUCTS,
            groupByLevelOptionsNames.SALE_CHANNELS,
          ],
        },
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PRODUCTS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <DatabaseChartContainer />,
    },
  },
  CHANNEL: {
    AGGREGATE: {
      filters: [filters.DATE, filters.PRODUCTS, filters.PROVIDERS],
      groupBy: [
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PROVIDERS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <AggregateChartContainer withoutLegend />,
    },
    TIMEBASE: {
      filters: [
        filters.DATE,
        filters.PRODUCTS,
        filters.SALE_CHANNELS,
        filters.PROVIDERS,
      ],
      groupBy: [
        {
          name: groupByFilters.LEVEL,
          options: [
            groupByLevelOptionsNames.PRODUCTS,
            groupByLevelOptionsNames.PROVIDERS,
          ],
        },
        {
          name: groupByFilters.TYPE,
          options: [
            groupByTypeOptionsNames.ANNULMENT,
            groupByTypeOptionsNames.ISSUANCE,
            groupByTypeOptionsNames.EXPORTATION,
            groupByTypeOptionsNames.BALANCE,
          ],
        },
      ],
      initialState: {
        groupBy: {
          [groupByFilters.LEVEL]: groupByLevelOptionsNames.PROVIDERS,
          [groupByFilters.TYPE]: groupByTypeOptionsNames.EXPORTATION,
        },
      },
      component: <DatabaseChartContainer />,
    },
  },
};

const chartTypes = ['AGGREGATE', 'TIMEBASE'];
const panelTypes = ['BUSINESS', 'PROVIDER', 'CHANNEL'];

const getPanelsConfig = (panelType, chartType) => {
  if (chartTypes.includes(chartType) && panelTypes.includes(panelType))
    return panelsConfig[panelType][chartType];
  throw new Error('getPanelsConfig Arguments are invalid');
};

export default getPanelsConfig;
