import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import s from './BarChart.scss';

class BarChart extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    barData: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    data: [],
    barData: [],
  };

  render() {
    const { data, barData } = this.props;
    return (
      <ResponsiveContainer>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {barData.map(item => (
            <Bar dataKey={item.dataKey} key={item.key} fill={item.fill} />
          ))}
        </Chart>
      </ResponsiveContainer>
    );
  }
}

export default withStyles(s)(BarChart);
