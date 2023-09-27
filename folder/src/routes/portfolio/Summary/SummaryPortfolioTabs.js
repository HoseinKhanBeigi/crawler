import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from '../../../utils/aclActions';
import CPTab from '../../../components/CP/CPTab/CPTab';
import AssetsTabsReport from './components/AssetsTabsReport/AssetsTabsReport';
import TransactionHistoryTab from './components/TransactionHistoryTab';
import OrderHistoryTab from './components/OrderHistoryTab/';

const SummaryPortfolioTabs = props => {
  const { levantId } = props;
  const tabs = [
    {
      key: 3,
      tab: 'گردش مالی',
      authority: Actions.leadSearch,
      children: <TransactionHistoryTab levantId={levantId} />,
    },
    {
      key: 2,
      authority: Actions.leadSearch,
      tab: 'وضعیت',
      children: <AssetsTabsReport levantId={levantId} />,
    },
    {
      key: 1,
      authority: Actions.persoanlOpprotunitesListTab,
      tab: 'سابقه سرمایه گذاری',
      children: <OrderHistoryTab levantId={levantId} />,
    },
  ];
  return <CPTab defaultKey="1" tabPane={tabs} size="small" />;
};
SummaryPortfolioTabs.propTypes = {
  levantId: PropTypes.string,
};
SummaryPortfolioTabs.defaultProps = {
  levantId: '',
};
export default SummaryPortfolioTabs;
