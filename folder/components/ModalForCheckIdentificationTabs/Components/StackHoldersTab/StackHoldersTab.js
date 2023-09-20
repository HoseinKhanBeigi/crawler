/* eslint-disable react/jsx-no-bind */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StakeHoldersTab.scss';
import CPTab from '../../../CP/CPTab';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import StackHoldersTabContent from './components/StackHoldersTabContent';
import InquiryStakeholderInfo from './components/InquiryStakeholderInfo/InquiryStakeholderInfo';

const StackHoldersTab = props => {
  const {
    stakeHolders,
    stateData,
    handleChange,
    identification,
    productCode,
  } = props;

  const { stakeHoldersStatus } = stateData;
  const primary = identification?.stakeHoldersStatus;

  const tabs = stakeHolders?.map((item, index) => ({
    key: index + 1,
    tab: (
      <div className={s.tab_container}>
        <div className={s.tab_name}>{`${item.firstName} ${item.lastName}`}</div>
        <div>
          {item.partyStatus === 'KYC' || item.partyStatus === 'ACTIVE' ? (
            <Icon
              type="check"
              style={{ backgroundColor: '#13c29a' }}
              className={s.icon_tab}
            />
          ) : (
            <Icon
              type="exclamation"
              style={{ backgroundColor: '#faad14' }}
              className={s.icon_tab}
            />
          )}
          <Icon
            type="left"
            style={{
              color: '#d5d5d5',
              fontSize: '10px',
              display: 'inline',
              marginLeft: '-8px',
            }}
          />
        </div>
      </div>
    ),
    children: (
      <StackHoldersTabContent
        data={item}
        stateData={stateData}
        handleChange={handleChange}
      />
    ),
  }));

  const renderAdditionalInfo = () => {
    switch (productCode) {
      case 'KYB':
        return <InquiryStakeholderInfo />;
      case 'KIAN_NON_ETF_NEDA_FUND_BUSINESS':
        return <InquiryStakeholderInfo />;
      default:
        return null;
    }
  };

  return (
    <div className={s.card_contaienr}>
      <div className={s.docsHeader}>
        <span>مشخصات اعضا</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={stakeHoldersStatus}
            item="stakeHoldersStatus"
          />
        </div>
      </div>
      <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
      {renderAdditionalInfo()}
    </div>
  );
};

StackHoldersTab.propTypes = {
  stakeHolders: PropTypes.array.isRequired,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identification: PropTypes.object,
  productCode: PropTypes.string.isRequired,
};
StackHoldersTab.defaultProps = {
  identification: null,
};
const mapState = state => ({
  identification: state.opportunities.identificationData,
  stakeHolders:
    state.opportunities?.identificationWithDocsData?.businessStakeholdersDto
      ?.stakeholders,
  productCode: state.opportunities.currentUser?.productCode,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(memo(withStyles(s)(StackHoldersTab)));
export const StackHoldersTabTest = StackHoldersTab;
