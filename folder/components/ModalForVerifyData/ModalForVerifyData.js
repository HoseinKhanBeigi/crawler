import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForVerifyData.scss';
import CPModal from '../CP/CPModal';
import PreviewImage from '../PreviewImage';
import Link from '../Link';
import ModalForVerifyDataRenderDocs from '../ModalForVerifyDataRenderDocs';
import ModalForVerifyDataRenderUserInfo from '../ModalForVerifyDataRenderUserInfo';
import { anyModalClose } from '../../store/opportunities/opportunities.actions';

// Add crm activity log

/**
 * modal for verify/edit data
 * this modal open on ['modalForUserProfileEditButton', 'modalForConfirmByQc', 'modalForVerifyData']
 * modal types (enum):
 * `modalForUserProfileEditButton` is in user profile page.
 * `modalForConfirmByQc` is in opportunities page.
 * `modalForVerifyData` is in opportunities page.
 */
class ModalForVerifyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      imgInformation: null,
      shouldSaveBusinessAdditionalInfo: false,
    };
  }

  getDocuments = () => {
    const documentToken = this.props.documentToken || [];
    const businessDocumentToken = this.props.businessDocumentToken || [];

    const documents = {};
    documentToken.forEach(item => {
      documents[item.type] = item;
    });
    businessDocumentToken.forEach(item => {
      documents[item.type] = item;
    });

    return documents;
  };

  getTitle = () => {
    const { currentUser } = this.props;

    return currentUser?.actions?.[0].name || 'تایید و تکمیل اطلاعات';
  };

  // close image preview
  closePreview = () => {
    this.setState({
      preview: null,
    });
  };

  closeModal = () => {
    this.props.anyModalClose();
  };

  handleChange = (key, value, item) => {
    this.setState({ [key]: value, imgInformation: item });
  };

  renderUserInfo = () => (
    <ModalForVerifyDataRenderUserInfo
      isBusiness={this.props.isBusiness}
      inProfile={this.props.profileLevantId}
      shouldSaveBusinessAdditionalInfo={
        this.state.shouldSaveBusinessAdditionalInfo
      }
    />
  );

  renderUserDocs = isBis => (
    <>
      <ModalForVerifyDataRenderDocs
        documents={this.getDocuments()}
        handleChange={this.handleChange}
        preview={this.state.preview}
        isBusiness={isBis}
      />
      {this.state.preview && (
        <PreviewImage
          preview={this.state.preview}
          closePreview={this.closePreview}
          imgInformation={this.state.imgInformation}
        />
      )}
    </>
  );

  render() {
    const {
      className,
      visible,
      isBusiness,
      currentUser,
      currentModal,
    } = this.props;

    const isOtherOnboarding =
      (currentModal === 'modalForVerifyData' ||
        currentModal === 'modalForConfirmByQc') &&
      currentUser?.startOnboardingFor === 'PARENTS';
    return (
      <CPModal
        title={this.getTitle()}
        visible={visible}
        footer={false}
        onCancel={this.closeModal}
        className={cs(visible && s.modalForVerifyData, className)}
        width={1400}
      >
        {isOtherOnboarding && (
          <div className={s.navTo}>
            این فرصت متعلق به دیگری است. برای مشاهده حساب ولی{' '}
            <Link to={`/lead/${currentUser?.authorizedLevantId}`} target>
              <b>کلیک</b>
            </Link>{' '}
            کنید
          </div>
        )}

        {visible && (
          <div className="row">
            <div className="col-md-4">{this.renderUserInfo()}</div>
            <div className="col-md-8">{this.renderUserDocs(isBusiness)}</div>
          </div>
        )}
      </CPModal>
    );
  }
}

ModalForVerifyData.propTypes = {
  anyModalClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  documentToken: PropTypes.array,
  businessDocumentToken: PropTypes.array,
  // identificationWithDocs: PropTypes.object,
  isBusiness: PropTypes.bool,
  profileLevantId: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  currentModal: PropTypes.string,
  currentUser: PropTypes.object,
};

ModalForVerifyData.defaultProps = {
  className: null,
  documentToken: null,
  businessDocumentToken: null,
  // identificationWithDocs: null,
  isBusiness: false,
  profileLevantId: null,
  currentModal: '',
  currentUser: {},
};

const mapState = state => ({
  identificationWithDocs:
    state.opportunities.anyModalVisible === 'modalForUserProfileEditButton'
      ? state.opportunities.getIdentificationByLevantIdData
      : state.opportunities.identificationWithDocsData,
  visible: [
    'modalForVerifyData',
    'modalForConfirmByQc',
    'modalForUserProfileEditButton',
  ].includes(state.opportunities.anyModalVisible),
  identification: state.opportunities.identificationData,
  currentModal: state.opportunities.anyModalVisible,
  saveIdentificationLoading: state.opportunities.saveIdentificationLoading,
  isBusiness: state.opportunities.verifyModalType.isBusiness,
  documentToken: state.opportunities?.identificationWithDocsData?.documentDTOS,
  businessDocumentToken:
    state.opportunities?.identificationWithDocsData?.businessDocumentDTOS,
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
  anyModalClose,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVerifyData));
export const ModalForVerifyDataTest = ModalForVerifyData;
