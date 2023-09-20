import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForCheckIdentificationTabs.scss';
import CPTab from '../CP/CPTab';
import schema, { TabsNameStages } from './schema';

const companyTabKbProductList = [
  // KB
  'KYM',
  'BUSINESS_PERSON_KIAN_KYC',
  'KIAN_BUSINESS',
  'KYB',
  'KIAN_NON_ETF_NEDA_FUND_BUSINESS',
];

const ModalForCheckIdentificationTabs = props => {
  const {
    handleChange,
    stateData,
    identificationWithDocs,
    productCode,
    returnIdentification,
    identification,
  } = props;
  const { stages } = identification;
  const isShowCompanyTab = companyTabKbProductList.includes(productCode);
  const tabs = [];
  const showPersonScoreTab =
    productCode === 'DEMO_PERSONAL_LOAN' ||
    productCode === 'LEASING_KYB' ||
    productCode === 'PERSONAL_LOAN';

  const addTab = item => {
    const tabData = {
      key: item,
      ...schema(item, stateData, handleChange, productCode),
    };
    if (!tabs.some(({ tab }) => tab === tabData.tab)) tabs.push(tabData);
  };

  if (stateData?.contactStatus !== 'EMPTY') addTab('contactTab');

  if (stages.includes('facilityDetailStatus')) addTab('leasingFacilityTab');

  // add credit score tab
  if (productCode === 'LEASING_KYB') {
    addTab('financialInformationTab');
    addTab('KYBLeasingBussinessInfoTab');
    addTab('legalCreditScoreTab');
    addTab('DocumentsTab');
  }

  if (isShowCompanyTab) {
    addTab('companyTab');
  }

  if (
    (identificationWithDocs?.shebaNo ||
      identificationWithDocs?.bankAccounts?.length) &&
    stages.includes('bankAccounts')
  )
    addTab('bankProfileTab');

  if (stages.includes('fetchSejamData')) {
    addTab('SejamProfileTab');
  }

  if (identificationWithDocs?.collateralDocumentDTOS?.length)
    addTab('collateralInfoTab');

  stateData?.stages?.forEach(item => {
    if (TabsNameStages[item]) addTab(TabsNameStages[item]);
  });

  if (showPersonScoreTab) {
    addTab('personCreditScoreTab');
  }
  const handleDefaultActive = () => {
    if (returnIdentification?.id) {
      return 'stackHolders';
    }
    return '1';
  };
  return (
    <CPTab
      className={s.root}
      defaultKey={handleDefaultActive()}
      position="right"
      tabPane={tabs}
    />
  );
};

ModalForCheckIdentificationTabs.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identificationWithDocs: PropTypes.object.isRequired,
  identification: PropTypes.object.isRequired,
  productCode: PropTypes.string.isRequired,
  returnIdentification: PropTypes.string.isRequired,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  productCode: state.opportunities.currentUser?.productCode,
  returnIdentification: state.opportunities.returnIdentification,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(memo(ModalForCheckIdentificationTabs)));
export const ModalForCheckIdentificationTabsTest = ModalForCheckIdentificationTabs;
