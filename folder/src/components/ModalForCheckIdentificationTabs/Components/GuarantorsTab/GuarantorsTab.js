/* eslint-disable react/jsx-no-bind */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GuarantorsTab.scss';
import CPTab from '../../../CP/CPTab/CPTab';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import GuarantorsTabContent from './components/GuarantorsTabContent';

const StackHoldersTab = props => {
  const { guarantors, stateData, handleChange, identification } = props;

  const { guarantorsStatus } = stateData;
  const primary = identification?.guarantorsStatus;

  const tabs = guarantors?.map((item, index) => ({
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
      <GuarantorsTabContent
        data={item}
        stateData={stateData}
        handleChange={handleChange}
      />
    ),
  }));

  return (
    <div className={s.card_contaienr}>
      <div className={s.docsHeader}>
        <span>ضامنین</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={guarantorsStatus}
            item="guarantorsStatus"
          />
        </div>
      </div>
      <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
    </div>
  );
};

StackHoldersTab.propTypes = {
  guarantors: PropTypes.array.isRequired,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identification: PropTypes.object,
};
StackHoldersTab.defaultProps = {
  identification: null,
};
const mapState = state => ({
  identification: state.opportunities.identificationData,
  guarantors:
    state.opportunities?.identificationWithDocsData?.guarantorsDto?.guarantors,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(memo(withStyles(s)(StackHoldersTab)));
export const StackHoldersTabTest = StackHoldersTab;
