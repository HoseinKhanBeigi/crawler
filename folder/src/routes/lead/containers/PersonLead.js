import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './PersonLead.scss';
import LeadProfileTimelineAndActivity from '../components/LeadProfileTimelineAndActivity/LeadProfileTimelineAndActivity';
import ModalForVerifyData from '../../../components/ModalForVerifyData';
import LeadProfileSummaryTables from '../components/LeadProfileSummaryTables/LeadProfileSummaryTables';
import LeadProfileInfoTabs from '../components/LeadProfileInfoTabs/LeadProfileInfoTabs';
import LeadProfileGeneralInfoSection from '../components/LeadProfileGeneralInfoSection';

const PersonLead = props => (
  <div className={s.container}>
    <div className={s.item_1}>
      <LeadProfileSummaryTables leadInfo={props.leadInfo} />
    </div>
    <div className={s.item_2}>
      <LeadProfileGeneralInfoSection />
    </div>
    <div className={s.item_3}>
      <LeadProfileTimelineAndActivity leadInfo={props.leadInfo} />
    </div>
    <div className={s.item_4}>
      <LeadProfileInfoTabs />
    </div>
    <ModalForVerifyData profileLevantId={props.levantId} />
  </div>
);

PersonLead.propTypes = {
  leadInfo: PropTypes.object,
  levantId: PropTypes.string.isRequired,
};

PersonLead.defaultProps = {
  leadInfo: null,
};

const mapStateToProps = state => ({
  leadInfo: state.lead.data,
});

export default connect(mapStateToProps, null)(withStyles(s)(PersonLead));
