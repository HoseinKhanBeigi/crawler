import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cs from 'classnames';
import s from './ModalForCheckIdentification.scss';
import CPModal from '../../components/CP/CPModal';
import ModalForCheckIdentificationRejection from '../ModalForCheckIdentificationRejection';
import ModalForCheckIdentificationTabs from '../ModalForCheckIdentificationTabs';
import ModalForCheckIdentificationSubmit from '../ModalForCheckIdentificationSubmit';
import Link from '../Link';
import {
  anyModalClose,
  opportunityCardLoadingStart,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  opportunityCardLoadingStop,
  anyModalOpen,
  saveReturnIdentificationData,
} from '../../store/opportunities/opportunities.actions';

class ModalForCheckIdentification extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsToState(props);
  }

  // reset state on close/open
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      if (nextProps.visible === false) {
        // reset state
        this.setState(this.getPropsToState({}));
      } else {
        // set state by props
        const state = this.getPropsToState(nextProps);
        this.setState(state);
      }
    }
  }

  getPropsToState = props => {
    const {
      rejectDesc = null,
      personalInfoStatus = null,
      certificateStatus = null,
      contactStatus = null,
      bankAccountsStatus = null,
      fetchSejamDataStatus = null,
      shebaNoStatus = null,
      nationalCardFrontStatus = null,
      nationalCardBackStatus = null,
      educationCertificateStatus = undefined,
      businessContactStatus = null,
      businessInfoStatus = null,
      logoStatus = null,
      licenseStatus = null,
      ownershipStatus = null,
      workInfoStatus = null,
      stages,
      accountTurnoverStatus,
      chequeStatus,
      collateralOrganizationCodeStatus,
      payrollStatus,
      stakeHoldersStatus,
      kycSelfieImageStatus,
      kycSignatureImageStatus,
      kycVideoCaptchaStatus,
      // kyb_leasing
      financialInfoStatus,
      creditScoreStatus,
      personScoreStatus,
      officialNewspaperStatus,
      statuteStatus,
      establishmentAnnouncementStatus,
      // Naft leasing
      facilityDetailStatus,
      guarantorsStatus,
      sanaConfirmationStatus,
      paycheckScanStatus,
      bankDraftStatus,
      leaseContractStatus,
      bankAccountPrintStatus,
      wageAssignmentStatus,
      signatureVerificationStatus,
      guarantyLetterStatus,
    } = props.identification || {};
    const rejectTypes = props?.identification?.rejectTypes || [];

    return {
      stateData: {
        rejectDesc,
        rejectTypes,
        personalInfoStatus,
        financialInfoStatus,
        certificateStatus,
        contactStatus,
        nationalCardFrontStatus,
        nationalCardBackStatus,
        educationCertificateStatus,
        // business data
        businessContactStatus,
        businessInfoStatus,
        logoStatus,
        licenseStatus,
        ownershipStatus,
        bankAccountsStatus,
        fetchSejamDataStatus,
        shebaNoStatus,
        workInfoStatus,
        stages,
        // collateral data
        accountTurnoverStatus,
        chequeStatus,
        collateralOrganizationCodeStatus,
        payrollStatus,
        stakeHoldersStatus,
        kycSelfieImageStatus,
        kycSignatureImageStatus,
        kycVideoCaptchaStatus,
        // kyb_leasing
        creditScoreStatus,
        personScoreStatus,
        officialNewspaperStatus,
        statuteStatus,
        establishmentAnnouncementStatus,
        // NaftLeasing
        facilityDetailStatus,
        guarantorsStatus,
        sanaConfirmationStatus,
        paycheckScanStatus,
        bankDraftStatus,
        leaseContractStatus,
        bankAccountPrintStatus,
        wageAssignmentStatus,
        signatureVerificationStatus,
        guarantyLetterStatus,
      },
    };
  };

  handleChange = (key, value) => {
    const { stateData } = this.state;
    this.setState({ stateData: { ...stateData, [key]: value } });
  };

  closeModal = async props => {
    await props.anyModalClose();
    if (props.returnIdentification?.id) {
      // props.getDocumentTokenByLevantIdAction({ levantId, product });
      await props.opportunityCardLoadingStart(props.returnIdentification?.id);
      await props.getIdentificationAction(props.returnIdentification?.id);
      await props.getIdentificationWithDocsAction(
        props.returnIdentification?.id,
      );
      await props.opportunityCardLoadingStop(props.returnIdentification?.id);
      props.anyModalOpen('modalForCheckIdentification');
      Object.entries(props.returnIdentification.status).forEach(
        ([key, value]) => {
          this.handleChange(key, value);
        },
      );
      props.saveReturnIdentificationData(null, null, null);
    }
  };
  render() {
    const { stateData } = this.state;
    const { className, visible, currentUser } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <CPModal
        title="بررسی اطلاعات"
        visible={visible}
        footer={false}
        onCancel={() => this.closeModal(this.props)}
        className={cs(s.modalForCheckIdentification, className)}
      >
        {currentUser?.startOnboardingFor === 'PARENTS' && (
          <div className={s.navTo}>
            این فرصت متعلق به دیگری است. برای مشاهده حساب ولی{' '}
            <Link to={`/lead/${currentUser?.authorizedLevantId}`} target>
              <b>کلیک</b>
            </Link>{' '}
            کنید
          </div>
        )}
        <div style={{ padding: '20px' }}>
          <ModalForCheckIdentificationTabs
            stateData={stateData}
            handleChange={this.handleChange}
          />
          <ModalForCheckIdentificationRejection
            stateData={stateData}
            handleChange={this.handleChange}
          />
          <ModalForCheckIdentificationSubmit
            stateData={stateData}
            handleChange={this.handleChange}
          />
        </div>
      </CPModal>
    );
  }
}

ModalForCheckIdentification.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  currentUser: PropTypes.object,
};

ModalForCheckIdentification.defaultProps = {
  className: null,
  visible: false,
  currentUser: {},
};

const mapState = state => ({
  visible:
    state.opportunities.anyModalVisible === 'modalForCheckIdentification',
  identification: state.opportunities.identificationData,
  returnIdentification: state.opportunities.returnIdentification,
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
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
)(withStyles(s)(ModalForCheckIdentification));
export const ModalForCheckIdentificationTest = ModalForCheckIdentification;
