import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KianTable from '../../../../../components/KianTable/KianTable';
import { schema } from './schema';
import { searchData } from './searchData';
import { PORTFOLIO_TRANSACTION_HISTORY_TAB } from '../../../../../store/settings/settings.constants';

const TransactionHistoryTab = props => {
  const { selectedFund, loading, levantId } = props;

  const url = {
    ETF: `portfolio/kd-fund/transactions/etf/${levantId}`,
    NonETF: `portfolio/kd-fund/${selectedFund?.dsCode}/transactions/non-etf/${levantId}`,
  };

  return (
    <>
      {!loading && (
        <KianTable
          endpoint={url[selectedFund?.type]}
          searchData={searchData}
          withSort={false}
          tableId={PORTFOLIO_TRANSACTION_HISTORY_TAB}
          columns={schema}
          headerTitle="گردش مالی"
          persistInLocalStorage={false}
        />
      )}
    </>
  );
};
TransactionHistoryTab.propTypes = {
  selectedFund: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  levantId: PropTypes.string,
};
TransactionHistoryTab.defaultProps = {
  levantId: '',
};
const mapStateToProps = state => ({
  selectedFund: state.portfolio?.selectedFund,
  loading: state.portfolio?.selectedFundLoading,
});
export default connect(mapStateToProps, null)(TransactionHistoryTab);
