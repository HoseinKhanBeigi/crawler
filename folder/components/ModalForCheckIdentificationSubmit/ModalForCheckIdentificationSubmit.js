import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForCheckIdentificationSubmit.scss';
import CPDivider from '../CP/CPDivider';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import CPPopConfirm from '../CP/CPPopConfirm';
import {
  anyModalClose,
  getOpportunitiesAction,
  putSaveIdentificationAction,
  opportunityCardLoadingStart,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  opportunityCardLoadingStop,
  anyModalOpen,
  saveReturnIdentificationData,
} from '../../store/opportunities/opportunities.actions';

class ModalForCheckIdentificationSubmit extends React.Component {
  /**
   * check all inputs are filled, and if any is rejected make sure rejectDesc and rejectTypes is entered
   * @returns {boolean}
   */
  checkInputsValidity = () => {
    const { stateData } = this.props;
    const { rejectTypes } = stateData;
    if (this.checkDocs('empty')) {
      return true;
    }
    return this.checkDocs('rejected') && rejectTypes?.length === 0;
  };

  reload = () => {
    this.props.getOpportunitiesAction();
  };

  documentFactory = ({
    certificateStatus,
    certificateDescriptionStatus,
    nationalCardFrontStatus,
    nationalCardBackStatus,
    educationCertificateStatus,
    cvStatus,
    depositaryLetterStatus,
    sanaConfirmationStatus,
    paycheckScanStatus,
    bankDraftStatus,
    leaseContractStatus,
    bankAccountPrintStatus,
    wageAssignmentStatus,
    signatureVerificationStatus,
    signatureImageStaus,
  }) => {
    const { documentToken } = this.props;
    const personalDocsList = [];

    const documentStatus = {
      BIRTH_CERTIFICATE: certificateStatus,
      BIRTH_CERTIFICATE_DESCRIPTION: certificateDescriptionStatus,
      NATIONAL_CARD_FRONT: nationalCardFrontStatus,
      NATIONAL_CARD_BACK: nationalCardBackStatus,
      EDUCATION: educationCertificateStatus,
      CV: cvStatus,
      DEPOSITARY_LETTER: depositaryLetterStatus,
      SANA_CONFIRMATION: sanaConfirmationStatus,
      PAYCHECK_SCAN: paycheckScanStatus,
      BANK_DRAFT: bankDraftStatus,
      LEASE_CONTRACT: leaseContractStatus,
      BANK_ACCOUNT_PRINT: bankAccountPrintStatus,
      WAGE_ASSIGNMENT: wageAssignmentStatus,
      SIGNATURE_VERIFICATION: signatureVerificationStatus,
      SIGNATURE_IMAGE: signatureImageStaus,
    };
    documentToken?.map(item =>
      personalDocsList.push(documentStatus[item.type]),
    );
    return personalDocsList;
  };

  /**
   * Check (Do some process on) all fields (personal, business, bank, contact, etc.)
   * @param type (string) empty/rejected/approvedPersonalDocs/approvedBusinessDocs
   * @returns boolean
   */
  checkDocs = type => {
    const {
      isBusiness,
      identification,
      identificationWithDocs,
      stateData,
      justBusiness,
    } = this.props;

    const { bankAccounts, personContacts, sejam, collateralDocumentDTOS } =
      identificationWithDocs || {};

    // console.log(identificationWithDocs,"identificationWithDocs")

    // check work address
    const workAddressInfo = personContacts?.find(item => item.type === 'WORK');
    // (final) data is an object includes identification object with overwrite values from stateData.
    const data = {
      ...identification,
      ...stateData,
    };
    const {
      // personal data
      personalInfoStatus,
      certificateStatus,
      certificateDescriptionStatus,
      nationalCardFrontStatus,
      nationalCardBackStatus,
      educationCertificateStatus,
      sanaConfirmationStatus,
      paycheckScanStatus,
      bankDraftStatus,
      leaseContractStatus,
      bankAccountPrintStatus,
      wageAssignmentStatus,
      signatureVerificationStatus,
      contactStatus,
      signatureImageStaus,
      // business data
      businessContactStatus,
      businessInfoStatus,
      logoStatus,
      licenseStatus,
      ownershipStatus,
      // bank data
      bankAccountsStatus,
      fetchSejamDataStatus,
      shebaNoStatus,
      workInfoStatus,
      // collateral data
      accountTurnoverStatus,
      chequeStatus,
      payrollStatus,
      // kyb
      agentSentenceStatus,
      stakeHoldersStatus,
      businessPermitStatus,
      signOfficersStatus,
      cvStatus,
      // kyc video
      kycSelfieImageStatus,
      kycVideoCaptchaStatus,
      // dohi PORTFOLIO_MANAGER product
      depositaryLetterStatus,
      // LEASING_KYB product status
      financialInfoStatus,
      creditScoreStatus,
      personScoreStatus,
      officialNewspaperStatus,
      statuteStatus,
      establishmentAnnouncementStatus,
      // NaftLeasing
      facilityDetailStatus,
      guarantorsStatus,
    } = data;
    function existsInStages(stageValue) {
      return stateData?.stages?.find(item => item === stageValue);
    }
    const personalDocsList = this.documentFactory({
      certificateStatus,
      certificateDescriptionStatus,
      nationalCardFrontStatus,
      nationalCardBackStatus,
      educationCertificateStatus,
      cvStatus,
      depositaryLetterStatus,
      sanaConfirmationStatus,
      paycheckScanStatus,
      bankDraftStatus,
      leaseContractStatus,
      bankAccountPrintStatus,
      wageAssignmentStatus,
      signatureVerificationStatus,
      signatureImageStaus,
    });
    // all personal information status (info, contacts, docs)
    let personalDataList = [];
    if (contactStatus !== 'EMPTY') {
      personalDataList = [
        personalInfoStatus,
        contactStatus,
        ...personalDocsList,
      ];
    } else if (this.props.partyType === 'PERSON') {
      personalDataList = [personalInfoStatus, ...personalDocsList];
    }

    const businessDocsList = [logoStatus, licenseStatus, ownershipStatus]; // only business docs
    const collateralDocsList = [
      chequeStatus,
      payrollStatus,
      accountTurnoverStatus,
    ]; // only collateral docs
    // check for opportunity is kyb onboadrding or not then create s
    let kybList =
      this.props.partyType === 'BUSINESS'
        ? [
            stakeHoldersStatus,
            agentSentenceStatus,
            licenseStatus,
            businessPermitStatus,
            businessContactStatus,
            businessInfoStatus,
            signOfficersStatus,
          ]
        : [];
    kybList = kybList.filter(value => value !== 'EMPTY');
    const businessDataList = isBusiness
      ? [businessContactStatus, businessInfoStatus, ...businessDocsList]
      : [];
    const kycVideo =
      existsInStages('kycSelfieImage') || existsInStages('kycVideoCaptcha')
        ? [kycSelfieImageStatus, kycVideoCaptchaStatus]
        : [];
    // Bank account data
    const bankDataList =
      bankAccounts && bankAccounts?.length > 0 && existsInStages('bankAccounts')
        ? [bankAccountsStatus]
        : [];
    // Sejam account data
    const sejamDataList =
      sejam && existsInStages('fetchSejamData') ? [fetchSejamDataStatus] : [];
    const shebaNoStatusData =
      shebaNoStatus !== 'EMPTY' && existsInStages('shebaNo')
        ? [shebaNoStatus]
        : [];
    // work info in sejam product
    const workInfoStatusList =
      existsInStages('workInfo') && workAddressInfo ? [workInfoStatus] : [];

    const leasingKYB =
      this.props.productCode === ''
        ? [
            financialInfoStatus,
            creditScoreStatus,
            officialNewspaperStatus,
            statuteStatus,
            establishmentAnnouncementStatus,
          ]
        : [];

    // -----------> NaftLeasing
    const facilityDetail = existsInStages('facilityDetails')
      ? [facilityDetailStatus]
      : [];
    const creditScore =
      this.props.productCode === 'DEMO_PERSONAL_LOAN' ||
      this.props.productCode === 'PERSONAL_LOAN'
        ? [personScoreStatus]
        : [];
    const guarantors = existsInStages('guarantors') ? [guarantorsStatus] : [];
    const naftLeasing = [...facilityDetail, ...guarantors, ...creditScore];

    // only check kian business data
    const justBusinessData = justBusiness
      ? [
          businessContactStatus,
          businessInfoStatus,
          logoStatus,
          licenseStatus,
          ownershipStatus,
        ]
      : [];
    /**
     * this is all EDITABLE data status that we show to crm agent.
     * if it's not a business so businessDataList is an empty array
     * if it has not any bank data so bankDataList is an empty array
     */

    const allDataList = justBusiness
      ? justBusinessData
      : [
          ...personalDataList,
          ...businessDataList,
          ...bankDataList,
          ...sejamDataList,
          ...workInfoStatusList,
          ...shebaNoStatusData,
          ...kybList,
          ...kycVideo,
          ...leasingKYB,
          ...naftLeasing,
        ];
    if (collateralDocumentDTOS?.length) {
      allDataList.push(...collateralDocsList);
    }

    /**
     * empty: looking for any field that it's not APPROVED or REJECTED.
     * rejected: looking for any REJECTED value.
     * approvedPersonalDocs: return true, if every personal fields are APPROVED.
     * approvedBusinessDocs: return true, if every business fields are APPROVED.
     */
    if (type === 'empty') {
      return allDataList.some(
        item => item !== 'APPROVED' && item !== 'REJECTED' && item !== 'EMPTY',
      );
    } else if (type === 'rejected') {
      return allDataList.some(item => item === 'REJECTED');
    } else if (type === 'approvedPersonalDocs') {
      return personalDocsList.every(item => item === 'APPROVED');
    } else if (type === 'approvedBusinessDocs') {
      return businessDocsList.every(item => item === 'APPROVED');
    }
    return null;
  };
  closeModal = async props => {
    await props.anyModalClose();
    if (props.returnIdentification?.id) {
      // props.getDocumentTokenByLevantIdAction({ levantId, product });
      await props.opportunityCardLoadingStart(props.returnIdentification.id);
      await props.getIdentificationAction(props.returnIdentification.id);
      await props.getIdentificationWithDocsAction(
        props.returnIdentification.id,
      );
      await props.opportunityCardLoadingStop(props.returnIdentification.id);
      props.anyModalOpen('modalForCheckIdentification');
      Object.entries(props.returnIdentification.status).forEach(
        ([key, value]) => {
          props.handleChange(key, value);
        },
      );
      props.saveReturnIdentificationData(null, null, null);
    }
  };

  handleSubmit = async () => {
    const { identification, stateData, opportunityId, isBusiness } = this.props;

    const data = {
      ...identification,
      ...stateData,
    };
    const {
      personalInfoStatus,
      certificateStatus,
      certificateDescriptionStatus,
      nationalCardFrontStatus,
      nationalCardBackStatus,
      cvStatus,
      contactStatus,
      businessContactStatus,
      businessInfoStatus,
      logoStatus,
      licenseStatus,
      ownershipStatus,
      stakeHoldersStatus,
      kycSelfieImageStatus,
      kycVideoCaptchaStatus,
      depositaryLetterStatus,
      businessPermitStatus,
      signOfficersStatus,
      // LEASING_KYB product status
      financialInfoStatus,
      creditScoreStatus,
      personScoreStatus,
      officialNewspaperStatus,
      statuteStatus,
      establishmentAnnouncementStatus,
    } = data;

    const personalBody = {
      personalInfoStatus,
      certificateStatus,
      certificateDescriptionStatus,
      contactStatus,
      nationalCardFrontStatus,
      cvStatus,
      nationalCardBackStatus,
      kycSelfieImageStatus,
      kycVideoCaptchaStatus,
      depositaryLetterStatus,
      businessPermitStatus,
      // LEASING_KYB product status
      financialInfoStatus,
      creditScoreStatus,
      personScoreStatus,
      officialNewspaperStatus,
      statuteStatus,
      establishmentAnnouncementStatus,
      signOfficersStatus,
      stakeHoldersStatus,
      businessContactStatus,
      businessInfoStatus,
      editPersonalInfo: personalInfoStatus !== 'APPROVED',
      editDocuments: !this.checkDocs('approvedPersonalDocs'),
      editContact: contactStatus !== 'APPROVED',
      documentsStatus: this.checkDocs('approvedPersonalDocs')
        ? 'APPROVED'
        : 'REJECTED',
    };

    const businessBody = isBusiness
      ? {
          businessContactStatus,
          businessInfoStatus,
          logoStatus,
          licenseStatus,
          ownershipStatus,
          editBusinessInfo: businessInfoStatus !== 'APPROVED',
          editBusinessDocuments: !this.checkDocs('approvedBusinessDocs'),
          editBusinessContact: businessContactStatus !== 'APPROVED',
        }
      : {};

    const body = {
      ...data,
      ...businessBody,
      ...personalBody,
      appUpdate: false,
    };

    const update = await this.props.putSaveIdentificationAction(
      body,
      opportunityId,
    );
    if (update) {
      CPMessage('ذخیره شد.', 'success');
    }
    this.closeModal(this.props);
    this.reload();
  };

  popConfirmTitle = () => {
    const { identificationWithDocs = {}, justBusiness } = this.props;
    const postalCode = identificationWithDocs?.personContacts?.map(
      item => item.postalCode,
    );

    const shebaNumber = identificationWithDocs?.shebaNo;

    if (!shebaNumber && !postalCode && !justBusiness) {
      return 'آیا تمامی موارد را بررسی کرده اید؟';
    } else if (shebaNumber && postalCode && !justBusiness) {
      return 'آیا از کد پستی و شماره شبا استعلام گرفته اید؟';
    } else if (shebaNumber && !justBusiness) {
      return 'آیا از شماره شبا استعلام گرفته اید؟';
    } else if (postalCode?.length) {
      return 'آیا از کد پستی استعلام گرفته اید؟';
    }

    return false;
  };

  renderPopConfirm = () => {
    const { identificationWithDocs = {} } = this.props;
    const { loading } = this.props;
    const postalCode = identificationWithDocs?.personContacts?.map(
      item => item.postalCode,
    );
    return postalCode.length ? (
      <CPPopConfirm
        okText="بله"
        title={this.popConfirmTitle()}
        onConfirm={this.handleSubmit}
        placement="topRight"
      >
        <CPButton
          htmlType="submit"
          type="primary"
          className="btn primary-btn margin-l-5"
          disabled={this.checkInputsValidity()}
          loading={loading}
        >
          ثبت
        </CPButton>
      </CPPopConfirm>
    ) : (
      <CPButton
        htmlType="submit"
        type="primary"
        className="btn primary-btn margin-l-5"
        onClick={this.handleSubmit}
        disabled={this.checkInputsValidity()}
        loading={loading}
      >
        ثبت
      </CPButton>
    );
  };
  render() {
    return (
      <div className={s.root}>
        <CPDivider className={s.divider} />
        <div className="text-right">
          {this.renderPopConfirm()}
          <CPButton
            onClick={() => this.closeModal(this.props)}
            className="btn default-btn"
          >
            انصراف
          </CPButton>
        </div>
      </div>
    );
  }
}

ModalForCheckIdentificationSubmit.propTypes = {
  stateData: PropTypes.object.isRequired,
  identification: PropTypes.object,
  identificationWithDocs: PropTypes.object,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
  putSaveIdentificationAction: PropTypes.func.isRequired,
  isBusiness: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  documentToken: PropTypes.array,
  justBusiness: PropTypes.bool,
  partyType: PropTypes.bool,
  productCode: PropTypes.string.isRequired,
};

ModalForCheckIdentificationSubmit.defaultProps = {
  identification: null,
  identificationWithDocs: null,
  opportunityId: null,
  loading: false,
  documentToken: null,
  justBusiness: false,
  partyType: false,
};

const mapState = state => ({
  loading: state.opportunities.saveIdentificationLoading,
  identification: state.opportunities.identificationData,
  productCode: state.opportunities.currentUser?.productCode,
  documentToken: state.documentToken.documentTokenByLevantIdData,
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  isBusiness: !!state.opportunities.identificationWithDocsData
    ?.businessLevantId,
  partyType: state.opportunities.identificationWithDocsData?.partyType,
  returnIdentification: state.opportunities.returnIdentification,
});

const mapDispatch = {
  putSaveIdentificationAction,
  getOpportunitiesAction,
  anyModalClose,
  anyModalOpen,
  opportunityCardLoadingStart,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  opportunityCardLoadingStop,
  saveReturnIdentificationData,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForCheckIdentificationSubmit));
export const ModalForCheckIdentificationSubmitTest = ModalForCheckIdentificationSubmit;
