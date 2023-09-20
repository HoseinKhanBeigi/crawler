import React from 'react';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewCaseDetailDrawerUploadList.scss';
import glusterService from '../../../../service/glusterService';

const ViewCaseDetailDrawerUploadList = props => {
  const handleDownloadFile = ({ token, path }) => {
    glusterService.downloadFile(path, token);
  };

  return (
    <div className={s.wrapper}>
      <Upload
        onDownload={({ token, path }) => {
          handleDownloadFile({ token, path });
        }}
        defaultFileList={props.files.map((i, x) => ({
          uid: x, // unique identifier, negative is recommend, to prevent interference with internal generated id
          name: i.path.split('/').slice(-1)[0], // file name
          status: 'done', // options：uploading, done, error, removed
          token: i.token,
          path: i.path,
        }))}
      />
    </div>
  );
};

ViewCaseDetailDrawerUploadList.propTypes = {
  files: PropTypes.object.isRequired,
};
export default withStyles(s)(ViewCaseDetailDrawerUploadList);
