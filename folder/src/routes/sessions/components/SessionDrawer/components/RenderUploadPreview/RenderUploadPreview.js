/* eslint-disable react/no-array-index-key */
import { Upload } from 'antd';
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './RenderUploadPreview.scss';
import downloadFile from '../../../../utils/downloadFile';
import CPEmpty from '../../../../../../components/CP/CPEmpty';
import CPLoading from '../../../../../../components/CP/CPLoading';

const RenderUploadPreview = ({ fileList, proceeding, filesUrl }) => {
  const filteredFiles = fileList
    .filter(file => (proceeding ? file.proceeding : !file.proceeding))
    .map(file => ({
      uid: file.id,
      name: file.fileName,
      thumbUrl: filesUrl ? filesUrl[file.id] : undefined,
      url: filesUrl ? filesUrl[file.id] : undefined,
    }));
  return (
    <>
      <p
        className={s.label}
        style={{ marginTop: proceeding ? '32px' : '24px' }}
      >
        {proceeding ? 'صورت جلسه' : 'پیوست ها'}
      </p>
      {filteredFiles.length ? (
        <div style={{ position: 'relative', width: '100%', minHeight: '60px' }}>
          {filesUrl ? (
            filteredFiles.map((file, index) =>
              filesUrl[file.uid] ? (
                <Upload
                  key={index}
                  listType="picture"
                  defaultFileList={[file]}
                  showUploadList={{ showRemoveIcon: false }}
                  onPreview={({ url, name }) => downloadFile(url, name)}
                />
              ) : null,
            )
          ) : (
            <div className={s.loading}>
              <CPLoading spinning />
            </div>
          )}
        </div>
      ) : (
        <CPEmpty
          description={
            proceeding ? 'فایل صورت جلسه موجود نیست' : 'فایل پیوست موجود نیست'
          }
        />
      )}
    </>
  );
};

RenderUploadPreview.defaultProps = {
  proceeding: false,
};

RenderUploadPreview.propTypes = {
  fileList: PropTypes.array.isRequired,
  proceeding: PropTypes.bool,
  filesUrl: PropTypes.object.isRequired,
};

export default withStyle(s)(RenderUploadPreview);
