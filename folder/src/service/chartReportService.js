import { generateURL } from '../utils/request/url';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';
import request from '../utils/request';

/* eslint-disable no-plusplus */

const endpoint = generateURL('report');

const generateServiceBodyParameter = filters =>
  filters.map(({ field, opt, value }) =>
    field === 'forecastDateShamsi'
      ? {
          field: `forecastDateShamsi${opt === '>=' ? 'From' : 'To'}`,
          value,
        }
      : { field, value },
  );

const chartReportServices = {
  getTotalSaleReport(filters) {
    return request(`${endpoint}/create`).post({
      queryCode: 'SaleOpportunity_Report_StackedXYChart',
      type: 'PREDEFINED',
      filters,
    });
  },
  getSaleFunnelReport(filters) {
    return request(`${endpoint}/create`).post({
      projection: ['name', 'count'],
      filters: [
        {
          field: 'context',
          opt: '=',
          value: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
        },
      ],
      parameters: generateServiceBodyParameter(filters),
      queryCode: 'SaleOpportunity_Report_FunnelSeries',
      type: 'PREDEFINED',
    });
  },
  getSaleOpportunityStatesReport(filters) {
    return request(`${endpoint}/create`).post({
      filters,
      queryCode: 'SaleOpportunity_Report_PieChart',
      type: 'PREDEFINED',
    });
  },
  getSaleOpportunityFrequencyReport(filters) {
    return request(`${endpoint}/create`).post({
      filters,
      queryCode: 'SaleOpportunity_Report_Count_DataBaseXY',
      type: 'PREDEFINED',
    });
  },
  getLeadsFrequencyReport(filters) {
    return request(`${endpoint}/create`).post({
      parameters: generateServiceBodyParameter(filters),
      projection: ['count', 'createdDate'],
      queryCode: 'Lead_Report_Count_DataBaseXY',
      filterType: 'CURRENT_USER',
      type: 'PREDEFINED',
    });
  },
  getSaleOpportunityForecastReport(filters) {
    return request(`${endpoint}/create`).post({
      filters,
      queryCode: 'SaleOpportunity_Report_Revenue_DataBaseXY',
      type: 'PREDEFINED',
    });
  },
  getKycReport(filters) {
    return request(`${endpoint}/create`).post({
      filters,
      projection: ['count', 'status'],
      queryCode: 'Kyc_Report_Count_DataBaseXY',
      type: 'PREDEFINED',
    });
  },
  getOpportunitiesFrequencyReport(filters) {
    return request(`${endpoint}/opportunity`).post({
      filters: generateServiceBodyParameter(filters),
    });
  },
};

export default chartReportServices;
