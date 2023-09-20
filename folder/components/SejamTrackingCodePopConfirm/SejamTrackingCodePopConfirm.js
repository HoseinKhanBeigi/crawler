import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './SejamTrackingCodePopConfirm.scss';
import CPInput from '../CP/CPInput';
import { getSejamTradingCodeAction } from '../../store/opportunities/opportunities.actions';

const SejamTrackingCodePopConfirm = props => {
  useEffect(() => {
    props.getSejamTradingCodeAction(props.opportunityId);
  }, []);

  const { className, data } = props;
  return (
    <div className={cs('SejamTrackingCode', className)}>
      <b>کد پیگیری سجام صحیح می باشد؟</b>
      <CPInput
        value={data?.sejamCode}
        disabled
        className="margin-b-10 margin-t-10"
        size="small"
      />
    </div>
  );
};

SejamTrackingCodePopConfirm.propTypes = {
  opportunityId: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.object,
  getSejamTradingCodeAction: PropTypes.func.isRequired,
};

SejamTrackingCodePopConfirm.defaultProps = {
  opportunityId: '',
  className: '',
  data: null,
};

const mapState = state => ({
  data: state.opportunities.getSejamTradingCodeData,
});

const mapDispatch = {
  getSejamTradingCodeAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(SejamTrackingCodePopConfirm));
export const SejamTrackingCodePopConfirmTest = SejamTrackingCodePopConfirm;
