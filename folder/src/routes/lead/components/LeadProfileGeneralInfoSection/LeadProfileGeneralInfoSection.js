import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withModal from '../../../../components/HOC/withModal';
// eslint-disable-next-line css-modules/no-unused-class
import s from './LeadProfileGeneralInfoSection.scss';
import PersonLeadGeneralInfoSection from './components/PersonLeadGeneralInfoSection';
import BusinessLeadGeneralInfoSection from './components/BusinessLeadGeneralInfoSection';

const LeadProfileGeneralInfoSection = props => (
  <div className={cs(s.container, props.isBusinessLead && s.business)}>
    {props.isBusinessLead ? (
      <BusinessLeadGeneralInfoSection />
    ) : (
      <PersonLeadGeneralInfoSection />
    )}
  </div>
);

LeadProfileGeneralInfoSection.propTypes = {
  isBusinessLead: PropTypes.bool,
};

LeadProfileGeneralInfoSection.defaultProps = {
  isBusinessLead: false,
};

export default withModal(LeadProfileGeneralInfoSection);
