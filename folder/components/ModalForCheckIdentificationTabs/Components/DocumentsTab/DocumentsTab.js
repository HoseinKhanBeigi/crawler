import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import CheckIdentificationTabsDocuments from '../../../CheckIdentificationTabsDocuments/CheckIdentificationTabsDocuments';
import s from './DocumentsTab.scss';

const DocumentsTab = props => {
  const {
    className,
    stateData,
    handleChange,
    identificationWithDocs,
    documents,
    identification,
  } = props;
  const { businessDocumentsStatus } = stateData;
  const { rejectedByQC } = identificationWithDocs || {};
  const primary = identification?.personalInfoStatus;
  return (
    <div className={className}>
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>اسناد حقوقی</span>
          <div className={s.radioBox}>
            <ApproveButton
              handleChange={handleChange}
              primaryValue={primary}
              value={businessDocumentsStatus}
              item="businessDocumentsStatus"
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
        <CheckIdentificationTabsDocuments
          withTitle={false}
          documentToken={documents}
          stateData={stateData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

DocumentsTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  documents: PropTypes.array,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
};

DocumentsTab.defaultProps = {
  className: null,
  documents: [],
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  documents:
    state.opportunities?.identificationWithDocsData?.businessDocumentDTOS,
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(memo(withStyles(s)(DocumentsTab)));
export const ModalForCheckIdentificationTabPersonalProfileTest = DocumentsTab;
