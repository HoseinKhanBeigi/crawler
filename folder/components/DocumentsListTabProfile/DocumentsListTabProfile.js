import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';
import Icon from '@mdi/react';
import { mdiFileImageOutline, mdiPlus } from '@mdi/js';
import {
  getDocumentFilesAction,
  getDocumentTypesAction,
} from '../../store/documentToken/documentToken.actions';
import {
  MODAL_FOR_DISPLAY_USER_DOCS,
  MODAL_FOR_UPLOAD_USER_DOCUMNET,
} from '../ModalRoot/repository';
import { docType } from '../../utils/docType';
import withModal from '../HOC/withModal';
import s from './DocumentsListTabProfile.scss';
import CPEmpty from '../CP/CPEmpty';

const DocumentsListTabProfile = props => {
  const { documentTypes, levantId } = props;

  const showImageModal = async (e, type) => {
    e.preventDefault();
    await props.getDocumentFilesAction({
      levantId,
      documentType: type,
    });
    props.showModalAction({
      type: MODAL_FOR_DISPLAY_USER_DOCS,
      props: {
        title: docType[type],
        levantId,
        documentType: type,
      },
    });
  };

  const uploadUserDocModal = () => {
    props.showModalAction({
      type: MODAL_FOR_UPLOAD_USER_DOCUMNET,
      props: {
        levantId,
      },
    });
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.upload_btn}>
          <Icon size="20px" path={mdiPlus} />
          <Button className={s.btn} type="link" onClick={uploadUserDocModal}>
            آپلود سند جدید
          </Button>
        </div>
        {documentTypes?.length ? (
          <div className={s.container__list}>
            {documentTypes.map(item => (
              <Col span={12}>
                <div className={s.doc_item}>
                  <Icon
                    size="24px"
                    path={mdiFileImageOutline}
                    className={s.doc_icon}
                  />
                  <Button
                    className={s.item_btn}
                    type="link"
                    onClick={e => showImageModal(e, item.type)}
                  >
                    {docType[item.type] || item.type}
                  </Button>
                </div>
              </Col>
            ))}
          </div>
        ) : (
          <CPEmpty description="لیست اسناد خالیست" />
        )}
      </div>
    </>
  );
};

DocumentsListTabProfile.propTypes = {
  levantId: PropTypes.string,
  showModalAction: PropTypes.func.isRequired,
  getDocumentFilesAction: PropTypes.func.isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object),
};

DocumentsListTabProfile.defaultProps = {
  documentTypes: null,
  levantId: null,
};
const mapStateToProps = state => ({
  documentTypes: state.documentToken.getDocumentTypesData,
  levantId: state.lead?.data?.levantId,
});

const mapDispatch = {
  getDocumentTypesAction,
  getDocumentFilesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(DocumentsListTabProfile)));
