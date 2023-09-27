import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import opportunityService from '../../../../../../service/opportunityService';
import s from './PersonalInfoForm.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { getOpportunitiesAction } from '../../../../../../store/opportunities/opportunities.actions';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */

const PersonalInfoForm = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
    opportunityId,
  } = props;
  const { personalInfoStatus } = stateData;
  const primary = identification?.personalInfoStatus;
  const { firstName, lastName, nationalCode, rejectedByQC, levantId } =
    identificationWithDocs || {};

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const onEditAction = async (value, name) => {
    const newName = name.toString();
    const body = {
      personalInfo: {
        [newName]: value,
      },
    };
    await opportunityService.editIdentificationInfo(
      levantId,
      opportunityId,
      body,
    );
    reload();
  };

  const renderField = (
    text,
    name,
    val,
    withEdit = true,
    hasValidation = false,
  ) => (
    <CPLabel label={text} className={cs('col-md-4', s.input)}>
      <CPInput
        value={val || ''}
        disabled
        hasValidation={hasValidation}
        name={name}
        onEditAction={onEditAction}
        withEdit={withEdit}
      />
    </CPLabel>
  );

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>مشخصات شخصی</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={personalInfoStatus}
            item="personalInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className={cs('row', s.additionalInfo)}>
        {renderField('نام', 'firstName', firstName, true, true)}
        {renderField('نام خانوادگی', 'lastName', lastName, true, true)}
        {renderField('کد ملی', 'nationalCode', nationalCode, false, false)}
      </div>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

PersonalInfoForm.defaultProps = {
  identificationWithDocs: null,
  identification: null,
  opportunityId: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  identification: state.opportunities.identificationData,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(memo(PersonalInfoForm)));
export const PersonalInfoFormTest = PersonalInfoForm;
