import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KianTable from '../../../../../components/KianTable/KianTable';
import { schemaETF, schemaNoneETF } from './schema';
import { searchDataETF, searchDataNoneETF } from './searchData';
import CPLoding from '../../../../../components/CP/CPLoading';
import { PORTFOLIO_ORDER_HISTORY_NOE_ETF_TAB } from '../../../../../store/settings/settings.constants';

const schema = {
  ETF: schemaETF,
  NonETF: schemaNoneETF,
};
const searchData = {
  ETF: searchDataETF,
  NonETF: searchDataNoneETF,
};
const OrderHistoryTab = props => {
  const { selectedFund, levantId, loading } = props;
  const { dsCode, type } = selectedFund || {};
  return (
    <>
      {selectedFund && !loading ? (
        <KianTable
          endpoint={`portfolio/kd-fund/${dsCode}/orders/${levantId}`}
          searchData={searchData[type]}
          withSort={false}
          tableId={PORTFOLIO_ORDER_HISTORY_NOE_ETF_TAB}
          columns={schema[type]}
          headerTitle="سابقه سرمایه گذاری"
          persistInLocalStorage={false}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CPLoding
            spinning
            tip="در حال بروزرسانی لیست سابقه سرمایه گذاری..."
          />
        </div>
      )}
    </>
  );
};
OrderHistoryTab.propTypes = {
  selectedFund: PropTypes.object.isRequired,
  levantId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
OrderHistoryTab.defaultProps = {
  levantId: '',
};
const mapStateToProps = state => ({
  selectedFund: state.portfolio?.selectedFund,
  loading: state.portfolio?.selectedFundLoading,
});
export default connect(mapStateToProps, null)(OrderHistoryTab);
