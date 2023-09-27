import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import s from './ModalForUploadDocuemntsInput.scss';
import CPButton from '../CP/CPButton';
import CPModal from '../CP/CPModal';
import CPSelect from '../CP/CPSelect';
import documentTypes from '../ModalForUploadDocuments/documentTypes.json';

// TODO in /api/v1/document/{levantId}/documentToken id is not required, and path is same is token response
// TODO USE form data to change filename: https://developer.mozilla.org/en-US/docs/Web/API/FormData/set

function ModalForUploadDocumentsInput(props) {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
  });

  function handleCancel() {
    setState({ previewVisible: false });
  }

  function handlePreview(file) {
    setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  const {
    handleRemove,
    index,
    handleChangeFile,
    handleChangeType,
    fileList,
    token,
    applicationName,
  } = props;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Application-Name': applicationName,
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className={s.uploadText}>انتخاب فایل</div>
    </div>
  );

  return (
    <div className={s.container}>
      <div className={s.upload}>
        <Upload
          headers={headers}
          accept="image/*"
          action="//sit.kiandigital.com/glusterproxy/api/v1/file/upload/"
          listType="picture-card"
          fileList={fileList.file}
          onPreview={handlePreview}
          onChange={handleChangeFile(index)}
          onRemove={handleRemove(index)}
          name="files"
          multiple
        >
          {fileList.file.length ? null : uploadButton}
        </Upload>
      </div>
      <CPModal
        visible={state.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="سند" style={{ width: '100%' }} src={state.previewImage} />
      </CPModal>
      <CPSelect
        className="col"
        size="large"
        defaultValue={fileList.type}
        dataSource={documentTypes}
        onChange={handleChangeType(index)}
        showSearch
      />
      <CPButton
        type="danger"
        shape="circle"
        icon="close"
        size="large"
        onClick={handleRemove(index)}
      />
    </div>
  );
}

ModalForUploadDocumentsInput.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleChangeFile: PropTypes.func.isRequired,
  handleChangeType: PropTypes.func.isRequired,
  fileList: PropTypes.array,
  index: PropTypes.number,
  applicationName: PropTypes.string,
  token: PropTypes.string,
};

ModalForUploadDocumentsInput.defaultProps = {
  fileList: [],
  index: null,
  applicationName: null,
  token: null,
};

export default withStyles(s)(ModalForUploadDocumentsInput);
