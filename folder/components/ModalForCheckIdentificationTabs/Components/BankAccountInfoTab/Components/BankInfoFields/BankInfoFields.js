import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cs from 'classnames';
// eslint-disable-next-line css-modules/no-unused-class
import s from './BankInfoFields.scss';
import BankDetailInfoTab from './BankDetailInfoTab';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { fullName } from '../../../../../../utils';

class BankInfoFields extends React.Component {
  render() {
    const { identification, stateData, identificationWithDocs } = this.props;
    const { stages } = stateData;
    // this code say based on every things is in stages show data no bankAccounts TODO:this code could be better if service changes...
    const defaultBankInfo = stages.find(
      value => value === 'shebaNo' || value === 'bankAccounts',
    );
    const { bankAccounts, rejectedByQC, shebaNo } = identificationWithDocs;
    const primaryValue =
      defaultBankInfo === 'bankAccounts'
        ? identification?.bankAccountsStatus
        : identification?.shebaNoStatus;
    const { bankAccountsStatus, shebaNoStatus } = stateData;
    return (
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>مشخصات بانکی</span>
          <div className={s.radioBox}>
            <ApproveButton
              handleChange={this.props.handleChange}
              primaryValue={primaryValue}
              value={
                defaultBankInfo === 'bankAccounts'
                  ? bankAccountsStatus
                  : shebaNoStatus
              }
              item={
                defaultBankInfo === 'bankAccounts'
                  ? 'bankAccountsStatus'
                  : 'shebaNoStatus'
              }
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
        <div className={cs('row', s.additionalInfo)}>
          <BankDetailInfoTab
            bankAccounts={bankAccounts}
            shebaNo={shebaNo}
            defaultBankInfo={defaultBankInfo}
            accountOwner={fullName(identificationWithDocs)}
          />
        </div>
      </div>
    );
  }
}

BankInfoFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  identification: PropTypes.object,
  identificationWithDocs: PropTypes.object,
  stateData: PropTypes.object.isRequired,
};

BankInfoFields.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

export default connect(mapState, null)(withStyles(s)(BankInfoFields));
export const ModalForCheckIdentificationTabBankProfileFieldsTest = BankInfoFields;
