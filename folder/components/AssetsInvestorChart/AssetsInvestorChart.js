import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line import/extensions
import { Line } from 'react-chartjs-2';
import s from './AssetInvestorChart.scss';
import { options } from './config';
import useChartTranslate from './useChartTranslate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const AssetsInvestorChart = props => {
  const { data } = props;
  const { chartData } = useChartTranslate({ data });

  return (
    <>
      <div className={s.container}>
        <Line options={options} data={chartData} />
      </div>
    </>
  );
};
AssetsInvestorChart.propTypes = {
  data: PropTypes.array.isRequired,
};
export default withStyles(s)(AssetsInvestorChart);
