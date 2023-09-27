import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from './LeadProfileInfoTabs.scss';
import { getDocumentTypesAction } from '../../../../store/documentToken/documentToken.actions';
import { getUserTagsListAction } from '../../../../store/tag/tag.actions';
import { getLeadRelationsAction } from '../../../../store/lead/lead.actions';
import {
  getPersonsCompanyProfileAction,
  getBusinessRelationProfileAction,
} from '../../../../store/leads/leads.actions';
import personLeadTabs from './utils/personLeadTabs';
import CPTab from '../../../../components/CP/CPTab';
import businessLeadTabs from './utils/businessLeadTabs';
import kycLevelService from '../../../../service/kycLevelService';

const LeadProfileInfoTabs = props => {
  const {
    documentTypes,
    userTagsList,
    leadOpportunitiesList,
    levantId,
    productList,
    isBusinessLead,
    relations,
    userId,
    company,
    persons,
  } = props;

  const [kycLevels, setKycLevels] = useState(null);

  useEffect(() => {
    if (levantId && userId) {
      kycLevelService
        .getLeadKycLevel(levantId)
        .then(({ result }) => setKycLevels(result));
    }
  }, [levantId, userId]);

  useEffect(() => {
    if (isBusinessLead) {
      props.getLeadRelationsAction(levantId);
      props.getBusinessRelationProfileAction(levantId);
    } else {
      props.getUserTagsListAction(levantId);
      props.getPersonsCompanyProfileAction(levantId);
    }
  }, []);

  return (
    <div className={s.generalInfoSection}>
      <CPTab
        defaultKey="1"
        tabPane={
          isBusinessLead
            ? businessLeadTabs({
                documentTypes,
                relations,
                persons,
              })
            : personLeadTabs({
                productList,
                leadOpportunitiesList,
                documentTypes,
                userTagsList,
                kycLevels,
                company,
              })
        }
        size="small"
        position="right"
      />
    </div>
  );
};
LeadProfileInfoTabs.propTypes = {
  getLeadRelationsAction: PropTypes.func.isRequired,
  getBusinessRelationProfileAction: PropTypes.func.isRequired,
  getUserTagsListAction: PropTypes.func.isRequired,
  getPersonsCompanyProfileAction: PropTypes.func.isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object),
  leadOpportunitiesList: PropTypes.array,
  productList: PropTypes.array,
  userTagsList: PropTypes.object,
  levantId: PropTypes.string,
  userId: PropTypes.number,
  isBusinessLead: PropTypes.bool,
  relations: PropTypes.object.isRequired,
  company: PropTypes.array.isRequired,
  persons: PropTypes.array.isRequired,
};
LeadProfileInfoTabs.defaultProps = {
  documentTypes: [],
  productList: [],
  userTagsList: null,
  levantId: '',
  userId: null,
  leadOpportunitiesList: [],
  isBusinessLead: false,
};
const mapStateToProps = state => ({
  documentTypes: state?.documentToken?.getDocumentTypesData,
  userTagsList: state?.tag?.userTagsList,
  leadOpportunitiesList: state?.opportunity?.data,
  productList: state?.lead?.data?.productList,
  levantId: state?.lead?.data?.levantId,
  userId: state.lead.data?.id,
  relations: state?.lead?.leadRelationsData,
  company: state?.leads?.getPersonsCompanyProfileData,
  persons: state?.leads?.getBusinessRelationProfileData,
});

const mapDispatch = {
  getDocumentTypesAction,
  getUserTagsListAction,
  getLeadRelationsAction,
  getPersonsCompanyProfileAction,
  getBusinessRelationProfileAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(LeadProfileInfoTabs));
