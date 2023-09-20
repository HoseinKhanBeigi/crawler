import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Col, Row } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import s from './ModalForUploadUserDocument.scss';
import CPModal from '../../../CP/CPModal';
import { getProductFormsAction } from '../../../../store/product/product.actions';
import CPSelect from '../../../CP/CPSelect';
import { MODAL_FOR_UPLOAD_USER_DOCUMNET } from '../../repository';
import {
  getDocumentTypesAction,
  postUploadSignDocumentAction,
} from '../../../../store/documentToken/documentToken.actions';
import { postUploadFileAction } from '../../../../store/upload/upload.actions';
import CPMessage from '../../../CP/CPMessage';
import CPButton from '../../../CP/CPButton';
import { getDocAction } from '../../../../store/docDownload/docDownload.actions';

const { Dragger } = Upload;

const ModalForUploadUserDocument = props => {
  const { levantId, product } = props;
  const [list, setList] = useState(null);
  const [formId, setFormId] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    (async () => {
      await props.getProductFormsAction({ product, levantId }, true);
    })();
  }, []);

  const onChange = i => {
    const info = i;
    if (props.error) {
      CPMessage('فایل آپلود نشد', 'error');
      setList(null);
    } else {
      const newList = info.fileList.map(item => {
        const fi = item;
        fi.status = 'done';
        return fi;
      });
      setList(newList);
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  const changeForm = id => {
    const candidateDocument = props.data.find(d => d.id === id);
    setFormId(id);
    setDocumentType(candidateDocument?.code);
  };

  const uploadPdf = async () => {
    const { uploadData } = props;
    const body = [
      {
        documentType,
        formId,
        path: uploadData?.[0]?.token,
      },
    ];
    const response = await props.postUploadSignDocumentAction({
      levantId,
      body,
    });

    if (response.err) {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
      closeModal();
    } else {
      CPMessage('سند با موفقیت آپلود شد.', 'success');
      props.getDocumentTypesAction(levantId);
      closeModal();
    }
  };

  const availableForms = () => {
    const { data } = props;
    return data?.map(item => ({
      key: item.id,
      text: item.title,
      value: item.id,
    }));
  };

  const customRequest = async ({ file, onError, onSuccess }) => {
    const data = await props.postUploadFileAction({ files: file });
    if (data.err) {
      onError(data);
    }
    onSuccess(null, file);
  };

  const settings = {
    name: 'file',
    multiple: false,
    customRequest,
    accept: '.jpg,.png',
    onChange,
    removable: true,
    fileList: list,
  };

  return (
    <CPModal
      visible={visible}
      title="آپلود فایل جدید"
      modalType={MODAL_FOR_UPLOAD_USER_DOCUMNET}
      onCancel={closeModal}
      footer={null}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Col span={24} style={{ margin: '12px 0', padding: '0' }}>
            <CPSelect
              label="نوع فایل :"
              dataSource={availableForms()}
              onChange={e => {
                changeForm(e);
              }}
            />
          </Col>
          <Col span={24} style={{ margin: '12px 0', padding: '0' }}>
            <Dragger
              {...settings}
              className={
                list !== null && list?.length === 1 ? 'blocked' : 'unBlocked'
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon size="20px" path={mdiPlus} />
                <b>فایل موردنظر را آپلود نمایید</b>
              </div>
            </Dragger>
          </Col>
          <Col span={24} style={{ margin: '16px 0' }}>
            <CPButton onClick={closeModal}>انصراف</CPButton>
            <CPButton
              className="primary-btn margin-r-10"
              disabled={!list || !formId || props.error}
              onClick={() => uploadPdf()}
            >
              ثبت
            </CPButton>
          </Col>
        </Col>
      </Row>
    </CPModal>
  );
};
ModalForUploadUserDocument.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  uploadData: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  getProductFormsAction: PropTypes.func.isRequired,
  postUploadSignDocumentAction: PropTypes.func.isRequired,
  postUploadFileAction: PropTypes.func.isRequired,
  getDocumentTypesAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  product: PropTypes.string,
  error: PropTypes.object,
};

ModalForUploadUserDocument.defaultProps = {
  data: null,
  className: null,
  levantId: null,
  product: null,
  uploadData: null,
  error: null,
};

const mapStateToProps = state => ({
  data: state.product.data,
  visible: state.opportunities.anyModalVisible === 'modalForUploadUserDocs',
  product: state.getProducts.selected,
  error: state.upload.error,
  uploadData: state.upload.data,
});

const mapDispatch = {
  getProductFormsAction,
  postUploadSignDocumentAction,
  getDocAction,
  postUploadFileAction,
  getDocumentTypesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForUploadUserDocument));
export const ModalForUploadUserDocsTest = ModalForUploadUserDocument;
