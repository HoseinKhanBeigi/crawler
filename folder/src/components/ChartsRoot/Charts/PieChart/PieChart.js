import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as am4charts from '@amcharts/amcharts4/charts';
import useAmChart from '../../../../hooks/useAmChart';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../styles/Charts.scss';
import { pieChartSchema } from '../../schema/chartsSchema';
import ChartContainer from '../../ChartContainer/ChartContainer';

/* eslint-disable no-param-reassign */

const PieChart = ({ service }) => {
  const { loading, chartContainerRef, noData } = useAmChart(
    service,
    {
      chartType: am4charts.PieChart,
      jsonConfigCallback: pieChartSchema.jsonConfigCallback('count', 'title'),
      imperativeConfigCallback: pieChartSchema.imperativeConfigCallback,
    },
    [service],
  );

  return (
    <ChartContainer
      chartContainerRef={chartContainerRef}
      loading={loading}
      noData={noData}
    />
  );
};

PieChart.propTypes = {
  service: PropTypes.func.isRequired,
};
export default withStyles(s)(PieChart);
