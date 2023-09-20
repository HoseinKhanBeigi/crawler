import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityOutgoingCallsReport.scss';
import LineChart from '../LineChart';
import CPCard from '../CP/CPCard';

const data = [
  { key: 1, name: 'کسب اطلاعات', uv: 4000, pv: 2400, amt: 2400 },
  { key: 2, name: 'مشکل قرارداد', uv: 3000, pv: 1398, amt: 2210 },
  { key: 3, name: 'ارائه مستندات', uv: 2000, pv: 9800, amt: 2290 },
  { key: 4, name: 'فراموشی رمز', uv: 2780, pv: 3908, amt: 2000 },
  { key: 5, name: 'تغییر آدرس', uv: 1890, pv: 4800, amt: 2181 },
  { key: 6, name: 'تغییر زمان', uv: 2390, pv: 3800, amt: 2500 },
  { key: 7, name: 'عدم آپلود مدارک', uv: 3490, pv: 4300, amt: 2100 },
  { key: 7, name: 'عدم دانلود نرم افزار', uv: 2000, pv: 7000, amt: 2800 },
  { key: 7, name: 'اختلال در نرم افزار', uv: 3490, pv: 5500, amt: 2220 },
  { key: 7, name: 'نصب نرم افزار', uv: 1890, pv: 6000, amt: 2600 },
  { key: 7, name: 'قطع تماس', uv: 3490, pv: 3700, amt: 2450 },
];

const lineData = [
  {
    key: 0,
    dataKey: 'pv',
    stroke: '#ffc658',
  },
  {
    key: 1,
    dataKey: 'uv',
    stroke: '#61beca',
  },
];

class EntityOutgoingCallsReport extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={cs(s.entityOutgoingCallsReport, className)}>
        <CPCard>
          <div className={s.chartArea}>
            <LineChart data={data} lineData={lineData} />
          </div>
        </CPCard>
      </div>
    );
  }
}

EntityOutgoingCallsReport.propTypes = {
  className: PropTypes.string,
};

EntityOutgoingCallsReport.defaultProps = {
  className: null,
};

export default withStyles(s)(EntityOutgoingCallsReport);
export const EntityOutgoingCallsReportTest = EntityOutgoingCallsReport;
