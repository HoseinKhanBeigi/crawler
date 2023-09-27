/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { connect } from 'react-redux';
import s from './ModalForUploadDocuments.scss';
import CPModal from '../CP/CPModal';
import UploadInput from '../ModalForUploadDocuemntsInput';
import { postCreateDocumentsByLevantIdAction } from '../../store/documentToken/documentToken.actions';
import documentTypes from './documentTypes.json';
import CPNotification from '../CP/CPNotification';
import CPButton from '../CP/CPButton';
import { anyModalClose } from '../../store/opportunities/opportunities.actions';

// const { Item } = Form;

class ModalForUploadDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => ({
    fileList: [{ type: documentTypes[0]?.value, file: [] }],
  });

  closeModal = () => {
    this.props.anyModalClose();
    this.setState(this.initialState());
  };

  handleNew = () => {
    const fileList = [...this.state.fileList];
    const type =
      documentTypes[fileList.length]?.value || documentTypes[0]?.value;
    fileList.push({ type, file: [] });
    this.setState({ fileList });
  };

  handleChangeFile = index => ({ fileList: file, event }) => {
    const fileList = [...this.state.fileList];
    fileList[index].file = file;
    this.setState({ fileList });

    /**
     * Show error and remove file on error
     */
    if (!event && file[0].status === 'error') {
      CPNotification(' آپلود مدرک با خطا رو برو شد! ', '', 'error', 5);
      fileList[index].file = [];
      this.setState({ fileList });
    }
  };

  isValidForm = () =>
    this.state.fileList.every(item => item?.file?.[0]?.status === 'done');

  /**
   * Submit uploaded files to server
   */
  handleSubmit = () => {
    const { opportunityId, levantId } = this.props;
    const { fileList } = this.state;
    // first check all files are uploaded
    if (this.isValidForm()) {
      // TODO post data
      const documentDTO = fileList.map(doc => ({
        documentType: doc.type,
        opportunityId,
        path: doc?.file?.[0]?.response?.[0]?.token,
      }));
      this.props.postCreateDocumentsByLevantIdAction({
        levantId,
        body: documentDTO,
      });
    }
  };

  handleChangeType = index => value => {
    const fileList = [...this.state.fileList];
    fileList[index].type = value;
    this.setState({ fileList });
  };

  handleRemove = index => () => {
    const fileList = [...this.state.fileList];
    fileList.splice(index, 1);
    if (!fileList.length) {
      fileList.push({ type: documentTypes[0]?.value, file: [] });
    }
    this.setState({ fileList });
  };

  render() {
    const { fileList } = this.state;
    const { className, visible, token, applicationName, loading } = this.props;

    return (
      <CPModal
        title="آپلود مدارک"
        visible={visible}
        footer={false}
        onCancel={this.closeModal}
        className={cs(s.root, className)}
        width={700}
      >
        <div className={s.simpleCard}>
          <div className={s.titleContainer}>
            <p className={s.title}>آپلود مدارک</p>
            <CPButton
              type="primary"
              shape="circle"
              icon="plus"
              onClick={this.handleNew}
            />
          </div>
          {fileList.map((item, index) => (
            <UploadInput
              key={fileList[index]}
              handleChangeFile={this.handleChangeFile}
              handleChangeType={this.handleChangeType}
              handleNew={this.handleNew}
              handleRemove={this.handleRemove}
              lastItem={index + 1 === fileList.length}
              fileList={fileList[index]}
              index={index}
              token={token}
              applicationName={applicationName}
            />
          ))}
          <br />
          <div className="d-flex justify-content-end">
            <CPButton
              onClick={this.handleSubmit}
              type="primary"
              disabled={!this.isValidForm()}
              loading={loading}
            >
              ثبت
            </CPButton>
            &ensp;
            <CPButton onClick={this.closeModal}>انصراف</CPButton>
          </div>
        </div>
      </CPModal>
    );
  }
}

ModalForUploadDocuments.propTypes = {
  className: PropTypes.string,
  postCreateDocumentsByLevantIdAction: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  opportunityId: PropTypes.string,
  token: PropTypes.string,
  levantId: PropTypes.string,
  applicationName: PropTypes.string,
  anyModalClose: PropTypes.func.isRequired,
};

ModalForUploadDocuments.defaultProps = {
  className: null,
  visible: false,
  opportunityId: null,
  token: null,
  levantId: null,
  applicationName: null,
};

const mapState = state => ({
  visible: state.opportunities.anyModalVisible === 'modalForUploadDocuments',
  token: state.user.data && state.user.data.access_token,
  applicationName: state.getProducts.selected,
  opportunityId: state.opportunities?.currentUser?.id || '',
  levantId: state.opportunities?.currentUser?.levantId || '',
  loading: state.documentToken.createDocumentsByLevantIdLoading,
});

const mapDispatch = {
  postCreateDocumentsByLevantIdAction,
  anyModalClose,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForUploadDocuments));
export const ModalForUploadDocumentsTest = ModalForUploadDocuments;
