import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import opportunityService from '../../../../../../service/opportunityService';
import s from './LegalInformationTab.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { getOpportunitiesAction } from '../../../../../../store/opportunities/opportunities.actions';
import {
  getProductCodeSelector,
  isProductEditableSelector,
} from '../../../../utils';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */

const LegalInformationTab = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
    opportunityId,
    productCode,
    isEditable,
  } = props;
  const { businessInfoStatus } = stateData;
  const primary = identification?.businessInfoStatus;
  const {
    businessName,
    emailAddress,
    websiteAddress,
    category,
    taxPayerCode,
    registerNumber,
    subcategory,
    rejectedByQC,
    levantId,
    boardName,
    businessStakeholdersDto,
  } = identificationWithDocs || {};
  const {
    businessAdminFullName,
    businessAdminNationalCode,
  } = businessStakeholdersDto;
  const bussinessFieldName =
    productCode === 'KYM' ? 'نام کسب و کار' : 'نام تجاری';
  const reload = () => {
    props.getOpportunitiesAction();
  };

  const onEditAction = async (value, name) => {
    const newName = name.toString();
    const body = {
      businessInfoDTO: {
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

  const renderAdditionalInfo = () => {
    const EmailAndWebsiteInput = (
      <>
        {renderField('ایمیل', 'emailAddress', emailAddress, false, false)}
        {renderField('وبسایت', 'websiteAddress', websiteAddress, false, false)}
      </>
    );
    switch (productCode) {
      case 'KYB':
        return EmailAndWebsiteInput;
      case 'KIAN_NON_ETF_NEDA_FUND_BUSINESS':
        return EmailAndWebsiteInput;
      case 'KYM':
        return renderField('نام تابلو', 'boardName', boardName, true, false);
      default:
        return null;
    }
  };

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>اطلاعات حقوقی</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={businessInfoStatus}
            item="businessInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className={cs('row', s.additionalInfo)}>
        {renderField(
          bussinessFieldName,
          'name',
          businessName,
          isEditable,
          true,
        )}
        {productCode !== 'KYM' &&
          renderField(
            'شماره مالیاتی',
            'taxPayerCode',
            taxPayerCode,
            isEditable,
            true,
          )}
        {renderField(
          'شماره ثبت',
          'registerNumber',
          registerNumber,
          false,
          false,
        )}
        {renderField(
          'دسته بندی',
          'subcategory',
          subcategory,
          isEditable,
          false,
        )}
        {renderField('نوع کسب و کار', 'category', category, false, false)}
        {renderField(
          'نام نماینده',
          'businessAdminFullName',
          businessAdminFullName,
          false,
          false,
        )}
        {renderField(
          'کد ملی نماینده',
          'businessAdminNationalCode',
          businessAdminNationalCode,
          false,
          false,
        )}
        {renderAdditionalInfo()}
      </div>
    </div>
  );
};

LegalInformationTab.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  productCode: PropTypes.string.isRequired,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

LegalInformationTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
  opportunityId: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  identification: state.opportunities.identificationData,
  productCode: getProductCodeSelector(state),
  isEditable: isProductEditableSelector(state),
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(memo(LegalInformationTab)));
export const LegalInformationTabTest = LegalInformationTab;
