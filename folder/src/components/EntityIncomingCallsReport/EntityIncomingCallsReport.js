import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityIncomingCallsReport.scss';
import LineChart from '../LineChart';
import CPCard from '../CP/CPCard';

const lineData = [
  {
    key: 0,
    dataKey: 'inComingCount',
    stroke: '#ffc658',
  },
  {
    key: 1,
    dataKey: 'outComingCount',
    stroke: '#61beca',
  },
];

class EntityIncomingCallsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, data } = this.props;

    return (
      <div className={cs(s.entityIncomingCallsReport, className)}>
        <CPCard>
          <div className={s.chartArea}>
            <LineChart data={data} lineData={lineData} />
          </div>
        </CPCard>
      </div>
    );
  }
}

const mapState = state => ({
  data: state.reports.data,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(EntityIncomingCallsReport));
export const EntityIncomingCallsReportTest = EntityIncomingCallsReport;

EntityIncomingCallsReport.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
};

EntityIncomingCallsReport.defaultProps = {
  className: null,
  data: [],
};
