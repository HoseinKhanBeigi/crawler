import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessLeadDescription from '../BusinessLeadDescription/BusinessLeadDescription';

const BusinessLeadContactsInfoTab = ({ businessLeadContactsData }) => {
  const contactData = businessLeadContactsData[0];
  const data = [
    { title: 'آدرس', data: contactData?.street },
    {
      title: 'تلفن',
      data: `${contactData?.tel || '---'} - ${contactData?.telPrefix || '---'}`,
    },
    { title: 'کد پستی', data: contactData?.postalCode },
    { title: 'ایمیل', data: contactData?.emailAddress },
    { title: 'وبسایت', data: contactData?.webSiteAddress },
  ];
  return <BusinessLeadDescription data={data} />;
};

BusinessLeadContactsInfoTab.propTypes = {
  businessLeadContactsData: PropTypes.array,
};

BusinessLeadContactsInfoTab.defaultProps = {
  businessLeadContactsData: [],
};

const mapStateToProps = state => ({
  businessLeadContactsData: state.lead?.data?.contacts,
});

export default connect(mapStateToProps)(BusinessLeadContactsInfoTab);
