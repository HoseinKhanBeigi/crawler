import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as am4charts from '@amcharts/amcharts4/charts';
import useAmChart from '../../../../hooks/useAmChart';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../styles/Charts.scss';
import { dateBasedXYChartSchema } from '../../schema/chartsSchema';
import ChartContainer from '../../ChartContainer/ChartContainer';

/* eslint-disable no-param-reassign */

const DateBasedXYChart = ({ service, options }) => {
  const { loading, chartContainerRef, noData } = useAmChart(
    service,
    {
      chartType: am4charts.XYChart,
      imperativeConfigCallback: dateBasedXYChartSchema.imperativeConfigCallback(
        'date',
        'count',
        options,
      ),
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

DateBasedXYChart.propTypes = {
  service: PropTypes.func.isRequired,
  options: PropTypes.object,
};

DateBasedXYChart.defaultProps = {
  options: undefined,
};
export default withStyles(s)(DateBasedXYChart);
