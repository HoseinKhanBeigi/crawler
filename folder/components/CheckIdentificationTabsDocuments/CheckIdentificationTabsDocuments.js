import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './CheckIdentificationTabsDocuments.scss';
import LazyImage from '../LazyImage/LazyImage';
import PreviewImage from '../PreviewImage/PreviewImage';
import ApproveButton from '../ApproveButton/ApproveButton';
import { docType } from '../../utils/docType';

class CheckIdentificationTabsDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      previewData: null,
    };
  }

  documnetFactory = (documentToken, stateData, documents) => {
    const personalDocsData = [];
    const {
      certificateStatus,
      certificateDescriptionStatus,
      nationalCardFrontStatus,
      nationalCardBackStatus,
      educationCertificateStatus,
      agentSentenceStatus,
      licenseStatus,
      cvStatus,
      businessPermitStatus,
      signOfficersStatus,
      depositaryLetterStatus,
      foreManCardStatus,
      // leasing_kyb
      officialNewspaperStatus,
      statuteStatus,
      establishmentAnnouncementStatus,
      signatureImageStaus,
      // lesing naft
      sanaConfirmationStatus,
      paycheckScanStatus,
      bankDraftStatus,
      leaseContractStatus,
      bankAccountPrintStatus,
      wageAssignmentStatus,
      signatureVerificationStatus,
      guarantyLetterStatus,
    } = stateData;
    const {
      BIRTH_CERTIFICATE,
      BIRTH_CERTIFICATE_DESCRIPTION,
      NATIONAL_CARD_FRONT,
      NATIONAL_CARD_BACK,
      EDUCATION,
      CV,
      AGENT_SENTENCE,
      BUSINESS_LICENSE,
      BUSINESS_PERMIT,
      SIGN_OFFICERS,
      DEPOSITARY_LETTER,
      FOREMAN_CARD,
      STATUTE,
      ESTABLISHMENT_ANNOUNCEMENT,
      OFFICIAL_NEWSPAPER,
      SIGNATURE_IMAGE,
      SANA_CONFIRMATION,
      PAYCHECK_SCAN,
      BANK_DRAFT,
      LEASE_CONTRACT,
      BANK_ACCOUNT_PRINT,
      WAGE_ASSIGNMENT,
      SIGNATURE_VERIFICATION,
      GUARANTY_LETTER,
    } = documents;

    const documentStatusName = {
      BIRTH_CERTIFICATE: 'certificateStatus',
      BIRTH_CERTIFICATE_DESCRIPTION: 'certificateDescriptionStatus',
      NATIONAL_CARD_FRONT: 'nationalCardFrontStatus',
      NATIONAL_CARD_BACK: 'nationalCardBackStatus',
      EDUCATION: 'educationCertificateStatus',
      CV: 'cvStatus',
      AGENT_SENTENCE: 'agentSentenceStatus',
      BUSINESS_LICENSE: 'licenseStatus',
      BUSINESS_PERMIT: 'businessPermitStatus',
      SIGN_OFFICERS: 'signOfficersStatus',
      DEPOSITARY_LETTER: 'depositaryLetterStatus',
      FOREMAN_CARD: 'foreManCardStatus',
      SIGNATURE_IMAGE: 'signatureImageStaus',
      // leasing_kyb
      STATUTE: 'statuteStatus',
      ESTABLISHMENT_ANNOUNCEMENT: 'establishmentAnnouncementStatus',
      OFFICIAL_NEWSPAPER: 'officialNewspaperStatus',
      SANA_CONFIRMATION: 'sanaConfirmationStatus',
      PAYCHECK_SCAN: 'paycheckScanStatus',
      BANK_DRAFT: 'bankDraftStatus',
      LEASE_CONTRACT: 'leaseContractStatus',
      BANK_ACCOUNT_PRINT: 'bankAccountPrintStatus',
      WAGE_ASSIGNMENT: 'wageAssignmentStatus',
      SIGNATURE_VERIFICATION: 'signatureVerificationStatus',
      GUARANTY_LETTER: 'guarantyLetterStatus',
    };

    const documentStatusValue = {
      BIRTH_CERTIFICATE: certificateStatus,
      BIRTH_CERTIFICATE_DESCRIPTION: certificateDescriptionStatus,
      NATIONAL_CARD_FRONT: nationalCardFrontStatus,
      NATIONAL_CARD_BACK: nationalCardBackStatus,
      EDUCATION: educationCertificateStatus,
      CV: cvStatus,
      AGENT_SENTENCE: agentSentenceStatus,
      BUSINESS_LICENSE: licenseStatus,
      BUSINESS_PERMIT: businessPermitStatus,
      SIGN_OFFICERS: signOfficersStatus,
      DEPOSITARY_LETTER: depositaryLetterStatus,
      FOREMAN_CARD: foreManCardStatus,
      STATUTE: statuteStatus,
      ESTABLISHMENT_ANNOUNCEMENT: establishmentAnnouncementStatus,
      OFFICIAL_NEWSPAPER: officialNewspaperStatus,
      SIGNATURE_IMAGE: signatureImageStaus,
      SANA_CONFIRMATION: sanaConfirmationStatus,
      PAYCHECK_SCAN: paycheckScanStatus,
      BANK_DRAFT: bankDraftStatus,
      LEASE_CONTRACT: leaseContractStatus,
      BANK_ACCOUNT_PRINT: bankAccountPrintStatus,
      WAGE_ASSIGNMENT: wageAssignmentStatus,
      SIGNATURE_VERIFICATION: signatureVerificationStatus,
      GUARANTY_LETTER: guarantyLetterStatus,
    };

    const renderedDocDocument = {
      BIRTH_CERTIFICATE: this.renderDocument(BIRTH_CERTIFICATE),
      BIRTH_CERTIFICATE_DESCRIPTION: this.renderDocument(
        BIRTH_CERTIFICATE_DESCRIPTION,
      ),
      NATIONAL_CARD_FRONT: this.renderDocument(NATIONAL_CARD_FRONT),
      NATIONAL_CARD_BACK: this.renderDocument(NATIONAL_CARD_BACK),
      EDUCATION: this.renderDocument(EDUCATION),
      CV: this.renderDocument(CV),
      AGENT_SENTENCE: this.renderDocument(AGENT_SENTENCE),
      BUSINESS_LICENSE: this.renderDocument(BUSINESS_LICENSE),
      BUSINESS_PERMIT: this.renderDocument(BUSINESS_PERMIT),
      SIGN_OFFICERS: this.renderDocument(SIGN_OFFICERS),
      DEPOSITARY_LETTER: this.renderDocument(DEPOSITARY_LETTER),
      FOREMAN_CARD: this.renderDocument(FOREMAN_CARD),
      STATUTE: this.renderDocument(STATUTE),
      ESTABLISHMENT_ANNOUNCEMENT: this.renderDocument(
        ESTABLISHMENT_ANNOUNCEMENT,
      ),
      OFFICIAL_NEWSPAPER: this.renderDocument(OFFICIAL_NEWSPAPER),
      SIGNATURE_IMAGE: this.renderDocument(SIGNATURE_IMAGE),
      SANA_CONFIRMATION: this.renderDocument(SANA_CONFIRMATION),
      PAYCHECK_SCAN: this.renderDocument(PAYCHECK_SCAN),
      BANK_DRAFT: this.renderDocument(BANK_DRAFT),
      LEASE_CONTRACT: this.renderDocument(LEASE_CONTRACT),
      BANK_ACCOUNT_PRINT: this.renderDocument(BANK_ACCOUNT_PRINT),
      WAGE_ASSIGNMENT: this.renderDocument(WAGE_ASSIGNMENT),
      SIGNATURE_VERIFICATION: this.renderDocument(SIGNATURE_VERIFICATION),
      GUARANTY_LETTER: this.renderDocument(GUARANTY_LETTER),
    };

    documentToken.map(item => {
      const obj = {
        text: docType[item.type] || 'مدرک جدید بدون نام',
        name: documentStatusName[item.type] || 'not valid document',
        val: documentStatusValue[item.type] || 'not valid document',
        doc: renderedDocDocument[item.type] || 'not valid document',
      };
      personalDocsData.push(obj);
      return item;
    });
    return personalDocsData;
  };

  // close image preview
  closePreview = () => {
    this.setState({
      preview: null,
    });
  };

  /**
   * render documents card
   * @param cards (array): [text, name, val, doc]
   */
  renderCard = cards => {
    const {
      identification,
      identificationWithDocs: { rejectedByQC },
      withAction,
    } = this.props;
    return cards?.map(item => {
      const { text, name, val, doc } = item;
      if (!val) {
        return false; // do not render any doc that they dont have any status.
      }
      const primaryValue = identification[name];

      return (
        <div className={s.card}>
          <div className={s.header}>{text}</div>
          <div className={s.body}>{doc}</div>
          {withAction && (
            <div className={s.footer}>
              <ApproveButton
                handleChange={this.props.handleChange}
                primaryValue={primaryValue}
                value={val}
                item={name}
                rejectedByQC={rejectedByQC}
              />
            </div>
          )}
        </div>
      );
    });
  };

  /**
   * A method to render the image documents
   * @param document
   */
  renderDocument = document => {
    if (!document?.files) {
      return <p>سندی یافت نشد</p>;
    }
    return (
      <div className={s.docsCardWrapper}>
        {document?.files?.map(item => (
          <LazyImage
            key={item?.path}
            path={item?.path}
            objectToken={item}
            className={s.download}
            onClick={objectURL => {
              this.setState({
                preview: objectURL,
                previewData: item,
              });
            }}
          />
        ))}
      </div>
    );
  };

  render() {
    const { stateData, title, withTitle } = this.props;
    const documentToken = this.props.documentToken || [];
    const { preview, previewData } = this.state;

    const documents = {};
    documentToken.forEach(item => {
      documents[item.type] = item;
    });

    const personalDocsData = this.documnetFactory(
      documentToken,
      stateData,
      documents,
    );

    return (
      <div className={s.root}>
        {withTitle && (
          <div className={s.docsHeader}>
            <span>{title}</span>
          </div>
        )}
        <div className={preview && s.hidden}>
          {this.renderCard(personalDocsData)}
        </div>
        <PreviewImage
          closePreview={this.closePreview}
          preview={preview}
          imgInformation={previewData}
        />
      </div>
    );
  }
}

CheckIdentificationTabsDocuments.propTypes = {
  handleChange: PropTypes.func.isRequired,
  withAction: PropTypes.bool,
  stateData: PropTypes.object.isRequired,
  identification: PropTypes.object,
  identificationWithDocs: PropTypes.object,
  documentToken: PropTypes.object,
  title: PropTypes.string,
  withTitle: PropTypes.bool,
};

CheckIdentificationTabsDocuments.defaultProps = {
  identification: null,
  documentToken: [],
  identificationWithDocs: {},
  title: 'مدارک شخصی',
  withTitle: true,
  withAction: true,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

export default connect(
  mapState,
  null,
)(withStyles(s)(CheckIdentificationTabsDocuments));
