import React from 'react';
import { Upload, Form, Icon } from 'antd';
import Column from '../components/Column';
import { getBase64 } from '../../../utils/convertToBase64';

const { Item } = Form;

const renderFileUpload = f => {
  const {
    field: {
      name,
      label = '',
      uploadLabel,
      onChange,
      onRemove = () => {},
      hasDefault = false,
      defaultFileList = [],
      onPreview = () => {},
      customRequest = () => {},
      config: { grid, disabled = false, listType, multiple } = {},
    },
  } = f;

  const handlePreview = async file => {
    const newFile = { ...file };
    if (!newFile.url && !newFile.preview) {
      newFile.preview = await getBase64(newFile.originFileObj);
    }
    onPreview(newFile.url || newFile.preview, newFile.name);
  };

  return (
    <Column key={name} grid={grid}>
      {((hasDefault && defaultFileList.length) || !hasDefault) && (
        <Item label={label}>
          <Upload
            onChange={onChange}
            onRemove={onRemove}
            disabled={disabled}
            listType={listType}
            defaultFileList={defaultFileList}
            onPreview={handlePreview}
            multiple={multiple || false}
            customRequest={customRequest}
          >
            <span style={{ cursor: 'pointer' }}>
              <Icon type="plus" style={{ paddingLeft: '6px' }} />
              <span style={{ color: '#333333', fontsize: '12px' }}>
                {uploadLabel}
              </span>
            </span>
          </Upload>
        </Item>
      )}
    </Column>
  );
};
export default renderFileUpload;
