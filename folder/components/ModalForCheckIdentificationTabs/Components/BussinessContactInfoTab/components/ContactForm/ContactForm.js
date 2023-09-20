import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import opportunityService from '../../../../../../service/opportunityService';
import s from './ContactForm.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { getOpportunitiesAction } from '../../../../../../store/opportunities/opportunities.actions';
import { isProductEditableSelector } from '../../../../utils';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */

const ContactForm = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
    opportunityId,
    isEditable,
  } = props;
  const { businessContactStatus } = stateData;
  const primary = identification?.businessContactStatus;
  const { businessContacts } = identificationWithDocs;
  const { rejectedByQC, levantId } = businessContacts;

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const onEditAction = async (value, name) => {
    const newName = name.toString();
    const body = {
      businessContacts: {
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
    <CPLabel label={text} className={cs('col-md-6', s.input)}>
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
        <span>اطلاعات تماس</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={businessContactStatus}
            item="businessContactStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      {businessContacts?.map(item => (
        <div className={cs('row', s.additionalInfo)}>
          {renderField('آدرس', 'street', item?.street, isEditable, true)}
          {renderField('تلفن', 'tel', item?.tel, isEditable, true)}
          {renderField(
            'کد پستی',
            'postalCode',
            item?.postalCode,
            isEditable,
            true,
          )}
          {item?.webSite &&
            item?.webSite !== 'null' &&
            renderField('وبسایت', 'webSite', item?.webSite, isEditable, true)}
          {item?.emailAddress &&
            item?.emailAddress !== 'null' &&
            renderField(
              'ایمیل',
              'emailAddress',
              item?.emailAddress,
              isEditable,
              true,
            )}
        </div>
      ))}
    </div>
  );
};

ContactForm.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

ContactForm.defaultProps = {
  identificationWithDocs: null,
  identification: null,
  opportunityId: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  identification: state.opportunities.identificationData,
  isEditable: isProductEditableSelector(state),
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(memo(ContactForm)));
export const ContactFormTest = ContactForm;
