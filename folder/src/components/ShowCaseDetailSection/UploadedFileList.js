import React from 'react';
import { Icon, Row } from 'antd';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ShowCaseDetailSection.scss';
import glusterService from '../../service/glusterService';

const UploadedFileList = props => {
  const { files } = props;
  let key = 0;

  const handleDownloadFile = ({ token, path }) => {
    glusterService.downloadFile(path, token);
  };

  const renderFilesList = () =>
    files.map((value, index) => {
      const { path, token } = value;
      key = index + 1;
      const name = path.split('/').pop();
      return (
        <div className={s.upload_file_display} key={key}>
          <span className={s.name}>{name}</span>
          <Icon
            type="download"
            className={s.icon}
            onClick={() => handleDownloadFile({ path, token })}
          />
        </div>
      );
    });

  return (
    <>
      <Row
        gutter={24}
        type="flex"
        align="middle"
        style={{
          paddingRight: '15px',
          marginTop: '20px',
        }}
      >
        <span className={s.fileUploadTitle}>فایل های پیوست شده</span>
        {renderFilesList()}
      </Row>
    </>
  );
};
UploadedFileList.propTypes = {
  files: PropTypes.array,
};
UploadedFileList.defaultProps = {
  files: [],
};
export default UploadedFileList;
