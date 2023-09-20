import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import s from './LineChart.scss';

const LineChart = props => {
  const { data, lineData } = props;

  return (
    <ResponsiveContainer>
      <Chart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {lineData.map(item => (
          <Line
            type="monotone"
            dataKey={item.dataKey}
            key={item.code || item.key}
            stroke={item.stroke}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  lineData: PropTypes.arrayOf(PropTypes.object),
};

LineChart.defaultProps = {
  data: [],
  lineData: [],
};

export default withStyles(s)(memo(LineChart));
