import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LegalInformationTab from './Components/LegalInformationTab';
import CheckIdentificationTabsDocuments from '../../../CheckIdentificationTabsDocuments';
import InquiryBusinessInfo from './Components/InquiryBusinessInfo/InquiryBusinessInfo';

const ComponyInfoTab = props => {
  const {
    className,
    stateData,
    handleChange,
    businessDocument,
    productCode,
  } = props;
  const title = productCode === 'KYM' ? 'مدارک کسب و کار' : 'مدارک شرکت';

  const renderAdditionalInfo = () => {
    switch (productCode) {
      case 'KYB':
        return <InquiryBusinessInfo />;
      case 'KIAN_NON_ETF_NEDA_FUND_BUSINESS':
        return <InquiryBusinessInfo />;
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <LegalInformationTab stateData={stateData} handleChange={handleChange} />
      {renderAdditionalInfo()}
      <CheckIdentificationTabsDocuments
        documentToken={businessDocument}
        title={title}
        stateData={stateData}
        handleChange={handleChange}
      />
    </div>
  );
};

ComponyInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  businessDocument: PropTypes.object,
  productCode: PropTypes.string.isRequired,
};

ComponyInfoTab.defaultProps = {
  className: null,
  businessDocument: {},
};

const mapState = state => ({
  businessDocument:
    state.opportunities?.identificationWithDocsData?.businessDocumentDTOS,
  productCode: state.opportunities.currentUser?.productCode,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(memo(ComponyInfoTab));
export const ComponyInfoTabTest = ComponyInfoTab;
