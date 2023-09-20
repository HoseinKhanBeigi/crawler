import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Upload } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './CPUploadInGluster.scss';
import CPButton from '../CPButton';
import CPMessage from '../CPMessage';
import { postUploadFileAction } from '../../../store/upload/upload.actions';

const CPUploadInGluster = props => {
  const { className, title, acceptedFiles, removable, onUpload } = props;
  const [state, setPath] = useState({ path: null });

  function onChange(info) {
    const { error } = props;
    if (error?.status === 400) {
      CPMessage('فایل تکراری می باشد.', 'error');
      setPath({ path: null });
    } else if (error?.err) {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
      setPath({ path: null });
    } else {
      setPath({ path: info.fileList });
    }
  }

  async function customRequest({ onSuccess, onError, file }) {
    const data = await props.postUploadFileAction({ files: file });
    if (data.err) {
      onError(data);
    } else {
      onSuccess(null, file);
      onUpload(data);
    }
  }

  const settings = {
    name: 'file',
    customRequest,
    accept: acceptedFiles,
    onChange,
    removable,
    fileList: state.path,
  };

  return (
    <Upload {...settings} className={cs(s.cPUploadInGluster, className)}>
      <CPButton
        className="margin-t-5"
        disabled={!!(!!state.path && state?.path?.length)}
      >
        <Icon type="upload" />
        {title}
      </CPButton>
    </Upload>
  );
};

CPUploadInGluster.propTypes = {
  className: PropTypes.string,
  postUploadFileAction: PropTypes.func.isRequired,
  error: PropTypes.object,
  title: PropTypes.string,
  acceptedFiles: PropTypes.string,
  removable: PropTypes.bool,
  onUpload: PropTypes.func,
};

CPUploadInGluster.defaultProps = {
  className: '',
  error: null,
  title: 'آپلود فایل ضمیمه',
  acceptedFiles: '',
  removable: true,
  onUpload: () => {},
};

const mapStateToProps = state => ({
  error: state.upload.error,
});

const mapDispatch = {
  postUploadFileAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(CPUploadInGluster));
export const CPUploadInGlusterTest = CPUploadInGluster;
