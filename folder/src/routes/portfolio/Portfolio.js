import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Portfolio.scss';
import SidebarMenu from './FundsSidebar/SidebarMenu';
import SummaryPortfolioTabs from './Summary/SummaryPortfolioTabs';

const Portfolio = props => {
  // eslint-disable-next-line no-unused-vars
  const { levantId } = props;
  return (
    <>
      <div className={s.container}>
        <div className={s.item_1}>
          <SidebarMenu levantId={levantId} />
        </div>
        <div className={s.item_2}>
          <SummaryPortfolioTabs levantId={levantId} />
        </div>
      </div>
    </>
  );
};
Portfolio.propTypes = {
  levantId: PropTypes.string,
};
Portfolio.defaultProps = {
  levantId: '',
};
export default withStyles(s)(Portfolio);
