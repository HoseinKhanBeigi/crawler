import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import * as am4charts from '@amcharts/amcharts4/charts';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../styles/Charts.scss';
import useAmChart from '../../../../hooks/useAmChart';
import { stackedXYChartSchema } from '../../schema/chartsSchema';
import ChartContainer from '../../ChartContainer/ChartContainer';

const StackedXYChart = ({ service }) => {
  const { loading, chartContainerRef, noData } = useAmChart(
    service,
    {
      chartType: am4charts.XYChart,
      jsonConfigCallback: stackedXYChartSchema.jsonConfigCallback('date'),
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

StackedXYChart.propTypes = {
  service: PropTypes.func.isRequired,
};
export default withStyles(s)(StackedXYChart);
