import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessLeadDescription from '../BusinessLeadDescription/BusinessLeadDescription';

const BusinessLeadGeneralInfoTab = ({ partyIdentifiersData }) => {
  const data = [
    {
      title: 'دسته بندی',
      data: partyIdentifiersData.category,
    },
    {
      title: 'نوع کسب و کار',
      data: partyIdentifiersData.subCategory,
    },
    {
      title: 'شماره مالیاتی',
      data: partyIdentifiersData.taxPayerCode,
    },
    {
      title: 'شناسه ملی',
      data: partyIdentifiersData.nationalCode,
    },
  ];
  return <BusinessLeadDescription data={data} />;
};

BusinessLeadGeneralInfoTab.propTypes = {
  partyIdentifiersData: PropTypes.array,
};

BusinessLeadGeneralInfoTab.defaultProps = {
  partyIdentifiersData: {},
};

const mapStateToProps = state => ({
  partyIdentifiersData: state.lead?.data?.partyBusiness,
});

export default connect(mapStateToProps)(BusinessLeadGeneralInfoTab);
