import React, { useRef, useState } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForDisplayUserDocs.scss';
import LazyImage from '../../../LazyImage';
import CPModal from '../../../CP/CPModal';
import {
  getDocumentFilesAction,
  postPrintActivityAction,
} from '../../../../store/documentToken/documentToken.actions';
import { getCrmActivitiesAction } from '../../../../store/newActivities/newActivities.actions';
import { pageSizeInTableList } from '../../../../webConfig';
import { MODAL_FOR_DISPLAY_USER_DOCS } from '../../repository';
import glusterService from '../../../../service/glusterService';

const pagination = `page=0&size=${pageSizeInTableList}`;

const ModalForDisplayUserDocs = props => {
  const componentRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const {
    title,
    className,
    documentType,
    documentFiles,
    targetLevantId,
  } = props;

  const closeModal = () => {
    setVisible(false);
  };

  const submitLogActivity = async () => {
    const body = {
      documentType,
      targetLevantId,
      title,
      token: documentFiles?.token,
      url: documentFiles?.path,
    };
    const response = await props.postPrintActivityAction(body);
    if (!response.err) {
      props.getCrmActivitiesAction({
        levantId: targetLevantId,
        pagination,
      });
    }

    return false;
  };

  const handleDownload = () => {
    const { path, token } = documentFiles;
    glusterService.downloadFile(path, token);
  };

  return (
    <div className={cs('ModalForDisplayUserDocs', className)}>
      <CPModal
        visible={visible}
        title={`تصویر ${title}`}
        footer={null}
        onCancel={closeModal}
        fullWidthHeight
        className="max_modal"
        modalType={MODAL_FOR_DISPLAY_USER_DOCS}
      >
        <div className={s.preview}>
          <div className={s.previewActions}>
            <p className={s.previewTitle}>پیش نمایش</p>
            <ReactToPrint
              trigger={() => (
                <span>
                  <Icon className={cs(s.previewAction)} type="printer" />
                </span>
              )}
              content={() => componentRef.current}
              onAfterPrint={submitLogActivity}
            />
            <Icon
              className={cs(s.previewAction)}
              type="download"
              onClick={handleDownload}
            />
          </div>
          <LazyImage
            hasZoom
            className={s.img}
            path={documentFiles?.path}
            objectToken={{ token: documentFiles?.token }}
            ref={el => {
              componentRef.current = el;
            }}
          />
        </div>
      </CPModal>
    </div>
  );
};

ModalForDisplayUserDocs.propTypes = {
  className: PropTypes.string,
  documentFiles: PropTypes.object,
  title: PropTypes.string,
  postPrintActivityAction: PropTypes.func.isRequired,
  getCrmActivitiesAction: PropTypes.func.isRequired,
  documentType: PropTypes.string,
  targetLevantId: PropTypes.string,
};

ModalForDisplayUserDocs.defaultProps = {
  className: null,
  documentFiles: null,
  title: null,
  documentType: null,
  targetLevantId: null,
};

const mapStateToProps = state => ({
  documentFiles: state.documentToken.getDocumentFilesData,
  targetLevantId: state.neshanAuth?.jwt?.levantId,
});

const mapDispatch = {
  getDocumentFilesAction,
  postPrintActivityAction,
  getCrmActivitiesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForDisplayUserDocs));
export const ModalForDisplayUserDocsTest = ModalForDisplayUserDocs;
