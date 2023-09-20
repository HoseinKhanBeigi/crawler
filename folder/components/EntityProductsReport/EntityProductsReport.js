import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityProductsReport.scss';
import CPCard from '../CP/CPCard';
import LineChart from '../LineChart';

const data = [
  { key: 1, name: 'اطلاعات فردی شخص اصلی', active_user: 0 },
  { key: 2, name: 'ملاقات', active_user: 55 },
  { key: 3, name: 'ارسال اطلاعات', active_user: 33 },
  { key: 4, name: 'تایید', active_user: 2 },
  { key: 5, name: 'تایید پروداکت', active_user: 1 },
  { key: 6, name: 'فرم ها و مرسولات', active_user: 0 },
  { key: 7, name: 'بررسی ملاقات', active_user: 6 },
  { key: 7, name: 'مراجعه ی حضوری', active_user: 25 },
];

const lineData = [
  {
    key: 1,
    dataKey: 'active_user',
    stroke: '#61beca',
  },
];

class EntityProductsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className } = this.props;

    return (
      <div className={cs(s.entityProductsReport, className)}>
        <CPCard>
          <div className={s.chartArea}>
            <LineChart data={data} lineData={lineData} />
          </div>
        </CPCard>
      </div>
    );
  }
}

EntityProductsReport.propTypes = {
  className: PropTypes.string,
};

EntityProductsReport.defaultProps = {
  className: null,
};

export default withStyles(s)(EntityProductsReport);
export const EntityProductsReportTest = EntityProductsReport;
