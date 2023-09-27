import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cs from 'classnames';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SejamInfoFields.scss';
import SejamDetailInfoTab from './SejamDetailInfoTab';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { fullName } from '../../../../../../utils';

class SejamInfoFields extends React.Component {
  render() {
    const { stateData } = this.props;
    const { identification, identificationWithDocs } = this.props;
    const { stages } = stateData;
    // this code say based on every things is in stages show data no bankAccounts TODO:this code could be better if service changes...
    const defaultSejamInfo = stages.find(value => value === 'fetchSejamData');
    const { rejectedByQC } = identificationWithDocs;
    const { fetchSejamDataStatus } = stateData;

    return (
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>مشخصات سجام</span>
          <div className={s.radioBox}>
            <ApproveButton
              fetchSejamStatus={fetchSejamDataStatus}
              handleChange={this.props.handleChange}
              primaryValue={identification?.fetchSejamDataStatus}
              value={
                defaultSejamInfo === 'fetchSejamData' && fetchSejamDataStatus
              }
              item={
                defaultSejamInfo === 'fetchSejamData' && 'fetchSejamDataStatus'
              }
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
        <div className={cs('row', s.additionalInfo)}>
          <SejamDetailInfoTab
            identificationWithDocs={identificationWithDocs}
            defaultSejamInfo={defaultSejamInfo}
            accountOwner={fullName(identificationWithDocs)}
            stateData={stateData}
            handleChange={this.props.handleChange}
          />
        </div>
      </div>
    );
  }
}

SejamInfoFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  identification: PropTypes.object,
  identificationWithDocs: PropTypes.object,
  stateData: PropTypes.object.isRequired,
};

SejamInfoFields.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

export default connect(mapState, null)(withStyles(s)(SejamInfoFields));
// export const ModalForCheckIdentificationTabBankProfileFieldsTest = SejamInfoFields;
