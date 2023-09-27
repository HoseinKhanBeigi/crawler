import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BusinessLead.scss';
import LeadProfileTimelineAndActivity from '../components/LeadProfileTimelineAndActivity/LeadProfileTimelineAndActivity';
import LeadProfileGeneralInfoSection from '../components/LeadProfileGeneralInfoSection';
import LeadProfileInfoTabs from '../components/LeadProfileInfoTabs/LeadProfileInfoTabs';

const BusinessLead = ({ leadInfo }) => (
  <div className={s.container}>
    <div className={s.item_1}>
      <LeadProfileTimelineAndActivity leadInfo={leadInfo} isBusinessLead />
    </div>
    <div className={s.item_2}>
      <LeadProfileGeneralInfoSection isBusinessLead />
    </div>
    <div className={s.item_3}>
      <LeadProfileInfoTabs isBusinessLead />
    </div>
  </div>
);

BusinessLead.propTypes = {
  leadInfo: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  levantId: PropTypes.string.isRequired,
};

BusinessLead.defaultProps = {
  leadInfo: null,
};
const mapStateToProps = state => ({
  leadInfo: state.lead.data,
});

export default connect(mapStateToProps, null)(withStyles(s)(BusinessLead));
