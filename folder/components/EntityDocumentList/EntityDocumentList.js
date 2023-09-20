import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EntityDocumentList.scss';
import CPPanel from '../CP/CPPanel';
import {
  getDocumentFilesAction,
  getDocumentTypesAction,
} from '../../store/documentToken/documentToken.actions';
import CPButton from '../CP/CPButton';
import Link from '../Link';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';
import { docType } from './schema';
import withModal from '../HOC/withModal';
import { MODAL_FOR_DISPLAY_USER_DOCS } from '../ModalRoot/repository';

const EntityDocumentList = props => {
  const { documentTypes, levantId } = props;
  const docsCount = documentTypes?.length;
  const uploadForm = async () => {
    await props.anyModalOpen('modalForUploadUserDocs');
  };

  const showImg = async (e, type) => {
    e.preventDefault();
    await props.getDocumentFilesAction({
      levantId,
      documentType: type,
    });
    props.showModalAction({
      type: MODAL_FOR_DISPLAY_USER_DOCS,
      props: {
        title: docType[type]?.title,
        levantId,
        documentType: type,
      },
    });
  };

  return (
    <div className={s.entityDocumentList}>
      <CPPanel
        header={
          <span className={s.headerList}>
            اسناد
            <span className={s.count}> ({docsCount || 0}) </span>
          </span>
        }
      >
        <ul className={s.docsList}>
          {documentTypes?.map(items => (
            <li className={s.list} key={items.type}>
              <Icon type="file-image" />
              <Link
                className={s.type}
                to="/#"
                onClick={e => showImg(e, items.type)}
              >
                {docType[items.type]?.title || items.type}
              </Link>
            </li>
          ))}
        </ul>
        <CPButton className={s.uploadForm} onClick={uploadForm}>
          <Icon type="upload" />
          <span className={s.addBtnTitle}>آپلود سند جدید</span>
        </CPButton>
      </CPPanel>
    </div>
  );
};

EntityDocumentList.propTypes = {
  levantId: PropTypes.string,
  anyModalOpen: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  getDocumentFilesAction: PropTypes.func.isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object),
};

EntityDocumentList.defaultProps = {
  documentTypes: null,
  levantId: null,
};

const mapStateToProps = state => ({
  documentTypes: state.documentToken.getDocumentTypesData,
  anyModalVisible: state.opportunities.anyModalVisible,
});

const mapDispatch = {
  getDocumentTypesAction,
  getDocumentFilesAction,
  anyModalOpen,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(EntityDocumentList)));

export const EntityDocumentListTest = EntityDocumentList;
